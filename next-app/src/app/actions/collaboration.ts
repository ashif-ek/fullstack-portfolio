'use server';

import { z } from 'zod';
import prisma from '../../lib/prisma'; // I will check this import path next

export const CollaborationRequestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  role: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type CollaborationRequestInput = z.infer<typeof CollaborationRequestSchema>;

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
      return { success: false, error: 'Validation failed', details: (error as z.ZodError).errors };
    }
    return { success: false, error: 'Failed to submit request. Please try again later.' };
  }
}
