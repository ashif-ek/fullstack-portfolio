import { MetadataRoute } from 'next';
import { projects as MOCK_PROJECTS, blogs as MOCK_BLOGS } from '../data/mockData';
import Api from '../lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ashifek.in';

    // Fetch live data
    let projects = MOCK_PROJECTS;
    let blogs = MOCK_BLOGS;

    try {
        const [projRes, blogRes] = await Promise.all([
            Api.get('/projects/'),
            Api.get('/blogs/')
        ]);
        if (projRes.data) projects = projRes.data;
        if (blogRes.data) blogs = blogRes.data;
    } catch (error) {
        console.error("Failed to fetch live data for sitemap:", error);
    }

    // Base routes
    const routes = ['', '/about', '/projects', '/contact', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Project routes
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Blog routes
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...projectRoutes, ...blogRoutes];
}
