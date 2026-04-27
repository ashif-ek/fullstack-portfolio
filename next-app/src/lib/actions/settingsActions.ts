'use server';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

export async function updateSettings(formData: FormData) {
    try {
        const site_title = formData.get('siteTitle') as string;
        const welcome_message = formData.get('welcomeMessage') as string;
        
        const show_hero = formData.get('showHero') === 'on';
        const show_about = formData.get('showAbout') === 'on';
        const show_services = formData.get('showServices') === 'on';
        const show_blog = formData.get('showBlog') === 'on';
        const show_skills = formData.get('showSkills') === 'on';
        const show_projects = formData.get('showProjects') === 'on';
        const show_certificates = formData.get('showCertificates') === 'on';
        const maintenance_mode = formData.get('maintenanceMode') === 'on';

        const existing = await prisma.siteSettings.findFirst();
        
        const data = {
            site_title,
            welcome_message,
            show_hero,
            show_about,
            show_services,
            show_blog,
            show_skills,
            show_projects,
            show_certificates,
            maintenance_mode,
        };

        if (existing) {
            await prisma.siteSettings.update({
                where: { id: existing.id },
                data
            });
        } else {
            await prisma.siteSettings.create({ data });
        }

        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
