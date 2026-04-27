import prisma from '../../prisma';
import { Settings, Project } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema } from '../types';

export const dbSource = {
  getSettings: async (): Promise<Settings> => {
    const data = await prisma.siteSettings.findFirst();
    return normalize(SettingsSchema, data, 'DB');
  },
  
  getProjects: async (): Promise<Project[]> => {
    const data = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    });
    return normalizeList(ProjectSchema, data, 'DB');
  },

  getAbout: async (): Promise<AboutData> => {
    // DB doesn't have an About table in schema, we will map profile intro
    const data = await prisma.profile.findFirst();
    if (!data) throw new Error('Profile not found in DB');
    return normalize(AboutSchema, {
      id: String(data.id),
      avatar: data.avatar,
      introduction: data.introduction,
      experience: data.experience,
      philosophy: data.philosophy,
      stats: { projects: 0, certificates: 0, technologies: 0 }
    }, 'DB');
  }
};
