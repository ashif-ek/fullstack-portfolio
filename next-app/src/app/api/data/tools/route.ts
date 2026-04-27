import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { apiSource } from '../../../../lib/data/sources/api';
import { dbSource } from '../../../../lib/data/sources/db';
import { mockSource } from '../../../../lib/data/sources/mock';

export async function GET() {
  try {
    const data = await orchestrator.fetch(
      'tools',
      () => apiSource.getTools(),
      () => dbSource.getTools(),
      () => mockSource.getTools()
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}
