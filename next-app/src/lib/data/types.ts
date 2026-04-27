import { z } from 'zod';

export const SettingsSchema = z.object({
  siteTitle: z.string().default("Ashif's Portfolio"),
  showHero: z.boolean().default(true),
  showAbout: z.boolean().default(true),
  showServices: z.boolean().default(true),
  showBlog: z.boolean().default(true),
  showSkills: z.boolean().default(true),
  showProjects: z.boolean().default(true),
  showCertificates: z.boolean().default(true),
  showGithubActivity: z.boolean().default(true),
  showBuildJourney: z.boolean().default(true),
  showRecruiterCta: z.boolean().default(true),
  showContacts: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  welcomeMessage: z.string().default(""),
});

export const ProjectSchema = z.object({
  id: z.number().or(z.string()).optional(),
  title: z.string(),
  description: z.string().default(""),
  content: z.string().default(""),
  slug: z.string(),
  tags: z.array(z.string()).default([]),
  link: z.string().default(""),
  github: z.string().default(""),
  image: z.string().nullable().optional(),
  clicks: z.number().default(0),
  order: z.number().default(0),
});

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

export type Settings = z.infer<typeof SettingsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type AboutData = z.infer<typeof AboutSchema>;

// Add other types as needed
