'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="text-6xl font-[family-name:var(--font-bitcount)] mb-4">Error</h1>
            <h2 className="text-2xl font-semibold mb-6">Something went wrong!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
                An unexpected error occurred. Please try again later.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 rounded-lg bg-primary text-background hover:bg-primary/90 transition-colors font-medium"
                >
                    Try again
                </button>
                <a
                    href="/"
                    className="px-6 py-3 rounded-lg border border-border hover:bg-card transition-colors font-medium"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
