'use client';

import { subscribeToNewsletter } from '@/app/actions';
import { useState } from 'react';

export default function DailyTechUpdate() {
    const updates = [
        "AI models are getting smaller and faster! Distillation is the new trend.",
        "Rust is becoming the go-to language for high-performance systems.",
        "Quantum computing is inching closer to practical application with new error correction methods.",
        "WebAssembly is enabling desktop-class applications in the browser.",
        "The future of coding is agentic AI assistants working alongside developers."
    ];

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Simple random selection for now, could be based on date
    const update = updates[Math.floor(Math.random() * updates.length)];

    async function handleSubmit(formData: FormData) {
        try {
            await subscribeToNewsletter(formData);
            setStatus('success');
        } catch (e) {
            setStatus('error');
        }
    }

    return (
        <div className="mb-12 p-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
            <div className="bg-card h-full rounded-xl p-6 text-center">
                <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Daily Tech Update
                </h2>
                <p className="text-lg text-foreground font-medium mb-6">
                    {update}
                </p>

                <div className="max-w-md mx-auto mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-3">Get these updates in your inbox!</p>
                    {status === 'success' ? (
                        <p className="text-green-500 font-medium">Thanks for subscribing!</p>
                    ) : (
                        <form action={handleSubmit} className="flex gap-2">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                    {status === 'error' && <p className="text-red-500 text-xs mt-2">Something went wrong. Try again.</p>}
                </div>
            </div>
        </div>
    );
}
