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

        // Parse Social Links from form
        const socialLinkNames = formData.getAll('social_name[]') as string[];
        const socialLinkUrls = formData.getAll('social_url[]') as string[];
        const socialLinks = socialLinkNames.map((name, i) => ({
            name,
            url: socialLinkUrls[i]
        })).filter(link => link.name && link.url);

        // Upsert Profile (singleton pattern)
        const existing = await prisma.profile.findFirst();
        let profileId: number;
        
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
            profileId = existing.id;
        } else {
            const created = await prisma.profile.create({
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
            profileId = created.id;
        }

        // Sync Social Links (Delete all and recreate for simplicity in this singleton pattern)
        await prisma.socialLink.deleteMany({ where: { profile_id: profileId } });
        if (socialLinks.length > 0) {
            await prisma.socialLink.createMany({
                data: socialLinks.map(link => ({
                    ...link,
                    profile_id: profileId
                }))
            });
        }

        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/admin/profile');
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

