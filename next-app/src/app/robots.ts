import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/system'],
        },
        sitemap: 'https://www.ashifek.in/sitemap.xml',
    };
}
