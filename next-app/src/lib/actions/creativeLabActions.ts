'use server';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { CreativeLabMediaType, CreativeLabCategory } from '@prisma/client';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function getCloudinarySignature(folder: string = 'creative_lab') {
  // Ensure this is only accessible to authenticated requests.
  // Implement your admin check here if applicable.

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = {
    timestamp,
    folder
  };
  
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder
  };
}

export async function getAdminCreativeLabItems() {
  // Ensure this is only accessible to admins
  try {
    return await prisma.creativeLabItem.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  } catch (error) {
    console.error("Error fetching admin items:", error);
    return [];
  }
}

export async function createCreativeLabItem(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const description = formData.get('description') as string;
        const mediaType = formData.get('mediaType') as CreativeLabMediaType;
        const mediaUrl = formData.get('mediaUrl') as string;
        const thumbnailUrl = formData.get('thumbnailUrl') as string || null;
        const cloudinaryPublicId = formData.get('cloudinaryPublicId') as string || null;
        const cloudinaryResourceType = formData.get('cloudinaryResourceType') as string || null;
        const category = formData.get('category') as CreativeLabCategory;
        const toolsStr = formData.get('tools') as string;
        const tools = toolsStr ? toolsStr.split(',').map(t => t.trim()) : [];
        const duration = formData.get('duration') as string || null;
        const featured = formData.get('featured') === 'true';
        const published = formData.get('published') === 'true';
        const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

        await prisma.creativeLabItem.create({
            data: {
                title,
                slug,
                description,
                mediaType,
                mediaUrl,
                thumbnailUrl,
                cloudinaryPublicId,
                cloudinaryResourceType,
                category,
                tools,
                duration,
                featured,
                published,
                sortOrder
            }
        });

        revalidatePath('/');
        revalidatePath('/creative-lab');
        revalidatePath('/admin/creative-lab');
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateCreativeLabItem(id: number, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const description = formData.get('description') as string;
        const mediaType = formData.get('mediaType') as CreativeLabMediaType;
        const mediaUrl = formData.get('mediaUrl') as string;
        const thumbnailUrl = formData.get('thumbnailUrl') as string || null;
        const cloudinaryPublicId = formData.get('cloudinaryPublicId') as string || null;
        const cloudinaryResourceType = formData.get('cloudinaryResourceType') as string || null;
        const category = formData.get('category') as CreativeLabCategory;
        const toolsStr = formData.get('tools') as string;
        const tools = toolsStr ? toolsStr.split(',').map(t => t.trim()) : [];
        const duration = formData.get('duration') as string || null;
        const featured = formData.get('featured') === 'true';
        const published = formData.get('published') === 'true';
        const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

        await prisma.creativeLabItem.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                mediaType,
                mediaUrl,
                thumbnailUrl,
                cloudinaryPublicId,
                cloudinaryResourceType,
                category,
                tools,
                duration,
                featured,
                published,
                sortOrder
            }
        });

        revalidatePath('/');
        revalidatePath('/creative-lab');
        revalidatePath('/admin/creative-lab');

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteCreativeLabItem(id: number) {
    try {
        await prisma.creativeLabItem.delete({
            where: { id }
        });

        revalidatePath('/');
        revalidatePath('/creative-lab');
        revalidatePath('/admin/creative-lab');

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
