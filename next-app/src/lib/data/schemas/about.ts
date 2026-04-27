import { z } from 'zod';

export const AboutSchema = z.object({
  id: z.string().or(z.number()).optional(),
  avatar: z.string().default(""),
  introduction: z.string().default(""),
  experience: z.string().default(""),
  philosophy: z.string().default(""),
  stats: z.object({
    projects: z.number().default(0),
    certificates: z.number().default(0),
    technologies: z.number().default(0),
  }).optional()
});

export type AboutData = z.infer<typeof AboutSchema>;
