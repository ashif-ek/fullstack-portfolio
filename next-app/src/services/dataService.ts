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
    locations as MOCK_LOCATIONS,
    settings as MOCK_SETTINGS 
} from "../data/mockData";

/**
 * DataService provides a centralized data access layer for both 
 * Server Components (RSC) and Client Components (via React Query).
 * Now implements a Hybrid Merge Strategy: Live Data + Mock Data.
 */

// --- Internal Utilities ---
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};

const mergeCollections = <T extends { slug?: string; id?: string | number; title?: string; name?: string }>(
    liveData: T[],
    mockData: T[]
): T[] => {
    // 1. Ensure all live data has a slug (fallback to slugified title/name)
    const processedLive = liveData.map(item => {
        if (!item.slug) {
            const base = item.title || item.name || '';
            return { ...item, slug: slugify(base) };
        }
        return item;
    }).filter(item => !!item.slug); // Final safety: must have a slug

    const merged = [...processedLive];
    const liveSlugs = new Set(processedLive.map(item => item.slug).filter(Boolean));
    const liveIds = new Set(processedLive.map(item => String(item.id)).filter(Boolean));

    mockData.forEach(mockItem => {
        const isDuplicate = 
            (mockItem.slug && liveSlugs.has(mockItem.slug)) || 
            (mockItem.id && liveIds.has(String(mockItem.id)));
        
        if (!isDuplicate) {
            merged.push(mockItem);
        }
    });

    return merged;
};

export const DataService = {
    // --- Settings & Meta ---
    async getSettings() {
        try {
            const response = await Api.get('/settings/');
            const rawData = response.data?.data || response.data;
            const data = Array.isArray(rawData) ? rawData[0] : rawData;

            if (!data || typeof data !== 'object') return MOCK_SETTINGS;

            // Normalize snake_case (Django) to camelCase (Frontend)
            return {
                showHero: data.show_hero ?? data.showHero ?? MOCK_SETTINGS.showHero,
                showAbout: data.show_about ?? data.showAbout ?? MOCK_SETTINGS.showAbout,
                showServices: data.show_services ?? data.showServices ?? MOCK_SETTINGS.showServices,
                showBlog: data.show_blog ?? data.showBlog ?? MOCK_SETTINGS.showBlog,
                showSkills: data.show_skills ?? data.showSkills ?? MOCK_SETTINGS.showSkills,
                showProjects: data.show_projects ?? data.showProjects ?? MOCK_SETTINGS.showProjects,
                showCertificates: data.show_certificates ?? data.showCertificates ?? MOCK_SETTINGS.showCertificates,
                showGithubActivity: data.show_github_activity ?? data.showGithubActivity ?? MOCK_SETTINGS.showGithubActivity,
                showBuildJourney: data.show_build_journey ?? data.showBuildJourney ?? MOCK_SETTINGS.showBuildJourney,
                showRecruiterCta: data.show_recruiter_cta ?? data.showRecruiterCta ?? MOCK_SETTINGS.showRecruiterCta,
                showContacts: data.show_contacts ?? data.showContacts ?? MOCK_SETTINGS.showContacts,
                maintenanceMode: data.maintenance_mode ?? data.maintenanceMode ?? MOCK_SETTINGS.maintenanceMode,
                siteTitle: data.site_title ?? data.siteTitle ?? MOCK_SETTINGS.siteTitle,
                welcomeMessage: data.welcome_message ?? data.welcomeMessage ?? MOCK_SETTINGS.welcomeMessage
            };
        } catch (error) {
            console.error("Failed to fetch settings, using mock fallback:", error);
            return MOCK_SETTINGS;
        }
    },

    async getProfile(): Promise<Profile | null> {
        try {
            const response = await Api.get('/profile/');
            const rawData = response.data?.data || response.data;
            const p = Array.isArray(rawData) ? rawData[0] : rawData;
            
            if (!p || typeof p !== 'object') return MOCK_PROFILE;
            
            return {
                ...p,
                // Ensure socialLinks is always camelCase and populated
                socialLinks: p.social_links || p.socialLinks || MOCK_PROFILE.socialLinks || []
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
        const liveProjects: Project[] = [];
        try {
            const response = await Api.get('/projects/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveProjects.push(...data.map((p: any) => ({
                    ...p,
                    tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',').map((t: string) => t.trim()) : [])
                })));
            }
        } catch (error) {
            console.error("Failed to fetch live projects:", error);
        }
        return mergeCollections(liveProjects, MOCK_PROJECTS);
    },

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const projects = await this.getProjects();
        return projects.find((p: Project) => p.slug === slug) || null;
    },

    async getBlogs(): Promise<Blog[]> {
        const liveBlogs: Blog[] = [];
        try {
            const response = await Api.get('/blogs/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveBlogs.push(...data.map((b: any) => ({
                    ...b,
                    imageUrl: b.image_url || b.imageUrl || b.image
                })));
            }
        } catch (error) {
            console.error("Failed to fetch live blogs:", error);
        }
        return mergeCollections(liveBlogs, MOCK_BLOGS);
    },

    async getBlogBySlug(slug: string): Promise<Blog | null> {
        const blogs = await this.getBlogs();
        return blogs.find((b: Blog) => b.slug === slug) || null;
    },

    async getSkills(): Promise<Skill[]> {
        const liveSkills: Skill[] = [];
        try {
            const response = await Api.get('/skills/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveSkills.push(...data);
            }
        } catch (error) {
            console.error("Failed to fetch live skills:", error);
        }
        return mergeCollections(liveSkills, MOCK_SKILLS);
    },

    async getTools(): Promise<Tool[]> {
        const liveTools: Tool[] = [];
        try {
            const response = await Api.get('/tools/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveTools.push(...data);
            }
        } catch (error) {
            console.error("Failed to fetch live tools:", error);
        }
        return mergeCollections(liveTools, MOCK_TOOLS);
    },

    async getServices(): Promise<Service[]> {
        const liveServices: Service[] = [];
        try {
            const response = await Api.get('/services/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveServices.push(...data);
            }
        } catch (error) {
            console.error("Failed to fetch live services:", error);
        }
        return mergeCollections(liveServices, MOCK_SERVICES);
    },

    async getServiceBySlug(slug: string): Promise<Service | null> {
        const services = await this.getServices();
        return services.find((s: Service) => s.slug === slug) || null;
    },

    async getCertificates(): Promise<Certificate[]> {
        const liveCerts: Certificate[] = [];
        try {
            const response = await Api.get('/certificates/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveCerts.push(...data.map((c: any) => ({
                    ...c,
                    credentialLink: c.credential_link || c.credentialLink || c.link
                })));
            }
        } catch (error) {
            console.error("Failed to fetch live certificates:", error);
        }
        return mergeCollections(liveCerts, MOCK_CERTIFICATES);
    },

    async getLocations(): Promise<LocationData[]> {
        const liveLocs: LocationData[] = [];
        try {
            const response = await Api.get('/locations/');
            const data = response.data?.data || response.data;
            if (Array.isArray(data)) {
                liveLocs.push(...data);
            }
        } catch (error) {
            console.error("Failed to fetch live locations:", error);
        }
        return mergeCollections(liveLocs, MOCK_LOCATIONS);
    },

    async getLocationByCity(city: string): Promise<LocationData | null> {
        const locations = await this.getLocations();
        return locations.find(l => l.slug === city || l.city.toLowerCase() === city.toLowerCase()) || null;
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
