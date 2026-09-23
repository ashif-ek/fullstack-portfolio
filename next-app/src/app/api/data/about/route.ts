import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { dbSource } from '../../../../lib/data/sources/db';
import { mockSource } from '../../../../lib/data/sources/mock';

export const revalidate = 60; 

export async function GET() {
  try {
    const about = await orchestrator.fetch(
      'about',
      () => dbSource.getAbout(),
      () => mockSource.getAbout()
    );

    return NextResponse.json(about, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}
