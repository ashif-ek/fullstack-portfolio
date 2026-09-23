import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { dbSource } from '../../../../lib/data/sources/db';
import { mockSource } from '../../../../lib/data/sources/mock';

export async function GET() {
  try {
    const data = await orchestrator.fetch(
      'visitors',
      () => dbSource.getVisitors(),
      () => mockSource.getVisitors()
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ total_visitors: 0 });
  }
}
