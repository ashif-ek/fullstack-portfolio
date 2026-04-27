import { Settings, Project, AboutData, Profile, Skill } from '../types';
import { normalize, normalizeList } from '../normalizer';
import { SettingsSchema, ProjectSchema, AboutSchema, ProfileSchema, SkillSchema } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiFetch = async (endpoint: string) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const json = await res.json();
    return json?.data || json;
};

export const apiSource = {
  getSettings: async (): Promise<Settings> => {
    const data = await apiFetch('/settings/');
    const item = Array.isArray(data) ? data[0] : data;
    if (!item) return normalize(SettingsSchema, {}, 'API');
    return normalize(SettingsSchema, {
      siteTitle: item.site_title || item.siteTitle,
      showHero: item.show_hero ?? item.showHero,
      showAbout: item.show_about ?? item.showAbout,
      showServices: item.show_services ?? item.showServices,
      showBlog: item.show_blog ?? item.showBlog,
      showSkills: item.show_skills ?? item.showSkills,
      showProjects: item.show_projects ?? item.showProjects,
      showCertificates: item.show_certificates ?? item.showCertificates,
      maintenanceMode: item.maintenance_mode ?? item.maintenanceMode,
      welcomeMessage: item.welcome_message || item.welcomeMessage,
    }, 'API');
  },
  
  getProjects: async (): Promise<Project[]> => {
    const data = await apiFetch('/projects/');
    return normalizeList(ProjectSchema, data, 'API');
  },

  getAbout: async (): Promise<AboutData> => {
    const data = await apiFetch('/about/');
    const item = Array.isArray(data) ? data[0] : data;
    return normalize(AboutSchema, item, 'API');
  },

  getProfile: async (): Promise<Profile> => {
    const data = await apiFetch('/profile/');
    const item = Array.isArray(data) ? data[0] : data;
    if (!item) return normalize(ProfileSchema, {}, 'API');
    return normalize(ProfileSchema, {
        ...item,
        socialLinks: item.social_links || item.socialLinks
    }, 'API');
  },

  getSkills: async (): Promise<Skill[]> => {
    const data = await apiFetch('/skills/');
    return normalizeList(SkillSchema, data, 'API');
  },

  getBlogs: async () => await apiFetch('/blogs/'),
  getTools: async () => await apiFetch('/tools/'),
  getServices: async () => await apiFetch('/services/'),
  getCertificates: async () => await apiFetch('/certificates/'),
  getLocations: async () => await apiFetch('/locations/'),
  getVisitors: async () => await apiFetch('/analytics/visitors/'),
  
  checkHealth: async () => {
    const res = await fetch(`${API_BASE_URL}/health/`).catch(() => ({ ok: false }));
    return res.ok;
  }
};
