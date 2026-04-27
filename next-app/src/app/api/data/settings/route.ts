import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { apiSource } from '../../../../lib/data/sources/api';
import { dbSource } from '../../../../lib/data/sources/db';
import { mockSource } from '../../../../lib/data/sources/mock';

export const revalidate = 60; 

export async function GET() {
  try {
    const settings = await orchestrator.fetch(
      'settings',
      () => apiSource.getSettings(),
      () => dbSource.getSettings(),
      () => mockSource.getSettings()
    );

    return NextResponse.json(settings, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
