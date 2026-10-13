import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '../../../lib/ai/portfolio-context';

// Minimal in-memory rate limiting based on IP
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25;

// Resilient multi-model fallback chain to gracefully handle high-demand spikes (503) or deprecations
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-flash-latest'
];

export async function POST(req: Request) {
  try {
    // 1. Basic Rate Limiting based on IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    let rateData = rateLimitMap.get(ip);
    if (!rateData || rateData.lastReset < windowStart) {
      rateData = { count: 0, lastReset: now };
    }
    
    if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }
    
    rateData.count += 1;
    rateLimitMap.set(ip, rateData);

    // 2. Validate request body
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Ensure we only process the last 10 messages for context window management
    const limitedMessages = messages.slice(-10);
    
    // Prevent overly long user messages (prompt injection / spam protection)
    const lastMessage = limitedMessages[limitedMessages.length - 1];
    if (lastMessage.content && lastMessage.content.length > 500) {
       return NextResponse.json({ error: 'Message too long. Please keep it under 500 characters.' }, { status: 400 });
    }

    // 3. Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured in environment variables.');
      return NextResponse.json(
        { error: 'Chat service is currently unavailable.' },
        { status: 503 }
      );
    }

    // 4. Construct payload for Gemini API
    const contents = limitedMessages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.2, // Keep it focused and deterministic
        maxOutputTokens: 1024,
      }
    };

    // 5. Try candidate models in sequence
    let replyText: string | null = null;
    let lastError = '';

    for (const model of CANDIDATE_MODELS) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          const parts = data?.candidates?.[0]?.content?.parts || [];
          const text = parts
            .filter((p: any) => p && typeof p.text === 'string' && !p.thought)
            .map((p: any) => p.text)
            .join('\n\n') || parts[0]?.text;

          if (text) {
            replyText = text;
            break; // Success!
          }
        } else {
          const errStatus = response.status;
          const errBody = await response.text().catch(() => '');
          lastError = `Model ${model} returned ${errStatus}: ${errBody.slice(0, 100)}`;
          console.warn(`Gemini fallback warning: ${lastError}`);
        }
      } catch (err: any) {
        lastError = err.message;
        console.warn(`Gemini request error on ${model}:`, err.message);
      }
    }

    // 6. Return response
    if (!replyText) {
      console.error('All candidate Gemini models failed. Last error:', lastError);
      return NextResponse.json(
        { error: 'Chat service is temporarily busy. Please try again in a few seconds.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
