'use server';

import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export type LexiconWordItem = {
  id: number;
  word: string;
  slug: string;
  shortMeaning: string | null;
  personalNote: string | null;
  category: string;
  categories: string[];
  importance: number;
  fontSize: string;
  position: string | null;
  animationStyle: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Public: Get all published words for the /lexicon floating universe
 */
export async function getPublishedLexiconWords(): Promise<LexiconWordItem[]> {
  try {
    const words = await prisma.lexiconWord.findMany({
      where: { isPublished: true },
      orderBy: [
        { sortOrder: 'asc' },
        { importance: 'desc' },
        { word: 'asc' }
      ]
    });
    return words;
  } catch (error) {
    console.error('Error fetching published lexicon words:', error);
    return [];
  }
}

/**
 * Admin: Get all words (including drafts/unpublished) with optional search & filter
 */
export async function getAdminLexiconWords(): Promise<LexiconWordItem[]> {
  const isAdmin = await checkAdminAuth();
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }

  try {
    return await prisma.lexiconWord.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  } catch (error) {
    console.error('Error fetching admin lexicon words:', error);
    return [];
  }
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Admin: Create a new word
 */
export async function createLexiconWord(formData: FormData) {
  const isAdmin = await checkAdminAuth();
  if (!isAdmin) {
    return { success: false, error: 'Unauthorized: Admin access required' };
  }

  try {
    const word = (formData.get('word') as string || '').trim();
    if (!word) {
      return { success: false, error: 'Word title is required' };
    }

    let slug = (formData.get('slug') as string || '').trim();
    if (!slug) {
      slug = slugify(word);
    } else {
      slug = slugify(slug);
    }

    // Check slug collision
    const existing = await prisma.lexiconWord.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const shortMeaning = (formData.get('shortMeaning') as string || '').trim() || null;
    const personalNote = (formData.get('personalNote') as string || '').trim() || null;
    const category = (formData.get('category') as string || 'Engineering & Technical').trim();
    const categoriesRaw = formData.get('categories') as string || '';
    const categories = categoriesRaw
      ? categoriesRaw.split(',').map(c => c.trim()).filter(Boolean)
      : [category];

    if (!categories.includes(category)) {
      categories.unshift(category);
    }

    const importance = parseInt(formData.get('importance') as string) || 1;
    const fontSize = (formData.get('fontSize') as string || 'md').trim();
    const position = (formData.get('position') as string || '').trim() || null;
    const animationStyle = (formData.get('animationStyle') as string || 'drift-slow').trim();
    const isPublished = formData.get('isPublished') === 'true' || formData.get('isPublished') === 'on';
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

    await prisma.lexiconWord.create({
      data: {
        word,
        slug,
        shortMeaning,
        personalNote,
        category,
        categories,
        importance,
        fontSize,
        position,
        animationStyle,
        isPublished,
        sortOrder
      }
    });

    revalidatePath('/lexicon');
    revalidatePath('/admin/lexicon');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Error creating lexicon word:', error);
    return { success: false, error: error.message || 'Failed to create word' };
  }
}

/**
 * Admin: Update an existing word
 */
export async function updateLexiconWord(id: number, formData: FormData) {
  const isAdmin = await checkAdminAuth();
  if (!isAdmin) {
    return { success: false, error: 'Unauthorized: Admin access required' };
  }

  try {
    const word = (formData.get('word') as string || '').trim();
    if (!word) {
      return { success: false, error: 'Word title is required' };
    }

    let slug = (formData.get('slug') as string || '').trim();
    slug = slugify(slug || word);

    // Check slug collision excluding current
    const collision = await prisma.lexiconWord.findFirst({
      where: {
        slug,
        NOT: { id }
      }
    });
    if (collision) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const shortMeaning = (formData.get('shortMeaning') as string || '').trim() || null;
    const personalNote = (formData.get('personalNote') as string || '').trim() || null;
    const category = (formData.get('category') as string || 'Engineering & Technical').trim();
    const categoriesRaw = formData.get('categories') as string || '';
    const categories = categoriesRaw
      ? categoriesRaw.split(',').map(c => c.trim()).filter(Boolean)
      : [category];

    if (!categories.includes(category)) {
      categories.unshift(category);
    }

    const importance = parseInt(formData.get('importance') as string) || 1;
    const fontSize = (formData.get('fontSize') as string || 'md').trim();
    const position = (formData.get('position') as string || '').trim() || null;
    const animationStyle = (formData.get('animationStyle') as string || 'drift-slow').trim();
    const isPublished = formData.get('isPublished') === 'true' || formData.get('isPublished') === 'on';
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

    await prisma.lexiconWord.update({
      where: { id },
      data: {
        word,
        slug,
        shortMeaning,
        personalNote,
        category,
        categories,
        importance,
        fontSize,
        position,
        animationStyle,
        isPublished,
        sortOrder
      }
    });

    revalidatePath('/lexicon');
    revalidatePath('/admin/lexicon');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating lexicon word:', error);
    return { success: false, error: error.message || 'Failed to update word' };
  }
}

/**
 * Admin: Toggle publication status
 */
export async function togglePublishLexiconWord(id: number, currentStatus: boolean) {
  const isAdmin = await checkAdminAuth();
  if (!isAdmin) {
    return { success: false, error: 'Unauthorized: Admin access required' };
  }

  try {
    await prisma.lexiconWord.update({
      where: { id },
      data: { isPublished: !currentStatus }
    });

    revalidatePath('/lexicon');
    revalidatePath('/admin/lexicon');
    revalidatePath('/');

    return { success: true, isPublished: !currentStatus };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Admin: Delete a word
 */
export async function deleteLexiconWord(id: number) {
  const isAdmin = await checkAdminAuth();
  if (!isAdmin) {
    return { success: false, error: 'Unauthorized: Admin access required' };
  }

  try {
    await prisma.lexiconWord.delete({ where: { id } });

    revalidatePath('/lexicon');
    revalidatePath('/admin/lexicon');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting lexicon word:', error);
    return { success: false, error: error.message || 'Failed to delete word' };
  }
}
