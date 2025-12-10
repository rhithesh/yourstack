'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
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
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    if (!sessionId) {
        // Should be handled by middleware, but just in case
        return;
    }

    const existingVote = await prisma.vote.findUnique({
        where: {
            postId_sessionId: {
                postId,
                sessionId,
            },
        },
    });

    console.log('Existing Vote:', existingVote);

    if (existingVote) {
        if (existingVote.type === type) {
            // User already voted this way, do nothing (or toggle off if desired)
            return;
        } else {
            // Change vote
            await prisma.$transaction([
                prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { type },
                }),
                prisma.post.update({
                    where: { id: postId },
                    data: {
                        upvotes: type === 'up' ? { increment: 1 } : { decrement: 1 },
                        downvotes: type === 'down' ? { increment: 1 } : { decrement: 1 },
                    },
                }),
            ]);
        }
    } else {
        // New vote
        await prisma.$transaction([
            prisma.vote.create({
                data: {
                    postId,
                    sessionId,
                    type,
                },
            }),
            prisma.post.update({
                where: { id: postId },
                data: {
                    upvotes: type === 'up' ? { increment: 1 } : undefined,
                    downvotes: type === 'down' ? { increment: 1 } : undefined,
                },
            }),
        ]);
    }

    revalidatePath('/');
    revalidatePath(`/post/${postId}`);
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
