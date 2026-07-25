'use server';

import { headers } from 'next/headers';
import prisma from '../../lib/prisma';

export async function trackResumeDownload() {
  try {
    const headersList = headers();
    
    // Extract headers safely
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referer = headersList.get('referer') || 'unknown';

    // Store asynchronously, do not wait for the result if not needed, but since it's a server action,
    // we just await it inside a try/catch block so errors are swallowed and logged.
    await prisma.resumeDownload.create({
      data: {
        ipAddress: ipAddress.substring(0, 50),
        userAgent: userAgent.substring(0, 500),
        referer: referer.substring(0, 500),
      }
    });

    return { success: true };
  } catch (error) {
    // Log the error but don't expose it to the client
    // Analytics failure should never block or alert the user
    console.error('Failed to track resume download:', error);
    return { success: false };
  }
}
