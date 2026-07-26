'use server';

import { z } from 'zod';
import prisma from '../../lib/prisma';
import { CollaborationRequestSchema, CollaborationRequestInput } from '../../lib/validations/collaboration';

export async function submitCollaborationRequest(data: CollaborationRequestInput) {
  try {
    const validatedData = CollaborationRequestSchema.parse(data);

    const request = await prisma.collaborationRequest.create({
      data: {
        ...validatedData,
        status: 'PENDING',
      },
    });

    return { success: true, data: request };
  } catch (error) {
    console.error('Failed to submit collaboration request:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation failed', details: (error as any).errors };
    }
    return { success: false, error: 'Failed to submit request. Please try again later.' };
  }
}
