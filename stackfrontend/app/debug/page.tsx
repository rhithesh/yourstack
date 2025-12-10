import { cookies } from 'next/headers';

export default async function DebugPage() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold mb-4">Debug Session</h1>
            <p className="text-xl">Session ID: <span className="font-mono bg-gray-800 p-2 rounded">{sessionId || 'None'}</span></p>
        </div>
    );
}
