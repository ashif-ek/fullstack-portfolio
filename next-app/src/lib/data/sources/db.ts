import prisma from '../../prisma';
import { Settings, Project, AboutData, Profile, Skill, Blog, Message, Certificate, Tool } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema, AboutSchema, ProfileSchema, SkillSchema, BlogSchema, MessageSchema, CertificateSchema, ToolSchema } from '../types';

export const dbSource = {
  getSettings: async (): Promise<Settings> => {
    const data = await prisma.siteSettings.findFirst();
    if (!data) return normalize(SettingsSchema, {}, 'DB');
    return normalize(SettingsSchema, {
      siteTitle: data.site_title,
      showHero: data.show_hero,
      showAbout: data.show_about,
      showServices: data.show_services,
      showBlog: data.show_blog,
      showSkills: data.show_skills,
      showProjects: data.show_projects,
      showCertificates: data.show_certificates,
      showGithubActivity: data.show_github_activity,
      showBuildJourney: data.show_build_journey,
      showRecruiterCta: data.show_recruiter_cta,
      showContacts: data.show_contacts,
      maintenanceMode: data.maintenance_mode,
      welcomeMessage: data.welcome_message,
    }, 'DB');
  },
  
  getProjects: async (): Promise<Project[]> => {
    const data = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    });
    return normalizeList(ProjectSchema, data, 'DB');
  },

  getAbout: async (): Promise<AboutData> => {
    const data = await prisma.profile.findFirst();
    if (!data) return normalize(AboutSchema, {}, 'DB');
    return normalize(AboutSchema, {
      id: String(data.id),
      avatar: data.avatar,
      introduction: data.introduction,
      experience: data.experience,
      philosophy: data.philosophy,
      stats: { projects: 0, certificates: 0, technologies: 0 }
    }, 'DB');
  },

  getProfile: async (): Promise<Profile> => {
    const data = await prisma.profile.findFirst({
      include: { social_links: true }
    });
    if (!data) return normalize(ProfileSchema, {}, 'DB');
    return normalize(ProfileSchema, {
        ...data,
        socialLinks: data.social_links
    }, 'DB');
  },

  getSkills: async (): Promise<Skill[]> => {
    const data = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    });
    return normalizeList(SkillSchema, data, 'DB');
  },

  getBlogs: async (): Promise<Blog[]> => {
    const data = await prisma.blog.findMany({
      orderBy: { date: 'desc' }
    });
    return normalizeList(BlogSchema, data, 'DB');
  },

  getTools: async (): Promise<Tool[]> => {
    const data = await prisma.tool.findMany({
      orderBy: { order: 'asc' }
    });
    return normalizeList(ToolSchema, data, 'DB');
  },

  getServices: async () => await prisma.service.findMany({ orderBy: { order: 'asc' } }),

  getCertificates: async (): Promise<Certificate[]> => {
    const data = await prisma.certificate.findMany({
      orderBy: { order: 'asc' }
    });
    return normalizeList(CertificateSchema, data, 'DB');
  },

  getMessages: async (): Promise<Message[]> => {
    const data = await prisma.message.findMany({
      orderBy: { date: 'desc' }
    });
    return normalizeList(MessageSchema, data, 'DB');
  },

  getLocations: async () => [],
  getVisitors: async () => {
    const data = await prisma.visitorCount.findFirst();
    return data || { total_visitors: 0 };
  }
};
