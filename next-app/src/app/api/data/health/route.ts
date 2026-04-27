import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { apiSource } from '../../../../lib/data/sources/api';

export async function GET() {
  try {
    // Basic health check
    const isLive = await apiSource.checkHealth().catch(() => false);
    return NextResponse.json({ live: isLive });
  } catch (error) {
    return NextResponse.json({ live: false });
  }
}
