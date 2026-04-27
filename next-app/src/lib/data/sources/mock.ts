import { Settings, Project, AboutData, Profile, Skill } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema, AboutSchema, ProfileSchema, SkillSchema } from '../types';

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
  }
};
