import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Basic security check (optional: add a secret key check)
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return new NextResponse('Unauthorized', { status: 401 });
    // }

    try {
        const subscribers = await prisma.subscriber.findMany({
            where: { isActive: true },
        });

        const kestraUrl = 'http://localhost:8080/api/v1/main/executions/company.team/cormorant_753108';

        const results = await Promise.allSettled(subscribers.map(async (sub) => {
            const formData = new FormData();
            // Inputs expected by Kestra workflow
            formData.append('email', sub.email);
            formData.append('name', sub.email.split('@')[0]); // Simple name derivation
            formData.append('platforms', JSON.stringify(["dev.to", "hackernews", "techcrunch"]));

            const response = await fetch(kestraUrl, {
                method: 'POST',
                body: formData, // FormData automatically sets Content-Type to multipart/form-data
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Kestra failed for ${sub.email}: ${response.status} ${text}`);
            }
            return response.json();
        }));

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        const failureCount = results.filter(r => r.status === 'rejected').length;

        return NextResponse.json({
            success: true,
            message: `Triggered ${successCount} workflows. Failed: ${failureCount}`,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
