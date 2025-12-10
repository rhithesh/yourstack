import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';
import DailyTechUpdate from '@/components/DailyTechUpdate';
import Link from 'next/link';

export default async function Home(props: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const sort = searchParams.sort || 'recent';

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'upvotes') orderBy = { upvotes: 'desc' };
  if (sort === 'downvotes') orderBy = { downvotes: 'desc' };

  const posts = await prisma.post.findMany({
    where: {
      status: 'APPROVED',
      ...(category ? { category } : {}),
    },
    orderBy,
  });

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            TechAnon
          </h1>
          <Link
            href="/create"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            Write a Post
          </Link>
        </div>

        <DailyTechUpdate />

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${!category ? 'bg-primary text-white' : 'bg-card hover:bg-primary/20'}`}
            >
              All
            </Link>
            {['AI', 'Software-engineering', 'research-breakthroughs'].map((cat) => (
              <Link
                key={cat}
                href={`/?category=${cat}&sort=${sort}`}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${category === cat ? 'bg-primary text-white' : 'bg-card hover:bg-primary/20'}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 ml-auto">
            <Link
              href={`/?category=${category || ''}&sort=recent`}
              className={`px-4 py-2 rounded-lg transition-colors ${sort === 'recent' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Recent
            </Link>
            <Link
              href={`/?category=${category || ''}&sort=upvotes`}
              className={`px-4 py-2 rounded-lg transition-colors ${sort === 'upvotes' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Most Upvoted
            </Link>
            <Link
              href={`/?category=${category || ''}&sort=downvotes`}
              className={`px-4 py-2 rounded-lg transition-colors ${sort === 'downvotes' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Most Downvoted
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No posts found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
