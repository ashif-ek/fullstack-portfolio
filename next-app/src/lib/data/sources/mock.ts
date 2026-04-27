import { Settings, Project } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema } from '../types';

export const mockSource = {
  getSettings: async (): Promise<Settings> => {
    return normalize(SettingsSchema, {
      siteTitle: "Mock Portfolio",
      showHero: true
    }, 'MOCK');
  },
  
  getProjects: async (): Promise<Project[]> => {
    return normalizeList(ProjectSchema, [
      { id: 1, title: 'Mock Project 1', slug: 'mock-1', tags: ['React'] }
    ], 'MOCK');
  }
};
