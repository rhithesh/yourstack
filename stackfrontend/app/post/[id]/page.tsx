import { prisma } from '@/lib/prisma';
import CommentSection from '@/components/CommentSection';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
        notFound();
    }

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    const allComments = await prisma.comment.findMany({
        where: { postId: id },
        orderBy: { createdAt: 'asc' },
    });

    // Build comment tree
    const commentMap = new Map();
    const rootComments: any[] = [];

    allComments.forEach((comment) => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    allComments.forEach((comment) => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.replies.push(commentMap.get(comment.id));
            }
        } else {
            rootComments.push(commentMap.get(comment.id));
        }
    });

    return (
        <main className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="text-primary hover:underline mb-8 inline-block">
                    &larr; Back to Home
                </Link>

                <article className="bg-card p-8 rounded-2xl border border-border shadow-2xl mb-12">
                    <div className="flex justify-between items-start mb-6">
                        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-primary/20 text-primary">
                            {post.category}
                        </span>
                        <span className="text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-6 text-foreground">{post.title}</h1>
                    <div className="prose prose-invert max-w-none text-lg text-muted-foreground whitespace-pre-wrap">
                        {post.content}
                    </div>
                </article>

                <CommentSection comments={rootComments} postId={id} />
            </div>
        </main>
    );
}
