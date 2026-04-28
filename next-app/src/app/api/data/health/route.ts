import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    // Check database connectivity via Prisma
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ live: true, source: 'prisma' });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ live: false, source: 'prisma' });
  }
}
