import { MetadataRoute } from 'next';
import { projects, blogs } from '../data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.ashifek.in';

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
