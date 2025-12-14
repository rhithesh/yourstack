'use client';

import { useState } from 'react';

const PLATFORMS = [
    'yourStack',
    'Dev.to',
    'Hacker News',
    'TechCrunch',
];

const INTERESTS = [
    'AI',
    'Developer Productivity',
    'Infrastructure',
    'Tech Economics',
];

const STYLES = [
    'PROFESSIONAL',
    'SELF_DEPRECIATING',
    'FUNNY',
];

export default function NewsletterSignup() {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>('');
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [style, setStyle] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const togglePlatform = (platform: string) => {
        setPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    const toggleInterest = (interest: string) => {
        setInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = () => {
        if (!email || platforms.length === 0 || interests.length === 0 || !style) return;

        // Replace with API call
        console.log({
            email,
            platforms,
            interests,
            style,
        });
        async function apiCall() {

            const data = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    platforms,
                    interests,
                    style,
                }),
            });



        }
        apiCall()

        setSubmitted(true);
    };

    return (
        <div className="box">

            {/* STEP 1 — EMAIL */}
            {step === 1 && (
                <>
                    <h2>📩 Join Our Tech Newsletter</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button disabled={!email} onClick={() => setStep(2)}>
                        Continue
                    </button>
                </>
            )}

            {/* STEP 2 — PLATFORMS */}
            {step === 2 && (
                <>
                    <h2>📰 Choose Platforms</h2>
                    <div className="platforms">
                        {PLATFORMS.map((platform) => (
                            <label key={platform}>
                                <input
                                    type="checkbox"
                                    checked={platforms.includes(platform)}
                                    onChange={() => togglePlatform(platform)}
                                />
                                {platform}
                            </label>
                        ))}
                    </div>
                    <button
                        disabled={platforms.length === 0}
                        onClick={() => setStep(3)}
                    >
                        Continue
                    </button>
                </>
            )}

            {/* STEP 3 — INTERESTS */}
            {step === 3 && (
                <>
                    <h2>🎯 Select Your Interests</h2>
                    <div className="platforms">
                        {INTERESTS.map((interest) => (
                            <label key={interest}>
                                <input
                                    type="checkbox"
                                    checked={interests.includes(interest)}
                                    onChange={() => toggleInterest(interest)}
                                />
                                {interest}
                            </label>
                        ))}
                    </div>
                    <button
                        disabled={interests.length === 0}
                        onClick={() => setStep(4)}
                    >
                        Continue
                    </button>
                </>
            )}

            {/* STEP 4 — STYLE */}
            {step === 4 && (
                <>
                    <h2>✍️ Choose Writing Style</h2>

                    <div className=" ">
                        {STYLES.map((s) => (
                            <button
                                key={s}
                                type="button"
                                className={` my-2 style-btn ${style === s ? 'active' : ''}`}
                                onClick={() => setStyle(s)}
                            >
                                {s.replace('_', ' ')}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={!style}
                        onClick={() => {
                            handleSubmit();
                            setStep(5);
                        }}
                    >
                        Subscribe
                    </button>
                </>
            )}

            {/* STEP 5 — SUCCESS */}
            {step === 5 && submitted && (
                <div>
                    <h2>✅ You're subscribed!</h2>

                    <p><strong>Platforms:</strong></p>
                    <ul>
                        {platforms.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>

                    <p><strong>Interests:</strong></p>
                    <ul>
                        {interests.map((i) => (
                            <li key={i}>{i}</li>
                        ))}
                    </ul>

                    <p><strong>Style:</strong> {style?.replace('_', ' ')}</p>
                </div>
            )}

            <style jsx>{`
                .box {
                    width: 420px;
                    height: 320px;
                    margin: 40px auto;
                    padding: 24px;
                    border-radius: 12px;
                    border: 1px solid white;
                    background: black;
                    text-align: center;
                    color: white;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                h2 {
                    margin-bottom: 16px;
                }

                input[type='email'] {
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 16px;
                    border-radius: 8px;
                    border: 1px solid white;
                    background: black;
                    color: white;
                }

                input::placeholder {
                    color: #aaa;
                }

                button {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid white;
                    background: white;
                    color: black;
                    font-weight: 600;
                    cursor: pointer;
                }

                button:disabled {
                    background: #333;
                    border-color: #555;
                    color: #888;
                    cursor: not-allowed;
                }

                .platforms {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 16px;
                    text-align: left;
                }

                label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .styles {
                    width: 100%;
                    display: flex;
                    gap: 10px;
                    margin-bottom: 16px;
                }

                .style-btn {
                    flex: 1;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid white;
                    background: black;
                    color: white;
                    cursor: pointer;
                }

                .style-btn.active {
                    background: white;
                    color: black;
                }

                ul {
                    margin: 8px 0;
                    padding-left: 20px;
                    text-align: left;
                }
            `}</style>
        </div>
    );
}
