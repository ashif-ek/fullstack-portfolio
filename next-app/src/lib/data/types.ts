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

export const CertificateSchema = z.object({
  id: z.number().or(z.string()).optional(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  category: z.string(),
  credential_link: z.string().default(""),
  description: z.string().default(""),
  image: z.string().nullable().optional(),
  order: z.number().default(0),
});

export const ToolSchema = z.object({
  id: z.number().or(z.string()).optional(),
  name: z.string(),
  icon: z.string().default("CodeIcon"),
  order: z.number().default(0),
});

export const MessageSchema = z.object({
  id: z.number().or(z.string()).optional(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  date: z.date().or(z.string()),
});

export const BlogSchema = z.object({
  id: z.number().or(z.string()).optional(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  date: z.date().or(z.string()).default(() => new Date().toISOString()),
  readTime: z.string().default("5 min read"),
  category: z.string().default("General"),
  image: z.string().nullable().optional(),
});

export type Settings = z.infer<typeof SettingsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type AboutData = z.infer<typeof AboutSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Blog = z.infer<typeof BlogSchema>;

// Shared Interfaces (Legacy Support)
export interface LocationData { id: string | number; city: string; slug: string; country: string; active: boolean; }
export interface Service { id: string | number; slug: string; title: string; description: string; icon: string; content?: string; }

