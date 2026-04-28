import type { MetadataRoute } from 'next';
import { projects as MOCK_PROJECTS, blogs as MOCK_BLOGS, services as MOCK_SERVICES, locations as MOCK_LOCATIONS } from '../data/mockData';
import { DataService } from '../services/dataService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ashifek.in';

    // Fetch live data using the hardened DataService
    const [liveProjects, liveBlogs, liveServices, liveLocations] = await Promise.all([
        DataService.getProjects(),
        DataService.getBlogs(),
        DataService.getServices(),
        DataService.getLocations()
    ]);

    // Merge logic: Combine Mock and Live, treating Slug as the Unique Key
    const mergeData = <T extends { slug: string }>(mock: T[], live: T[]): T[] => {
        const map = new Map<string, T>();
        // Add mock data first
        if (Array.isArray(mock)) mock.forEach(item => { if (item && item.slug) map.set(item.slug, item); });
        // Overwrite/Add with live data
        if (Array.isArray(live)) live.forEach(item => { if (item && item.slug) map.set(item.slug, item); });
        return Array.from(map.values());
    };

    const projects = mergeData(MOCK_PROJECTS as any[], liveProjects as any[]);
    const blogs = mergeData(MOCK_BLOGS as any[], liveBlogs as any[]);
    const services = mergeData(MOCK_SERVICES as any[], liveServices as any[]);
    const locations = mergeData(MOCK_LOCATIONS as any[], liveLocations as any[]);

    // Helper: Safe date parsing
    const safeDate = (dateStr?: string | null): Date => {
        if (!dateStr) return new Date();
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? new Date() : d;
    };

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
            lastModified: safeDate((project as any).updated_at),
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
                lastModified: safeDate((blog as any).updated_at),
                changeFrequency: isPillar ? 'daily' as const : 'weekly' as const,
                priority: isPillar ? 0.9 : 0.7,
            };
        });

    // Service routes
    const serviceRoutes = services
        .filter(s => s && s.slug)
        .map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: safeDate((service as any).updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    // Location routes
    const locationRoutes = locations
        .filter(l => l && l.slug)
        .map((location) => ({
            url: `${baseUrl}/location/${location.slug}`,
            lastModified: safeDate((location as any).updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

    return [...routes, ...projectRoutes, ...blogRoutes, ...serviceRoutes, ...locationRoutes];
}
