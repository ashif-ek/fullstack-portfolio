import { Settings, Project } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiSource = {
  getSettings: async (): Promise<Settings> => {
    const res = await fetch(`${API_BASE_URL}/settings/`);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    return normalize(SettingsSchema, data?.data?.[0] || data?.[0] || data, 'API');
  },
  
  getProjects: async (): Promise<Project[]> => {
    const res = await fetch(`${API_BASE_URL}/projects/`);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    return normalizeList(ProjectSchema, data?.data || data, 'API');
  }
};
