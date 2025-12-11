"use client";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export default function NewsletterVideo({ text = "HELLO REMOTION" }) {
    const frame = useCurrentFrame();

    // animate each character separately
    const letters = text.split("");

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "4rem",
                fontFamily: "sans-serif",
                color: "#111",
                overflow: "hidden",
            }}
        >
            {letters.map((char, i) => {
                // delay each letter by i * 3 frames
                const start = i * 3;
                const appear = interpolate(
                    frame,
                    [start, start + 15],
                    [0, 1],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                // scale from 1.2 to 1.0
                const scale = interpolate(
                    frame,
                    [start, start + 15],
                    [1.2, 1],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                // subtle vertical lift
                const y = interpolate(
                    frame,
                    [start, start + 15],
                    [20, 0],
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                return (
                    <span
                        key={i}
                        style={{
                            display: "inline-block",
                            opacity: appear,
                            transform: `translateY(${y}px) scale(${scale})`,
                            marginRight: "0.2em",
                            color: `hsl(${(i / letters.length) * 60 + 200}, 80%, 40%)`,
                            textShadow: `${appear * 5}px ${appear * 5}px 10px rgba(0,0,0,0.1)`,
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </div>
    );
}
