'use client';

import styles from '@/styles/biomes.module.css';
import { useEffect, useState, useMemo } from 'react';

// --- Configuration & Types ---
interface Prop {
    x: number;
    y: number;
    type: 'tree' | 'rock';
    variant: number;
    scale: number;
}

interface Speck {
    x: number;
    y: number;
}

// --- Constants ---
const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 250;
const RIVER_WIDTH = 20; // Wider, slower river
const BUFFER = 25;

// Helper: Seeded random-ish generator
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function SwampBiome({ height }: { height: number }) {
    const [isMounted, setIsMounted] = useState(false);

    // 1. Define River Path (Winding, murky)
    const getRiverY = (x: number) => {
        return 50 + 25 * Math.sin(x / 30) + 10 * Math.cos(x / 15);
    };

    const riverPath = useMemo(() => {
        let d = `M 0,${getRiverY(0)}`;
        for (let x = 5; x <= WORLD_WIDTH; x += 5) {
            d += ` L ${x},${getRiverY(x)}`;
        }
        return d;
    }, []);

    // 2. Generate Environment Props
    const props: Prop[] = useMemo(() => {
        const items: Prop[] = [];
        const count = 130; // Dense

        let attempts = 0;
        while (items.length < count && attempts < 1000) {
            attempts++;
            let x = randomRange(5, WORLD_WIDTH - 5);
            let y = randomRange(5, WORLD_HEIGHT - 5);

            // Check collision with river
            const riverYAtPoint = getRiverY(x);
            if (Math.abs(y - riverYAtPoint) < BUFFER) continue;

            items.push({
                x,
                y,
                type: Math.random() > 0.4 ? 'tree' : 'rock',
                variant: Math.floor(Math.random() * 3),
                scale: randomRange(0.7, 1.2)
            });
        }
        return items.sort((a, b) => a.y - b.y);
    }, []);

    // 3. Texture (Bubbles/Gas)
    const bubbles: Speck[] = useMemo(() => {
        const items: Speck[] = [];
        for (let i = 0; i < 50; i++) {
            items.push({
                x: randomRange(0, WORLD_WIDTH),
                y: randomRange(0, WORLD_HEIGHT)
            });
        }
        return items;
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height, background: '#1a2e1a' }} />;

    return (
        <div
            style={{
                height,
                position: 'relative',
                backgroundColor: '#1a2e1a', // Dark swamp green
                overflow: 'hidden',
                border: '4px solid #0f1c0f',
            }}
        >
            <svg
                style={{ width: '100%', height: '100%' }}
                viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
                preserveAspectRatio="none"
            >
                {/* Background */}
                <rect width="100%" height="100%" fill="#1a2e1a" />

                {/* Murky River */}
                <path
                    d={riverPath}
                    fill="none"
                    stroke="#0b160b" // Very dark water
                    strokeWidth={RIVER_WIDTH}
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                />

                {/* Bubbles */}
                {bubbles.map((b, i) => (
                    <circle key={i} cx={b.x} cy={b.y} r={0.5} fill="#4ade80" opacity="0.3" />
                ))}

                {/* Props */}
                {props.map((p, i) => (
                    <g key={i} transform={`translate(${p.x}, ${p.y}) scale(${p.scale})`}>
                        {p.type === 'rock' ? (
                            // Mossy Rock
                            <g>
                                <path d="M-3,0 L-1,-2 L2,-1 L3,0 Z" fill="#2f382f" />
                                <path d="M-2,-1 L1,-1.5" stroke="#4a614a" strokeWidth="0.5" />
                            </g>
                        ) : (
                            // Dead/Swamp Tree
                            <g>
                                <rect x="-1" y="-2" width="2" height="6" fill="#181205" />
                                <path d="M0,-2 L-3,-5 M0,-2 L3,-4" stroke="#181205" strokeWidth="1" />
                                <circle cx="-2" cy="-4" r="1.5" fill="#3f4d3f" opacity="0.7" />
                                <circle cx="2" cy="-3" r="1.5" fill="#3f4d3f" opacity="0.7" />
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}
