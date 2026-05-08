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
    const err = error as any;
    if (err?.code === 'P2021') {
      console.error('Visitor tracking disabled: Prisma visitorCount table is missing.', err.message || err);
    } else {
      console.error('Failed to track visitor:', error);
    }
    return NextResponse.json({ success: false });
  }
}
