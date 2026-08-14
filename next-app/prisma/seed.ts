import prisma from '../src/lib/prisma';
import { profile, about, services, projects, blogs, skills, tools, certificates, locations, settings } from '../src/data/mockData';

async function main() {
    console.log('Starting to seed database from mock data...');

    // Settings
    console.log('Seeding settings...');
    if (settings) {
        const s = settings as any;
        await prisma.siteSettings.upsert({
            where: { id: 1 },
            update: {
                site_title: s.site_title || s.siteTitle,
                show_hero: s.show_hero || s.showHero,
                show_about: s.show_about || s.showAbout,
                show_services: s.show_services || s.showServices,
                show_blog: s.show_blog || s.showBlog,
                show_skills: s.show_skills || s.showSkills,
                show_projects: s.show_projects || s.showProjects,
                show_certificates: s.show_certificates || s.showCertificates,
                maintenance_mode: s.maintenance_mode || s.maintenanceMode,
                welcome_message: s.welcome_message || s.welcomeMessage || '',
                // add others as needed with defaults
                show_github_activity: true,
                show_build_journey: true,
                show_recruiter_cta: true,
                show_contacts: true,
            },
            create: {
                id: 1,
                site_title: s.site_title || s.siteTitle || 'Portfolio',
                show_hero: s.show_hero || s.showHero || true,
                show_about: s.show_about || s.showAbout || true,
                show_services: s.show_services || s.showServices || true,
                show_blog: s.show_blog || s.showBlog || true,
                show_skills: s.show_skills || s.showSkills || true,
                show_projects: s.show_projects || s.showProjects || true,
                show_certificates: s.show_certificates || s.showCertificates || true,
                maintenance_mode: s.maintenance_mode || s.maintenanceMode || false,
                welcome_message: s.welcome_message || s.welcomeMessage || '',
            }
        });
    }

    // Profile
    console.log('Seeding profile...');
    if (profile) {
        const dbProfile = await prisma.profile.upsert({
            where: { id: 1 },
            update: {
                name: profile.name,
                title: profile.title,
                description: profile.description,
                introduction: about[0]?.introduction || '',
                experience: about[0]?.experience || '[]',
                philosophy: about[0]?.philosophy || '',
                email: profile.email,
                avatar: about[0]?.avatar || null,
            },
            create: {
                id: 1,
                name: profile.name,
                title: profile.title,
                description: profile.description,
                introduction: about[0]?.introduction || '',
                experience: about[0]?.experience || '[]',
                philosophy: about[0]?.philosophy || '',
                email: profile.email,
                avatar: about[0]?.avatar || null,
            }
        });

        // Social Links
        await prisma.socialLink.deleteMany({ where: { profile_id: 1 }});
        for (const link of profile.socialLinks || []) {
            await prisma.socialLink.create({
                data: {
                    profile_id: 1,
                    name: link.name,
                    url: link.url
                }
            });
        }
    }

    // Services
    console.log('Seeding services...');
    await prisma.service.deleteMany({});
    for (const service of services) {
        await prisma.service.create({
            data: {
                title: service.title,
                description: service.description,
                icon: service.icon || 'default',
                order: Number(service.id) || 0
            }
        });
    }

    // Projects
    console.log('Seeding projects...');
    await prisma.project.deleteMany({});
    for (const project of projects) {
        const p = project as any;
        await prisma.project.create({
            data: {
                title: p.title,
                description: p.description,
                content: p.content || p.description,
                slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                tags: Array.isArray(p.tags) ? p.tags.join(',') : p.tags,
                link: p.link || p.demoUrl || '',
                github: p.github || p.githubUrl || '',
                image: p.image || p.imageUrl || null,
            }
        });
    }

    // Blogs
    console.log('Seeding blogs...');
    await prisma.blog.deleteMany({});
    for (const blog of blogs) {
        const b = blog as any;
        await prisma.blog.create({
            data: {
                title: b.title,
                slug: b.slug || b.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                excerpt: b.excerpt || b.content?.substring(0, 100) || 'Read more...',
                content: b.content || b.excerpt || '',
                readTime: b.readTime || '5 min',
                category: b.category || 'General',
                image: b.image || null,
            }
        });
    }

    // Skills
    console.log('Seeding skills...');
    await prisma.skill.deleteMany({});
    for (const skill of skills) {
        const s = skill as any;
        await prisma.skill.create({
            data: {
                name: s.name,
                level: s.level || 0,
                category: s.category || 'Other',
                icon: s.icon || 'default',
                description: s.description || '',
                color: s.color || '#ffffff'
            }
        });
    }

    // Tools
    console.log('Seeding tools...');
    await prisma.tool.deleteMany({});
    for (const tool of tools) {
        await prisma.tool.create({
            data: {
                name: tool.name,
                icon: tool.icon || 'default',
            }
        });
    }

    // Certificates
    console.log('Seeding certificates...');
    await prisma.certificate.deleteMany({});
    for (const cert of certificates) {
        const c = cert as any;
        await prisma.certificate.create({
            data: {
                title: c.title,
                issuer: c.issuer || 'Unknown',
                date: c.date || '',
                category: c.category || 'Other',
                image: c.image || null,
                credential_link: c.credential_link || c.link || '',
                description: c.description || '',
            }
        });
    }

    console.log('Database seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
