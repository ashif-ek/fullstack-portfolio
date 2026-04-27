import prisma from '../../prisma';
import { Settings, Project, AboutData, Profile, Skill } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema, AboutSchema, ProfileSchema, SkillSchema } from '../types';

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

  getBlogs: async () => [],
  getTools: async () => await prisma.tool.findMany(),
  getServices: async () => await prisma.service.findMany(),
  getCertificates: async () => await prisma.certificate.findMany(),
  getLocations: async () => [],
  getVisitors: async () => {
    const data = await prisma.visitorCount.findFirst();
    return data || { total_visitors: 0 };
  }
};
