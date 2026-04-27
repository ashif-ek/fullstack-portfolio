import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { apiSource } from '../../../../lib/data/sources/api';
import { dbSource } from '../../../../lib/data/sources/db';
import { mockSource } from '../../../../lib/data/sources/mock';

export const revalidate = 60; // Base ISR revalidation

export async function GET() {
  try {
    const projects = await orchestrator.fetch(
      'projects',
      () => apiSource.getProjects(),
      () => dbSource.getProjects(),
      () => mockSource.getProjects()
    );

    return NextResponse.json(projects, {
      headers: {
        // Simple cache tag implementation based on the source logic could go here
        // We'd need orchestrator to return the source along with data
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    // BFF never leaks internal errors
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
