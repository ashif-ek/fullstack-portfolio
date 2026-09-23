import { NextResponse, NextRequest } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { dbSource } from '../../../../lib/data/sources/db';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const data = await orchestrator.fetch(
      'messages',
      () => Promise.resolve([]), // No API source for messages
      () => dbSource.getMessages(),
      () => Promise.resolve([])
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Server-side length validation
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: 'Name must be between 2 and 100 characters.' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
      return NextResponse.json({ error: 'Message must be between 10 and 2000 characters.' }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    await prisma.message.create({
      data: { name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
