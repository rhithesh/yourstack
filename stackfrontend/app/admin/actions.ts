'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;

    if (password === 'admin123') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', { httpOnly: true, path: '/' });
        redirect('/admin/dashboard');
    } else {
        return { error: 'Invalid password' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function approvePost(postId: number) {
    await prisma.post.update({
        where: { id: postId },
        data: { status: 'APPROVED' },
    });
    revalidatePath('/admin/dashboard');
    revalidatePath('/');
}

export async function declinePost(postId: number) {
    await prisma.post.update({
        where: { id: postId },
        data: { status: 'REJECTED' },
    });
    revalidatePath('/admin/dashboard');
    revalidatePath('/');
}
