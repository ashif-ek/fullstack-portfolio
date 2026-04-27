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
