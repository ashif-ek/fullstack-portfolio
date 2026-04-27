import { NextResponse } from 'next/server';
import { orchestrator } from '../../../../lib/data/orchestrator';
import { apiSource } from '../../../../lib/data/sources/api';
import { dbSource } from '../../../../lib/data/sources/db';
import { mockSource } from '../../../../lib/data/sources/mock';

export async function GET() {
  try {
    const data = await orchestrator.fetch(
      'blogs',
      () => apiSource.getBlogs(),
      () => dbSource.getBlogs(),
      () => mockSource.getBlogs()
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
