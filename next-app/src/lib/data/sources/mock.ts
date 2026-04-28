import { Settings, Project, AboutData, Profile, Skill, Blog, Tool, Certificate, Service, LocationData } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema, AboutSchema, ProfileSchema, SkillSchema, BlogSchema, ToolSchema, CertificateSchema } from '../types';

export const mockSource = {
  getSettings: async (): Promise<Settings> => {
    const { settings } = await import('../../../data/mockData');
    return normalize(SettingsSchema, settings, 'MOCK');
  },
  
  getProjects: async (): Promise<Project[]> => {
    const { projects } = await import('../../../data/mockData');
    return normalizeList(ProjectSchema, projects, 'MOCK');
  },

  getAbout: async (): Promise<AboutData> => {
    const { about } = await import('../../../data/mockData');
    return normalize(AboutSchema, about[0], 'MOCK');
  },

  getProfile: async (): Promise<Profile> => {
    const { profile } = await import('../../../data/mockData');
    return normalize(ProfileSchema, profile, 'MOCK');
  },

  getSkills: async (): Promise<Skill[]> => {
    const { skills } = await import('../../../data/mockData');
    return normalizeList(SkillSchema, skills, 'MOCK');
  },

  getBlogs: async (): Promise<Blog[]> => {
    const { blogs } = await import('../../../data/mockData');
    return normalizeList(BlogSchema, blogs, 'MOCK');
  },

  getTools: async (): Promise<Tool[]> => {
    const { tools } = await import('../../../data/mockData');
    return normalizeList(ToolSchema, tools, 'MOCK');
  },

  getServices: async (): Promise<Service[]> => {
    const { services } = await import('../../../data/mockData');
    return services || [];
  },

  getCertificates: async (): Promise<Certificate[]> => {
    const { certificates } = await import('../../../data/mockData');
    return normalizeList(CertificateSchema, certificates, 'MOCK');
  },

  getLocations: async (): Promise<LocationData[]> => {
    const { locations } = await import('../../../data/mockData');
    return (locations || []) as LocationData[];
  },

  getVisitors: async () => ({ total_visitors: 0 }),
};
