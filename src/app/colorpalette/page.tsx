"use client";

import React, { useState } from 'react';
import { getEmotion } from '@/lib/emotions';

import { useRouter } from 'next/navigation';

export default function ColorPalettePage() {
    const router = useRouter();

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
        const color = `hsl(${h}, 100%, 50%)`;

        // Navigate to the Level Intro Page
        router.push(`/level-intro?name=${encodeURIComponent(text)}&color=${encodeURIComponent(color)}&hue=${h}`);
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
            aria-label="Interactive color emotion map. Click to open a level."
        >
            {/* Simple instruction centered */}
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
                Click to Create Emotion
            </div>
        </div>
    );
}