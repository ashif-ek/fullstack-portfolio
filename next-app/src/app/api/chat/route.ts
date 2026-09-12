import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '../../../lib/ai/portfolio-context';

// Minimal rate limiting using a Map (In-memory, resets on serverless cold starts)
// For a small portfolio, this is usually sufficient against basic spam.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export async function POST(req: Request) {
  try {
    // 1. Basic Rate Limiting based on IP
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
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

    // 2. Validate request
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Ensure we only process the last 10 messages to prevent huge payloads
    const limitedMessages = messages.slice(-10);
    
    // Prevent overly long user messages (prompt injection / spam protection)
    const lastMessage = limitedMessages[limitedMessages.length - 1];
    if (lastMessage.content.length > 500) {
       return NextResponse.json({ error: 'Message too long. Please keep it under 500 characters.' }, { status: 400 });
    }

    // 3. Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured.');
      return NextResponse.json(
        { error: 'Chat service is currently unavailable.' },
        { status: 503 }
      );
    }

    // 4. Construct payload for Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
    
    // Transform messages to Gemini format
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
        maxOutputTokens: 250, // Keep responses short and concise
      }
    };

    // 5. Send request to Gemini
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to generate response.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // 6. Extract the reply safely
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!replyText) {
      throw new Error('Invalid response format from Gemini');
    }

    // Return the response, stripping any potential markdown formatting if desired (we just send the text)
    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error('Chat API Error:', error);
    // Never expose internal error details to the client
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
