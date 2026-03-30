import { projects as MOCK_PROJECTS, blogs as MOCK_BLOGS, services as MOCK_SERVICES, locations as MOCK_LOCATIONS } from '../data/mockData';
import Api from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ashifek.in';

    // Fetch live data
    let projects = MOCK_PROJECTS;
    let blogs = MOCK_BLOGS;
    let services = MOCK_SERVICES;
    let locations = MOCK_LOCATIONS;

    try {
        const [projRes, blogRes, servRes, locRes] = await Promise.all([
            Api.get('/projects/'),
            Api.get('/blogs/'),
            Api.get('/services/'),
            Api.get('/locations/')
        ]);
        if (projRes.data) projects = projRes.data;
        if (blogRes.data) blogs = blogRes.data;
        if (servRes.data) services = servRes.data;
        if (locRes.data) locations = locRes.data;
    } catch (error) {
        console.error("Failed to fetch live data for sitemap:", error);
    }

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

    // Project routes - With strict slug validation and dynamic lastmod
    const projectRoutes = projects
        .filter(project => project.slug && project.slug !== 'undefined')
        .map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));

    // Blog routes - With strict slug validation and dynamic lastmod
    const blogRoutes = blogs
        .filter(blog => blog.slug && blog.slug !== 'undefined')
        .map((blog) => {
            const isPillar = blog.slug.includes('ultimate-guide') || blog.slug.includes('blueprint');
            return {
                url: `${baseUrl}/blog/${blog.slug}`,
                lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
                changeFrequency: isPillar ? 'daily' as const : 'weekly' as const,
                priority: isPillar ? 0.9 : 0.7,
            };
        });

    // Service routes
    const serviceRoutes = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Location routes
    const locationRoutes = locations.map((location) => ({
        url: `${baseUrl}/location/${location.slug}`,
        lastModified: location.updated_at ? new Date(location.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...projectRoutes, ...blogRoutes, ...serviceRoutes, ...locationRoutes];
}
