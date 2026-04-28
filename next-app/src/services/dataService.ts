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
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

const bffFetch = async (endpoint: string) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/data/${endpoint}`);
    if (!response.ok) throw new Error(`BFF returned ${response.status}`);
    return await response.json();
};

export const DataService = {
    // --- Settings & Meta ---
    async getSettings(): Promise<Settings> {
        try {
            return await bffFetch('settings');
        } catch (error) {
            console.error("Failed to fetch settings from BFF, using mock fallback:", error);
            return MOCK_SETTINGS;
        }
    },

    async getProfile(): Promise<Profile | null> {
        try {
            return await bffFetch('profile');
        } catch (error) {
            console.error("Failed to fetch profile from BFF, using mock fallback:", error);
            return MOCK_PROFILE as unknown as Profile;
        }
    },

    async getAbout(): Promise<AboutData | null> {
        try {
            return await bffFetch('about');
        } catch (error) {
            console.error("Failed to fetch about from BFF, using mock fallback:", error);
            return (MOCK_ABOUT[0] || null) as unknown as AboutData;
        }
    },

    // --- Core Collections ---
    async getProjects(): Promise<Project[]> {
        try {
            return await bffFetch('projects');
        } catch (error) {
            console.error("Failed to fetch projects from BFF, using mock fallback:", error);
            return MOCK_PROJECTS as unknown as Project[];
        }
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const projects = await this.getProjects();
        return projects.find((p: Project) => p.slug === slug) || null;
    },

    async getBlogs(): Promise<Blog[]> {
        try {
            return await bffFetch('blogs');
        } catch (error) {
            console.error("Failed to fetch blogs from BFF, using mock fallback:", error);
            return MOCK_BLOGS as unknown as Blog[];
        }
    },

    async getBlogBySlug(slug: string): Promise<Blog | null> {
        const blogs = await this.getBlogs();
        return blogs.find((b: Blog) => b.slug === slug) || null;
    },

    async getSkills(): Promise<Skill[]> {
        try {
            return await bffFetch('skills');
        } catch (error) {
            console.error("Failed to fetch skills from BFF, using mock fallback:", error);
            return MOCK_SKILLS as unknown as Skill[];
        }
    },

    async getTools(): Promise<Tool[]> {
        try {
            return await bffFetch('tools');
        } catch (error) {
            console.error("Failed to fetch tools from BFF, using mock fallback:", error);
            return MOCK_TOOLS as unknown as Tool[];
        }
    },

    async getServices(): Promise<Service[]> {
        try {
            return await bffFetch('services');
        } catch (error) {
            console.error("Failed to fetch services from BFF, using mock fallback:", error);
            return MOCK_SERVICES as unknown as Service[];
        }
    },

    async getCertificates(): Promise<Certificate[]> {
        try {
            return await bffFetch('certificates');
        } catch (error) {
            console.error("Failed to fetch certificates from BFF, using mock fallback:", error);
            return MOCK_CERTIFICATES as unknown as Certificate[];
        }
    },

    async getLocations(): Promise<LocationData[]> {
        try {
            return await bffFetch('locations');
        } catch (error) {
            console.error("Failed to fetch locations from BFF, using mock fallback:", error);
            return MOCK_LOCATIONS as unknown as LocationData[];
        }
    },

    async getMessages(): Promise<Message[]> {
        try {
            return await bffFetch('messages');
        } catch (error) {
            console.error("Failed to fetch messages from BFF:", error);
            return [];
        }
    },

    // --- Analytical & Health ---
    async checkHealth(): Promise<boolean> {
        try {
            const baseUrl = getBaseUrl();
            const res = await fetch(`${baseUrl}/api/data/health`);
            return res.ok;
        } catch (error) {
            return false;
        }
    },

    async getVisitors(): Promise<{ total_visitors: number }> {
        try {
            return await bffFetch('visitors');
        } catch (error) {
            return { total_visitors: 0 };
        }
    },

    async trackPortfolioView() {
        const baseUrl = getBaseUrl();
        return fetch(`${baseUrl}/api/data/track/view`, { method: 'POST' }).catch(() => {});
    },

    async trackProjectClick(projectId: string | number) {
        const baseUrl = getBaseUrl();
        return fetch(`${baseUrl}/api/data/track/click/${projectId}`, { method: 'POST' }).catch(() => {});
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
