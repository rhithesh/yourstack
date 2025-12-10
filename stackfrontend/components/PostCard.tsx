'use client';

import { votePost } from '@/app/actions';
import { useOptimistic, startTransition } from 'react';
import Link from 'next/link';

type Post = {
    id: number;
    title: string;
    content: string;
    category: string;
    upvotes: number;
    downvotes: number;
    createdAt: Date;
};

export default function PostCard({ post }: { post: Post }) {
    const [optimisticUpvotes, addOptimisticUpvote] = useOptimistic(
        post.upvotes,
        (state, newVote: number) => state + newVote
    );

    const [optimisticDownvotes, addOptimisticDownvote] = useOptimistic(
        post.downvotes,
        (state, newVote: number) => state + newVote
    );

    const handleVote = async (type: 'up' | 'down') => {
        startTransition(() => {
            if (type === 'up') {
                addOptimisticUpvote(1);
            } else {
                addOptimisticDownvote(1);
            }
        });
        await votePost(post.id, type);
    };

    return (
        <div className="bg-card p-6 rounded-2xl border border-border shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary mb-2">
                    {post.category}
                </span>
                <span className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>
            <Link href={`/post/${post.id}`} className="hover:text-primary transition-colors">
                <h2 className="text-2xl font-bold mb-3 text-foreground">{post.title}</h2>
            </Link>
            <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">{post.content}</p>

            <div className="flex items-center gap-4 mt-auto">
                <button
                    onClick={() => handleVote('up')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-input hover:bg-primary/20 hover:text-primary transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                    <span>{optimisticUpvotes}</span>
                </button>

                <button
                    onClick={() => handleVote('down')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-input hover:bg-red-500/20 hover:text-red-500 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>{optimisticDownvotes}</span>
                </button>
            </div>
        </div>
    );
}
