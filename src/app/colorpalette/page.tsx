"use client";

import React, { useState } from 'react';
import { getEmotion } from '@/lib/emotions';

export default function ColorPalettePage() {
    const [emotion, setEmotion] = useState<{ text: string; x: number; y: number; color: string } | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();

        const xParam = clientX / width;
        const yParam = clientY / height;

        // Calculate Hue (0-360) based on X
        const h = xParam * 360;

        // Calculate Lightness (0-100) based on Y
        const l = 100 - (yParam * 100);

        const text = getEmotion(h, l);

        // Dynamic text color based on lightness
        const textColor = l < 50 ? 'white' : 'black';

        setEmotion({
            text,
            x: clientX,
            y: clientY,
            color: textColor
        });
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 50,
                cursor: 'crosshair',
                // Standard Color Picker Gradient: Hue on X, Lightness on Y
                background: `
                    linear-gradient(to bottom, white 0%, transparent 50%, black 100%),
                    linear-gradient(to right, 
                        #ff0000 0%, 
                        #ff0000 4.16%,
                        #ff8000 8.33%, 
                        #ffff00 16.66%, 
                        #80ff00 25%, 
                        #00ff00 33.33%, 
                        #00ff80 41.66%, 
                        #00ffff 50%, 
                        #0080ff 58.33%, 
                        #0000ff 66.66%, 
                        #8000ff 75%, 
                        #ff00ff 83.33%, 
                        #ff0080 91.66%, 
                        #ff0000 100%
                    )
                `,
                backgroundBlendMode: 'normal'
            }}
            aria-label="Interactive color emotion map. Click to reveal an emotion."
        >
            {emotion && (
                <div style={{
                    position: 'absolute',
                    top: emotion.y,
                    left: emotion.x,
                    transform: 'translate(-50%, -100%) translateY(-30px)',
                    color: emotion.color,
                    textAlign: 'center',
                    pointerEvents: 'none',
                    width: '300px', // Prevent text from getting too wide
                    animation: 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        lineHeight: '1',
                        margin: 0,
                        textShadow: emotion.color === 'white'
                            ? '0 2px 20px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,1)'
                            : '0 2px 20px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,1)',
                        letterSpacing: '-2px',
                        fontFamily: 'sans-serif'
                    }}>
                        {emotion.text}
                    </h2>

                    {/* Tiny coordinate display for tech feel */}
                    <div style={{
                        fontSize: '0.7rem',
                        marginTop: '5px',
                        opacity: 0.7,
                        fontFamily: 'monospace',
                        letterSpacing: '1px'
                    }}>
                        COORD: {Math.floor(emotion.x)} : {Math.floor(emotion.y)}
                    </div>

                    <style jsx>{`
            @keyframes popIn {
              from { transform: translate(-50%, -100%) translateY(0px) scale(0.8); opacity: 0; }
              to { transform: translate(-50%, -100%) translateY(-30px) scale(1); opacity: 1; }
            }
          `}</style>
                </div>
            )}

            {!emotion && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'rgba(0,0,0,0.5)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2rem'
                }}>
                    Select a Frequency
                </div>
            )}
        </div>
    );
}