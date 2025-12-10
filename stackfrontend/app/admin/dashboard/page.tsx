import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { approvePost, declinePost, logout } from '../actions';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        redirect('/admin/login');
    }

    const pendingPosts = await prisma.post.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-primary">
                        Moderation Dashboard
                    </h1>
                    <form action={logout}>
                        <button className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-border transition-colors">
                            Logout
                        </button>
                    </form>
                </div>

                {pendingPosts.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-2xl border border-border">
                        <p className="text-xl text-muted-foreground">No pending posts to review.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {pendingPosts.map((post) => (
                            <div key={post.id} className="bg-card p-6 rounded-2xl border border-border shadow-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary mb-2">
                                            {post.category}
                                        </span>
                                        <h2 className="text-2xl font-bold">{post.title}</h2>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-muted-foreground mb-6 whitespace-pre-wrap">{post.content}</p>
                                <div className="flex gap-4">
                                    <form action={approvePost.bind(null, post.id)}>
                                        <button className="px-6 py-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 font-semibold transition-colors">
                                            Approve
                                        </button>
                                    </form>
                                    <form action={declinePost.bind(null, post.id)}>
                                        <button className="px-6 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 font-semibold transition-colors">
                                            Decline
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
