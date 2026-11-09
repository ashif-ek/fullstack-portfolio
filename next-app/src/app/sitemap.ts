import type { MetadataRoute } from 'next';
import { projects as MOCK_PROJECTS, blogs as MOCK_BLOGS, services as MOCK_SERVICES, locations as MOCK_LOCATIONS } from '../data/mockData';
import { dbSource } from '../lib/data/sources/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const mainBaseUrl = 'https://www.ashifek.in';
    const labBaseUrl = 'https://lab.ashifek.in';
    const wordsBaseUrl = 'https://words.ashifek.in';
    const journalBaseUrl = 'https://journal.ashifek.in';

    // Fetch live data using the database directly (avoids ECONNREFUSED during build)
    const [liveProjects, liveBlogs, liveServices, liveLocations] = await Promise.all([
        dbSource.getProjects().catch(() => []),
        dbSource.getBlogs().catch(() => []),
        dbSource.getServices().catch(() => []),
        dbSource.getLocations().catch(() => [])
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

    // Main portfolio base routes
    const mainRoutes = [
        { path: '', priority: 1.0, changeFreq: 'daily' as const },
        { path: '/services', priority: 0.9, changeFreq: 'weekly' as const },
        { path: '/about', priority: 0.6, changeFreq: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
        { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
    ].map((route) => ({
        url: `${mainBaseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
    }));

    // Subdomain canonical entry routes
    const subdomainRoots = [
        { url: labBaseUrl, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
        { url: wordsBaseUrl, priority: 0.85, changeFrequency: 'weekly' as const, lastModified: new Date() },
        { url: journalBaseUrl, priority: 0.9, changeFrequency: 'weekly' as const, lastModified: new Date() },
    ];

    // Project routes on main domain
    const projectRoutes = projects
        .filter(project => project && project.slug && project.slug !== 'undefined')
        .map((project) => ({
            url: `${mainBaseUrl}/projects/${project.slug}`,
            lastModified: safeDate((project as any).updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    // Journal routes mapped to canonical journal.ashifek.in subdomain
    const journalRoutes = blogs
        .filter(blog => blog && blog.slug && blog.slug !== 'undefined')
        .map((blog) => {
            const isPillar = blog.slug.includes('ultimate-guide') || blog.slug.includes('blueprint');
            return {
                url: `${journalBaseUrl}/${blog.slug}`,
                lastModified: safeDate((blog as any).updated_at),
                changeFrequency: isPillar ? 'daily' as const : 'weekly' as const,
                priority: isPillar ? 0.9 : 0.7,
            };
        });

    // Service routes on main domain
    const serviceRoutes = services
        .filter(s => s && s.slug)
        .map((service) => ({
            url: `${mainBaseUrl}/services/${service.slug}`,
            lastModified: safeDate((service as any).updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    // Location routes on main domain
    const locationRoutes = locations
        .filter(l => l && l.slug)
        .map((location) => ({
            url: `${mainBaseUrl}/location/${location.slug}`,
            lastModified: safeDate((location as any).updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

    return [...mainRoutes, ...subdomainRoots, ...projectRoutes, ...journalRoutes, ...serviceRoutes, ...locationRoutes];
}
