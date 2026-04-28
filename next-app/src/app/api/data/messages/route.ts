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

    await prisma.message.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
