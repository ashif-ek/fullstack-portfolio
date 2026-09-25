'use server';

import { z } from 'zod';
import prisma from '../../lib/prisma';
import { sendContactEmail } from '../../lib/email';

const ContactSchema = z.object({
  source: z.enum(['contact_form', 'hire_me']),
  name: z.string().min(2, "Name is required (min 2 chars)").max(100),
  email: z.string().email("A valid email is required").max(254),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  
  // Optional Hire Me specific fields
  company: z.string().max(100).optional().or(z.literal('')),
  role: z.string().max(100).optional().or(z.literal('')),
  projectType: z.string().max(50).optional().or(z.literal('')),
  budget: z.string().max(50).optional().or(z.literal('')),
  timeline: z.string().max(50).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export async function submitContact(data: ContactInput) {
  try {
    const validated = ContactSchema.parse(data);

    // Persist to database based on source
    // We maintain the separate tables so we don't break existing admin UI
    if (validated.source === 'hire_me') {
      await prisma.collaborationRequest.create({
        data: {
          fullName: validated.name,
          email: validated.email,
          message: validated.message,
          company: validated.company || null,
          role: validated.role || null,
          projectType: validated.projectType || 'Other',
          budget: validated.budget || null,
          timeline: validated.timeline || null,
          status: 'PENDING',
        }
      });
    } else {
      await prisma.message.create({
        data: {
          name: validated.name,
          email: validated.email,
          message: validated.message,
        }
      });
    }

    // Send the email
    await sendContactEmail(validated);

    return { success: true };
  } catch (error) {
    console.error('Failed to process contact submission:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Validation failed. Please check your inputs.', 
        details: (error as any).errors 
      };
    }
    
    return { 
      success: false, 
      error: 'Something went wrong. Please try again.' 
    };
  }
}
