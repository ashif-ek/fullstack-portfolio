'use server';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

export async function deleteMessage(id: number) {
    try {
        await prisma.message.delete({
            where: { id }
        });
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteAllMessages() {
    try {
        await prisma.message.deleteMany();
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
