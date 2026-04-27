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
  tags: z.any().transform(v => Array.isArray(v) ? v : (typeof v === 'string' ? v.split(',').map(t => t.trim()) : [])).default([]),
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

export const ProfileSchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  introduction: z.string().default(""),
  experience: z.string().default(""),
  philosophy: z.string().default(""),
  email: z.string().default(""),
  avatar: z.string().optional().nullable(),
  socialLinks: z.array(z.object({
    name: z.string(),
    url: z.string()
  })).optional().default([])
});

export const SkillSchema = z.object({
  id: z.number().or(z.string()).optional(),
  name: z.string(),
  level: z.number().default(0),
  category: z.string().default("Technology"),
  color: z.string().default("#44B78B"),
  icon: z.string().default("CodeIcon"),
  description: z.string().default("")
});

export type Settings = z.infer<typeof SettingsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type AboutData = z.infer<typeof AboutSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Skill = z.infer<typeof SkillSchema>;

// Shared Types
export interface Tool { id: string | number; name: string; icon: string; }
export interface Service { id: string | number; slug: string; title: string; description: string; icon: string; content?: string; }
export interface Certificate { id: string | number; title: string; issuer: string; date: string; category: string; credentialLink: string; description: string; image?: string; }
export interface Blog { id: string | number; title: string; slug: string; excerpt: string; date: string; readTime: string; category: string; content?: string; }
export interface LocationData { id: string | number; city: string; slug: string; country: string; active: boolean; }
