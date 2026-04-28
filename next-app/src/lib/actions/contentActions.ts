'use server';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

// --- Skills ---
export async function createSkill(formData: FormData) {
    try {
        await prisma.skill.create({
            data: {
                name: formData.get('name') as string,
                level: parseInt(formData.get('level') as string) || 0,
                category: formData.get('category') as string,
                icon: formData.get('icon') as string,
                description: formData.get('description') as string,
                color: formData.get('color') as string || '#44B78B',
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function updateSkill(id: number, formData: FormData) {
    try {
        await prisma.skill.update({
            where: { id },
            data: {
                name: formData.get('name') as string,
                level: parseInt(formData.get('level') as string) || 0,
                category: formData.get('category') as string,
                icon: formData.get('icon') as string,
                description: formData.get('description') as string,
                color: formData.get('color') as string || '#44B78B',
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function deleteSkill(id: number) {
    try {
        await prisma.skill.delete({ where: { id } });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

// --- Services ---
export async function createService(formData: FormData) {
    try {
        await prisma.service.create({
            data: {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                icon: formData.get('icon') as string,
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function updateService(id: number, formData: FormData) {
    try {
        await prisma.service.update({
            where: { id },
            data: {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                icon: formData.get('icon') as string,
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function deleteService(id: number) {
    try {
        await prisma.service.delete({ where: { id } });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

// --- Certificates ---
export async function createCertificate(formData: FormData) {
    try {
        await prisma.certificate.create({
            data: {
                title: formData.get('title') as string,
                issuer: formData.get('issuer') as string,
                date: formData.get('date') as string,
                category: formData.get('category') as string,
                credential_link: formData.get('credential_link') as string || '',
                description: formData.get('description') as string || '',
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function updateCertificate(id: number, formData: FormData) {
    try {
        await prisma.certificate.update({
            where: { id },
            data: {
                title: formData.get('title') as string,
                issuer: formData.get('issuer') as string,
                date: formData.get('date') as string,
                category: formData.get('category') as string,
                credential_link: formData.get('credential_link') as string || '',
                description: formData.get('description') as string || '',
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function deleteCertificate(id: number) {
    try {
        await prisma.certificate.delete({ where: { id } });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

// --- Tools ---
export async function createTool(formData: FormData) {
    try {
        await prisma.tool.create({
            data: {
                name: formData.get('name') as string,
                icon: formData.get('icon') as string || 'CodeIcon',
                order: parseInt(formData.get('order') as string) || 0,
            }
        });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function deleteTool(id: number) {
    try {
        await prisma.tool.delete({ where: { id } });
        revalidatePath('/');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

// --- Blogs ---
export async function createBlog(formData: FormData) {
    try {
        await prisma.blog.create({
            data: {
                title: formData.get('title') as string,
                slug: formData.get('slug') as string,
                excerpt: formData.get('excerpt') as string || '',
                content: formData.get('content') as string || '',
                readTime: formData.get('readTime') as string || '5 min read',
                category: formData.get('category') as string || 'General',
            }
        });
        revalidatePath('/');
        revalidatePath('/blog');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function updateBlog(id: number, formData: FormData) {
    try {
        await prisma.blog.update({
            where: { id },
            data: {
                title: formData.get('title') as string,
                slug: formData.get('slug') as string,
                excerpt: formData.get('excerpt') as string || '',
                content: formData.get('content') as string || '',
                readTime: formData.get('readTime') as string || '5 min read',
                category: formData.get('category') as string || 'General',
            }
        });
        revalidatePath('/');
        revalidatePath('/blog');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

export async function deleteBlog(id: number) {
    try {
        await prisma.blog.delete({ where: { id } });
        revalidatePath('/');
        revalidatePath('/blog');
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}

