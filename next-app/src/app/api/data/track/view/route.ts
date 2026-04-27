import { NextResponse } from 'next/server';
import Api from '../../../../../lib/api';

export async function POST() {
  try {
    // Attempt to track in Django if it's up
    await Api.post('/analytics/visitors/increment/').catch(() => {});
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
