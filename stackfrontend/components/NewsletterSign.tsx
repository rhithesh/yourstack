'use client';

import { useState } from 'react';

const PLATFORMS = [
    'yourStack',
    'Dev.to',
    'Substack',
    'Hacker News',
    'TechCrunch',
];

export default function NewsletterSignup() {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>('');
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const togglePlatform = (platform: string) => {
        setPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    const handleSubmit = () => {
        if (!email || platforms.length === 0) return;

        // Placeholder for API call
        console.log({
            email,
            platforms,
        });

        setSubmitted(true);
    };

    if (submitted) {
    }

    return (
        <div className="box text-black">
            {step === 1 && (
                <>
                    <h2 className='text-black'>📩 Join Our Tech Newsletter</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        disabled={!email}
                        onClick={() => setStep(2)}
                    >
                        Continue
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2>📰 Choose Your Content</h2>

                    <div className="platforms flex gap-2 ">
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
                        onClick={() => { handleSubmit(); setStep(3) }}
                    >
                        Subscribe
                    </button>
                </>
            )}

            {
                step == 3 && (
                    <div className=" border-none">
                        <h2>✅ You're subscribed!</h2>
                        <p>You'll receive curated content from:</p>
                        <ul>
                            {platforms.map((p) => (
                                <li key={p}>{p}</li>
                            ))}
                        </ul>
                    </div>

                )

            }

            <style jsx>{`
  .box {
    width: 420px;
    height: 300px;          /* 🔥 FIXED HEIGHT */
    margin: 40px auto;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    background: black;
    text-align: center;
    color: white;

    display: flex;          /* 🔥 Enable flex */
    flex-direction: column; 
    justify-content: center; /* 🔥 Vertically center content */
    align-items: center;     /* 🔥 Horizontally center content */
    overflow: hidden;        /* Prevent overflow issues */
  }

  h2 {
    margin-bottom: 16px;
    color: white;
  }

  input[type='email'] {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #ffffff;
    background: black;
    color: white;
  }

  input[type='email']::placeholder {
    color: #aaaaaa;
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
    width: 100%;             /* so checkboxes align */
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 16px;
    text-align: left;
    color: white;
  }

  

  label {
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`}</style>
        </div>
    );
}