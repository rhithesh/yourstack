import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Find the existing post
    const post = await prisma.post.findFirst();
    if (!post) {
        console.error('No posts found to comment on.');
        return;
    }
    console.log(`Found post: ${post.title} (ID: ${post.id})`);

    // 2. Create a root comment
    const comment = await prisma.comment.create({
        data: {
            content: 'This is a test comment from the verification script.',
            postId: post.id,
        },
    });
    console.log(`Created comment: ${comment.content} (ID: ${comment.id})`);

    // 3. Create a reply
    const reply = await prisma.comment.create({
        data: {
            content: 'This is a test reply.',
            postId: post.id,
            parentId: comment.id,
        },
    });
    console.log(`Created reply: ${reply.content} (ID: ${reply.id}) linked to parent ${reply.parentId}`);

    // 4. Verify fetching
    const comments = await prisma.comment.findMany({
        where: { postId: post.id },
        include: { replies: true },
    });

    console.log('All comments for post:');
    console.dir(comments, { depth: null });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
