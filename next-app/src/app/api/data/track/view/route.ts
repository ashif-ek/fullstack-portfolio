import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function POST() {
  try {
    // Increment visitor count directly via Prisma
    const existing = await prisma.visitorCount.findFirst();
    if (existing) {
      await prisma.visitorCount.update({
        where: { id: existing.id },
        data: { total_visitors: { increment: 1 } },
      });
    } else {
      await prisma.visitorCount.create({
        data: { total_visitors: 1 },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return NextResponse.json({ success: false });
  }
}
