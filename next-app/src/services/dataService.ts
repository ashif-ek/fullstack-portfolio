import {
    projects as MOCK_PROJECTS,
    about as MOCK_ABOUT,
    skills as MOCK_SKILLS,
    tools as MOCK_TOOLS,
    services as MOCK_SERVICES,
    certificates as MOCK_CERTIFICATES,
    locations as MOCK_LOCATIONS,
    blogs as MOCK_BLOGS,
    profile as MOCK_PROFILE,
    settings as MOCK_SETTINGS
} from '../data/mockData';
import { Project, Blog, Skill, Tool, Service, Certificate, LocationData, Profile, Settings, AboutData, Message } from '../lib/data/types';

/**
 * DataService handles all data fetching for the portfolio.
 * It implements a fallback mechanism: API -> Database -> Mock
 */

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '';

    const publicUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
    if (publicUrl) return publicUrl;

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
    }

    return 'http://localhost:3000';
};

const responseCache = new Map<string, Promise<unknown>>();
const warnedKeys = new Set<string>();

const formatErrorKey = (endpoint: string, error: unknown) => {
    const code = typeof error === 'object' && error !== null && 'code' in error
        ? String((error as { code?: string }).code)
        : '';
    const message = error instanceof Error ? error.message : String(error);
    return `${endpoint}:${code}:${message}`;
};

const logFallbackOnce = (endpoint: string, error: unknown, message: string) => {
    const key = formatErrorKey(endpoint, error);
    if (warnedKeys.has(key)) return;
    warnedKeys.add(key);
    console.warn(message, error);
};

const bffFetch = async (endpoint: string) => {
    const cached = responseCache.get(endpoint);
    if (cached) return cached;

    const baseUrl = getBaseUrl();
    const promise = (async () => {
        const response = await fetch(`${baseUrl}/api/data/${endpoint}`);
        if (!response.ok) throw new Error(`BFF returned ${response.status}`);
        return await response.json();
    })();

    responseCache.set(endpoint, promise);
    return promise;
};

export const DataService = {
    // --- Settings & Meta ---
    async getSettings(): Promise<Settings> {
        return await bffFetch('settings').catch(() => MOCK_SETTINGS) as Settings;
    },

    async getProfile(): Promise<Profile | null> {
        return await bffFetch('profile').catch(() => MOCK_PROFILE) as Profile;
    },

    async getAbout(): Promise<AboutData | null> {
        return await bffFetch('about').catch(() => MOCK_ABOUT[0]) as AboutData;
    },

    // --- Core Collections ---
    async getProjects(): Promise<Project[]> {
        return await bffFetch('projects').catch(() => MOCK_PROJECTS) as Project[];
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const projects = await this.getProjects();
        return projects.find((p: Project) => p.slug === slug) || null;
    },

    async getBlogs(): Promise<Blog[]> {
        return await bffFetch('blogs').catch(() => MOCK_BLOGS) as Blog[];
    },

    async getBlogBySlug(slug: string): Promise<Blog | null> {
        const blogs = await this.getBlogs();
        return blogs.find((b: Blog) => b.slug === slug) || null;
    },

    async getSkills(): Promise<Skill[]> {
        return await bffFetch('skills').catch(() => MOCK_SKILLS) as Skill[];
    },

    async getTools(): Promise<Tool[]> {
        return await bffFetch('tools').catch(() => MOCK_TOOLS) as Tool[];
    },

    async getServices(): Promise<Service[]> {
        return await bffFetch('services').catch(() => MOCK_SERVICES) as Service[];
    },

    async getCertificates(): Promise<Certificate[]> {
        return await bffFetch('certificates').catch(() => MOCK_CERTIFICATES) as Certificate[];
    },

    async getLocations(): Promise<LocationData[]> {
        return await bffFetch('locations').catch(() => MOCK_LOCATIONS) as LocationData[];
    },

    async getMessages(): Promise<Message[]> {
        return await bffFetch('messages').catch(() => []) as Message[];
    },

    // --- Analytical & Health ---
    async checkHealth(): Promise<boolean> {
        return true;
    },

    async getVisitors(): Promise<{ total_visitors: number }> {
        return { total_visitors: 0 };
    },

    async trackPortfolioView() {
        return Promise.resolve();
    },

    async trackProjectClick(projectId: string | number) {
        return Promise.resolve();
    },

    async getLocationByCity(city: string): Promise<LocationData | null> {
        const locations = await this.getLocations();
        return locations.find((l: LocationData) => l.slug === city) || null;
    },

    async getServiceBySlug(slug: string): Promise<Service | null> {
        const services = await this.getServices();
        return services.find((s: Service) => s.slug === slug) || null;
    }
};
