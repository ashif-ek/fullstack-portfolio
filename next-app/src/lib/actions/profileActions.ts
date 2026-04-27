'use server';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const title = formData.get('title') as string;
        const email = formData.get('email') as string;
        const introduction = formData.get('introduction') as string;
        const experience = formData.get('experience') as string;
        const philosophy = formData.get('philosophy') as string;
        const description = formData.get('description') as string;

        // Upsert Profile (singleton pattern)
        const existing = await prisma.profile.findFirst();
        
        if (existing) {
            await prisma.profile.update({
                where: { id: existing.id },
                data: {
                    name,
                    title,
                    email,
                    description,
                    introduction,
                    experience,
                    philosophy,
                }
            });
        } else {
            await prisma.profile.create({
                data: {
                    name,
                    title,
                    email,
                    description,
                    introduction,
                    experience,
                    philosophy,
                }
            });
        }

        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/admin/profile');
        revalidatePath('/admin/about');
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
