import type { MetadataRoute } from 'next';
import { projects as MOCK_PROJECTS, blogs as MOCK_BLOGS, services as MOCK_SERVICES, locations as MOCK_LOCATIONS } from '../data/mockData';
import Api from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ashifek.in';

    // Helper: Fetch data with a strict timeout
    const fetchWithTimeout = async <T>(apiCall: Promise<{ data: T }>, fallback: T, label: string): Promise<T> => {
        const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`${label} fetch timed out`)), 8000)
        );

        try {
            const result = await Promise.race([apiCall, timeout]) as { data: T };
            if (result && result.data) {
                console.info(`[Sitemap] Successfully fetched live ${label}`);
                return result.data;
            }
        } catch (error) {
            console.warn(`[Sitemap] Using fallback for ${label} (${error instanceof Error ? error.message : 'Unknown error'})`);
        }
        return fallback;
    };

    // Fetch live data or use fallback (mockData as source of truth during build failures)
    const [liveProjects, liveBlogs, liveServices, liveLocations] = await Promise.all([
        fetchWithTimeout(Api.get('/projects/'), [] as any[], 'projects'),
        fetchWithTimeout(Api.get('/blogs/'), [] as any[], 'blogs'),
        fetchWithTimeout(Api.get('/services/'), [] as any[], 'services'),
        fetchWithTimeout(Api.get('/locations/'), [] as any[], 'locations')
    ]);

    // Merge logic: Combine Mock and Live, treating Slug as the Unique Key
    const mergeData = <T extends { slug: string }>(mock: T[], live: T[]): T[] => {
        const map = new Map<string, T>();
        // Add mock data first
        mock.forEach(item => { if (item.slug) map.set(item.slug, item); });
        // Overwrite/Add with live data
        live.forEach(item => { if (item.slug) map.set(item.slug, item); });
        return Array.from(map.values());
    };

    const projects = mergeData(MOCK_PROJECTS, liveProjects);
    const blogs = mergeData(MOCK_BLOGS, liveBlogs);
    const services = mergeData(MOCK_SERVICES, liveServices);
    const locations = mergeData(MOCK_LOCATIONS, liveLocations);

    // Base routes
    const routes = [
        { path: '', priority: 1.0, changeFreq: 'daily' as const },
        { path: '/projects', priority: 0.9, changeFreq: 'weekly' as const },
        { path: '/blog', priority: 0.9, changeFreq: 'weekly' as const },
        { path: '/services', priority: 0.9, changeFreq: 'weekly' as const },
        { path: '/about', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/contact', priority: 0.6, changeFreq: 'monthly' as const },
    ].map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
    }));

    // Project routes - Defensive mapping
    const projectRoutes = projects
        .filter(project => project && project.slug && project.slug !== 'undefined')
        .map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: (project as any).updated_at ? new Date((project as any).updated_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    // Blog routes - Defensive mapping
    const blogRoutes = blogs
        .filter(blog => blog && blog.slug && blog.slug !== 'undefined')
        .map((blog) => {
            const isPillar = blog.slug.includes('ultimate-guide') || blog.slug.includes('blueprint');
            return {
                url: `${baseUrl}/blog/${blog.slug}`,
                lastModified: (blog as any).updated_at ? new Date((blog as any).updated_at) : new Date(),
                changeFrequency: isPillar ? 'daily' as const : 'weekly' as const,
                priority: isPillar ? 0.9 : 0.7,
            };
        });

    // Service routes
    const serviceRoutes = services
        .filter(s => s && s.slug)
        .map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: (service as any).updated_at ? new Date((service as any).updated_at) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    // Location routes
    const locationRoutes = locations
        .filter(l => l && l.slug)
        .map((location) => ({
            url: `${baseUrl}/location/${location.slug}`,
            lastModified: (location as any).updated_at ? new Date((location as any).updated_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

    return [...routes, ...projectRoutes, ...blogRoutes, ...serviceRoutes, ...locationRoutes];
}
