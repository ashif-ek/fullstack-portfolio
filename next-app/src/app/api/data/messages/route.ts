import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { dbSource } from '../../../../lib/data/sources/db';

export async function GET() {
  try {
    const data = await orchestrator.fetch(
      'messages',
      () => Promise.resolve([]), // No API source for messages usually
      () => dbSource.getMessages(),
      () => Promise.resolve([])
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
