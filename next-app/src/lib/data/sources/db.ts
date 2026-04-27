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
  }
};
