'use server';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string || '';
        const tags = formData.get('tags') as string || '';
        const link = formData.get('link') as string || '';
        const github = formData.get('github') as string || '';
        const order = parseInt(formData.get('order') as string) || 0;

        await prisma.project.create({
            data: {
                title,
                slug,
                description,
                content,
                tags,
                link,
                github,
                order
            }
        });

        // Revalidate the frontend paths that use projects
        revalidatePath('/');
        revalidatePath('/projects');
        revalidatePath('/admin/projects');
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateProject(id: number, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string || '';
        const tags = formData.get('tags') as string || '';
        const link = formData.get('link') as string || '';
        const github = formData.get('github') as string || '';
        const order = parseInt(formData.get('order') as string) || 0;

        await prisma.project.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                tags,
                link,
                github,
                order
            }
        });

        revalidatePath('/');
        revalidatePath('/projects');
        revalidatePath('/admin/projects');

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteProject(id: number) {
    try {
        await prisma.project.delete({
            where: { id }
        });

        revalidatePath('/');
        revalidatePath('/projects');
        revalidatePath('/admin/projects');

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
