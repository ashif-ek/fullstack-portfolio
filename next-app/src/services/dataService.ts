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

/**
 * DataService provides a centralized data access layer for both 
 * Server Components (RSC) and Client Components (via React Query).
 */
export const DataService = {
    // --- Settings & Meta ---
    async getSettings() {
        const { data } = await Api.get('/settings/');
        return Array.isArray(data) ? data[0] : data;
    },

    async getProfile(): Promise<Profile> {
        const { data } = await Api.get('/profile/');
        const p = Array.isArray(data) ? data[0] : data;
        if (!p) return {} as Profile;
        
        return {
            ...p,
            socialLinks: p.social_links || p.socialLinks || []
        };
    },

    async getAbout(): Promise<AboutData> {
        const { data } = await Api.get('/about/');
        return Array.isArray(data) ? data[0] : data;
    },

    // --- Core Collections ---
    async getProjects(): Promise<Project[]> {
        const { data } = await Api.get('/projects/');
        return (data || []).map((p: any) => ({
            ...p,
            tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',').map((t: string) => t.trim()) : [])
        }));
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const projects = await this.getProjects();
        return projects.find((p: Project) => p.slug === slug) || null;
    },

    async getBlogs(): Promise<Blog[]> {
        const { data } = await Api.get('/blogs/');
        return (data || []).map((b: any) => ({
            ...b,
            imageUrl: b.image_url || b.imageUrl || b.image
        }));
    },

    async getBlogBySlug(slug: string): Promise<Blog | null> {
        const blogs = await this.getBlogs();
        return blogs.find((b: Blog) => b.slug === slug) || null;
    },

    async getSkills(): Promise<Skill[]> {
        const { data } = await Api.get('/skills/');
        return data || [];
    },

    async getTools(): Promise<Tool[]> {
        const { data } = await Api.get('/tools/');
        return data || [];
    },

    async getServices(): Promise<Service[]> {
        const { data } = await Api.get('/services/');
        return data || [];
    },

    async getServiceBySlug(slug: string): Promise<Service | null> {
        const services = await this.getServices();
        return services.find((s: Service) => s.slug === slug) || null;
    },

    async getCertificates(): Promise<Certificate[]> {
        const { data } = await Api.get('/certificates/');
        return (data || []).map((c: any) => ({
            ...c,
            credentialLink: c.credential_link || c.credentialLink || c.link
        }));
    },

    async getLocations(): Promise<LocationData[]> {
        const { data } = await Api.get('/locations/');
        return data || [];
    },

    async getLocationByCity(city: string): Promise<LocationData | null> {
        const { data } = await Api.get(`/locations/`);
        return data.find((l: LocationData) => l.slug === city || l.city.toLowerCase() === city.toLowerCase()) || null;
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
        const { data } = await Api.get('/analytics/visitors/');
        return data || { total_visitors: 0 };
    },

    async trackPortfolioView() {
        return Api.post('/api/portfolio-view/');
    },

    async trackProjectClick(projectId: string) {
        return Api.post(`/projects/${projectId}/click/`);
    }
};
