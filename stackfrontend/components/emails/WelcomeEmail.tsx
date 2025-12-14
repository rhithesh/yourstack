import React from 'react';

interface WelcomeEmailProps {
    interests?: string[];
    platforms?: string[];
    style?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
    interests = [],
    platforms = [],
    style = 'Default',
}) => {
    return (
        <div
            style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                backgroundColor: '#f4f4f7',
                padding: '20px',
                color: '#333',
                lineHeight: '1.6',
            }}
        >
            <div
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: '#000000',
                        padding: '30px',
                        textAlign: 'center',
                    }}
                >
                    <h1
                        style={{
                            color: '#ffffff',
                            margin: '0',
                            fontSize: '24px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        Welcome to YourStack
                    </h1>
                </div>

                {/* Body */}
                <div style={{ padding: '40px 30px' }}>
                    <h2 style={{ color: '#1a1a1a', marginTop: 0 }}>Hello there!</h2>
                    <p style={{ color: '#555555', fontSize: '16px' }}>
                        Thanks for joining our newsletter. We're thrilled to have you satisfy your curiosity with us. here is a summary of Your preferences
                    </p>

                    <div
                        style={{
                            backgroundColor: '#f9f9f9',
                            borderLeft: '4px solid #000000',
                            padding: '20px',
                            margin: '30px 0',
                        }}
                    >
                        <h3
                            style={{
                                marginTop: 0,
                                color: '#333',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Your Preferences
                        </h3>

                        <div style={{ marginBottom: '15px' }}>
                            <strong style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '5px' }}>INTERESTS</strong>
                            {interests.length > 0 ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {interests.map((interest, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                backgroundColor: '#e0e0e0',
                                                padding: '4px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span style={{ color: '#999', fontStyle: 'italic' }}>None selected</span>
                            )}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <strong style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '5px' }}>PLATFORMS</strong>
                            {platforms.length > 0 ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {platforms.map((platform, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                backgroundColor: '#e0e0e0',
                                                padding: '4px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {platform}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span style={{ color: '#999', fontStyle: 'italic' }}>None selected</span>
                            )}
                        </div>

                        <div>
                            <strong style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '5px' }}>STYLE</strong>
                            <span style={{ fontSize: '14px', color: '#333' }}>{style}</span>
                        </div>
                    </div>

                    <p style={{ color: '#555555', fontSize: '16px' }}>
                        Stay tuned for our upcoming updates tailored just for you.
                    </p>

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <a
                            href="https://yourstack.com"
                            style={{
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                padding: '12px 24px',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                display: 'inline-block',
                            }}
                        >
                            Visit YourStack
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        backgroundColor: '#f4f4f7',
                        padding: '20px',
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#999999',
                        borderTop: '1px solid #eeeeee',
                    }}
                >
                    <p style={{ margin: 0 }}>© {new Date().getFullYear()} YourStack. All rights reserved.</p>
                    <p style={{ margin: '5px 0 0 0' }}>
                        You signed up for this newsletter on our website.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeEmail;
