import Api, { API_BASE_URL } from "../lib/api";
import { 
    Project, 
    Blog, 
    Skill, 
    Tool,
    Service, 
    Profile, 
    AboutData, 
    Certificate, 
    LocationData 
} from "../types";
import { 
    profile as MOCK_PROFILE, 
    about as MOCK_ABOUT, 
    projects as MOCK_PROJECTS, 
    blogs as MOCK_BLOGS, 
    skills as MOCK_SKILLS, 
    tools as MOCK_TOOLS, 
    services as MOCK_SERVICES, 
    certificates as MOCK_CERTIFICATES, 
    locations as MOCK_LOCATIONS 
} from "../data/mockData";

/**
 * DataService provides a centralized data access layer for both 
 * Server Components (RSC) and Client Components (via React Query).
 */
export const DataService = {
    // --- Settings & Meta ---
    async getSettings() {
        try {
            const response = await Api.get('/settings/');
            const data = response.data?.data || response.data;
            return Array.isArray(data) ? data[0] : data;
        } catch (error) {
            console.error("Failed to fetch settings, using empty default:", error);
            return null;
        }
    },

    async getProfile(): Promise<Profile | null> {
        try {
            const response = await Api.get('/profile/');
            const data = response.data?.data || response.data;
            const p = Array.isArray(data) ? data[0] : data;
            if (!p || typeof p !== 'object') return MOCK_PROFILE;
            
            return {
                ...p,
                socialLinks: p.social_links || p.socialLinks || []
            };
        } catch (error) {
            console.error("Failed to fetch profile, using mock fallback:", error);
            return MOCK_PROFILE;
        }
    },

    async getAbout(): Promise<AboutData | null> {
        try {
            const response = await Api.get('/about/');
            const data = response.data?.data || response.data;
            const a = Array.isArray(data) ? data[0] : data;
            return a || MOCK_ABOUT[0] || null;
        } catch (error) {
            console.error("Failed to fetch about, using mock fallback:", error);
            return MOCK_ABOUT[0] || null;
        }
    },

    // --- Core Collections ---
    async getProjects(): Promise<Project[]> {
        try {
            const response = await Api.get('/projects/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_PROJECTS;
            return data.map((p: any) => ({
                ...p,
                tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',').map((t: string) => t.trim()) : [])
            }));
        } catch (error) {
            console.error("Failed to fetch projects, using mock fallback:", error);
            return MOCK_PROJECTS;
        }
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        try {
            const projects = await this.getProjects();
            return projects.find((p: Project) => p.slug === slug) || null;
        } catch (error) {
            console.error(`Failed to fetch project by slug: ${slug}, using mock fallback:`, error);
            return MOCK_PROJECTS.find(p => p.slug === slug) || null;
        }
    },

    async getBlogs(): Promise<Blog[]> {
        try {
            const response = await Api.get('/blogs/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_BLOGS;
            return data.map((b: any) => ({
                ...b,
                imageUrl: b.image_url || b.imageUrl || b.image
            }));
        } catch (error) {
            console.error("Failed to fetch blogs, using mock fallback:", error);
            return MOCK_BLOGS;
        }
    },

    async getBlogBySlug(slug: string): Promise<Blog | null> {
        try {
            const blogs = await this.getBlogs();
            return blogs.find((b: Blog) => b.slug === slug) || null;
        } catch (error) {
            console.error(`Failed to fetch blog by slug: ${slug}, using mock fallback:`, error);
            return MOCK_BLOGS.find(b => b.slug === slug) || null;
        }
    },

    async getSkills(): Promise<Skill[]> {
        try {
            const response = await Api.get('/skills/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_SKILLS;
            return data;
        } catch (error) {
            console.error("Failed to fetch skills, using mock fallback:", error);
            return MOCK_SKILLS;
        }
    },

    async getTools(): Promise<Tool[]> {
        try {
            const response = await Api.get('/tools/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_TOOLS;
            return data;
        } catch (error) {
            console.error("Failed to fetch tools, using mock fallback:", error);
            return MOCK_TOOLS;
        }
    },

    async getServices(): Promise<Service[]> {
        try {
            const response = await Api.get('/services/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_SERVICES;
            return data;
        } catch (error) {
            console.error("Failed to fetch services, using mock fallback:", error);
            return MOCK_SERVICES;
        }
    },

    async getServiceBySlug(slug: string): Promise<Service | null> {
        try {
            const services = await this.getServices();
            return services.find((s: Service) => s.slug === slug) || null;
        } catch (error) {
            console.error(`Failed to fetch service by slug: ${slug}, using mock fallback:`, error);
            return MOCK_SERVICES.find(s => s.slug === slug) || null;
        }
    },

    async getCertificates(): Promise<Certificate[]> {
        try {
            const response = await Api.get('/certificates/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_CERTIFICATES;
            return data.map((c: any) => ({
                ...c,
                credentialLink: c.credential_link || c.credentialLink || c.link
            }));
        } catch (error) {
            console.error("Failed to fetch certificates, using mock fallback:", error);
            return MOCK_CERTIFICATES;
        }
    },

    async getLocations(): Promise<LocationData[]> {
        try {
            const response = await Api.get('/locations/');
            const data = response.data?.data || response.data;
            if (!Array.isArray(data) || data.length === 0) return MOCK_LOCATIONS;
            return data;
        } catch (error) {
            console.error("Failed to fetch locations, using mock fallback:", error);
            return MOCK_LOCATIONS;
        }
    },

    async getLocationByCity(city: string): Promise<LocationData | null> {
        try {
            const response = await Api.get(`/locations/`);
            const data = response.data?.data || response.data;
            if (!Array.isArray(data)) return MOCK_LOCATIONS.find(l => l.slug === city || l.city.toLowerCase() === city.toLowerCase()) || null;
            
            const loc = data.find((l: LocationData) => l.slug === city || l.city.toLowerCase() === city.toLowerCase());
            if (!loc) return MOCK_LOCATIONS.find(l => l.slug === city || l.city.toLowerCase() === city.toLowerCase()) || null;
            return loc;
        } catch (error) {
            console.error(`Failed to fetch location by city: ${city}, using mock fallback:`, error);
            return MOCK_LOCATIONS.find(l => l.slug === city || l.city.toLowerCase() === city.toLowerCase()) || null;
        }
    },

    // --- Analytical & Health ---
    async checkHealth(): Promise<boolean> {
        try {
            await Api.get('/health/');
            return true;
        } catch (error) {
            return false;
        }
    },

    async getVisitors(): Promise<{ total_visitors: number }> {
        try {
            const response = await Api.get('/analytics/visitors/');
            const data = response.data?.data || response.data;
            return data || { total_visitors: 0 };
        } catch (error) {
            return { total_visitors: 0 };
        }
    },

    async trackPortfolioView() {
        return Api.post('/api/portfolio-view/');
    },

    async trackProjectClick(projectId: string) {
        return Api.post(`/projects/${projectId}/click/`);
    }
};
