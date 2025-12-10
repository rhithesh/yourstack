'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;

    if (!title || !content || !category) {
        throw new Error('Missing required fields');
    }

    await prisma.post.create({
        data: {
            title,
            content,
            category,
            status: 'PENDING', // Default status
        },
    });

    revalidatePath('/');
    redirect('/');
}

export async function votePost(postId: number, type: 'up' | 'down') {
    if (type === 'up') {
        await prisma.post.update({
            where: { id: postId },
            data: { upvotes: { increment: 1 } },
        });
    } else {
        await prisma.post.update({
            where: { id: postId },
            data: { downvotes: { increment: 1 } },
        });
    }
    revalidatePath('/');
}

export async function addComment(formData: FormData) {
    const content = formData.get('content') as string;
    const postId = parseInt(formData.get('postId') as string);
    const parentId = formData.get('parentId') ? parseInt(formData.get('parentId') as string) : null;

    if (!content || !postId) return;

    await prisma.comment.create({
        data: {
            content,
            postId,
            parentId,
        },
    });

    revalidatePath(`/post/${postId}`);
}
