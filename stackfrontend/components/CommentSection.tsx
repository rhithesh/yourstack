'use client';

import { addComment } from '@/app/actions';
import { useState } from 'react';

type Comment = {
    id: number;
    content: string;
    createdAt: Date;
    replies: Comment[];
};

function CommentItem({ comment, postId }: { comment: Comment; postId: number }) {
    const [isReplying, setIsReplying] = useState(false);

    return (
        <div className="mb-4 pl-4 border-l-2 border-border">
            <div className="bg-card p-4 rounded-lg">
                <p className="text-foreground mb-2">{comment.content}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className="text-primary hover:underline"
                    >
                        Reply
                    </button>
                </div>
            </div>

            {isReplying && (
                <form action={addComment} className="mt-4 ml-4">
                    <input type="hidden" name="postId" value={postId} />
                    <input type="hidden" name="parentId" value={comment.id} />
                    <textarea
                        name="content"
                        required
                        className="w-full p-3 rounded-lg bg-input border border-input-border focus:border-primary outline-none mb-2"
                        placeholder="Write a reply..."
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold"
                    >
                        Post Reply
                    </button>
                </form>
            )}

            {comment.replies.length > 0 && (
                <div className="mt-4">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} postId={postId} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function CommentSection({ comments, postId }: { comments: Comment[]; postId: number }) {
    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Comments</h3>

            <form action={addComment} className="mb-8">
                <input type="hidden" name="postId" value={postId} />
                <textarea
                    name="content"
                    required
                    rows={3}
                    className="w-full p-4 rounded-xl bg-input border border-input-border focus:border-primary outline-none mb-4 text-lg"
                    placeholder="Share your thoughts..."
                />
                <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:shadow-primary/50 transition-all"
                >
                    Post Comment
                </button>
            </form>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} postId={postId} />
                ))}
            </div>
        </div>
    );
}
