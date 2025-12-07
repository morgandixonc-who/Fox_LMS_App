'use client';

import styles from '@/styles/biomes.module.css';
import { useEffect, useState, useMemo } from 'react';

// --- Configuration & Types ---
interface Prop {
    x: number;
    y: number;
    type: 'mushroom' | 'rock';
    variant: number; // Determines color
    scale: number;
}

interface SporeSpeck {
    x: number;
    y: number;
    size: number;
}

// --- Constants ---
const WORLD_WIDTH = 200; // Longer width
const WORLD_HEIGHT = 250;
const RIVER_WIDTH = 14;
const RIVER_BUFFER = 16; // Safety distance from river

// Colors (Matte/Pastel Magic Theme)
const C_GROUND = '#e9d5ff'; // Purple-200 (Lavender ground)
const C_RIVER = '#a78bfa'; // Purple-400 (River liquid)
const C_BORDER = '#7c3aed'; // Violet-600

// Helper: Seeded random-ish generator
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function MushroomBiome({ height }: { height: number }) {
    const [isMounted, setIsMounted] = useState(false);

    // 1. Define River Path (Winding Stream)
    const getRiverY = (x: number) => {
        // A slightly more "wobbly" curve for a magical feel
        return 50 + 25 * Math.sin(x / 35) + 8 * Math.cos(x / 10);
    };

    // 2. Generate River SVG Path
    const riverPath = useMemo(() => {
        let d = `M 0,${getRiverY(0)}`;
        for (let x = 5; x <= WORLD_WIDTH; x += 5) {
            d += ` L ${x},${getRiverY(x)}`;
        }
        return d;
    }, []);

    // 3. Generate Props (Mushrooms & Rocks)
    const props: Prop[] = useMemo(() => {
        const items: Prop[] = [];
        const count = 110;

        let attempts = 0;
        while (items.length < count && attempts < 500) {
            attempts++;

            let x = randomRange(5, WORLD_WIDTH - 5);
            let y = randomRange(5, WORLD_HEIGHT - 5);

            // --- COLLISION CHECK ---
            const riverY = getRiverY(x);
            if (Math.abs(y - riverY) < RIVER_BUFFER) {
                continue; // Too close to river
            }

            const type: Prop['type'] = Math.random() > 0.7 ? 'rock' : 'mushroom';

            items.push({
                x,
                y,
                type,
                variant: Math.floor(Math.random() * 3),
                scale: randomRange(0.8, 1.3)
            });
        }
        return items.sort((a, b) => a.y - b.y);
    }, []);

    // 4. Generate Ground Texture (Spores)
    const spores: SporeSpeck[] = useMemo(() => {
        const items: SporeSpeck[] = [];
        for (let i = 0; i < 75; i++) {
            const x = randomRange(2, WORLD_WIDTH - 2);
            const y = randomRange(2, WORLD_HEIGHT - 2);
            // Don't put spores in river
            if (Math.abs(y - getRiverY(x)) > RIVER_WIDTH / 2) {
                items.push({ x, y, size: randomRange(0.5, 1.5) });
            }
        }
        return items;
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height, background: C_GROUND }} />;

    return (
        <div
            className={`${styles.biomeBase} ${styles.mushroom}`}
            style={{
                height,
                position: 'relative',
                backgroundColor: C_GROUND,
                overflow: 'hidden',
                borderRadius: '12px',
                border: `4px solid ${C_BORDER}`,
            }}
        >
            <svg
                style={{ width: '100%', height: '100%' }}
                viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
                preserveAspectRatio="none"
            >
                {/* --- Layer 1: Ground --- */}
                <rect width="100%" height="100%" fill={C_GROUND} />

                {/* --- Layer 1.5: Spore Texture --- */}
                {spores.map((s, i) => (
                    <circle
                        key={`spore-${i}`}
                        cx={s.x} cy={s.y} r={s.size}
                        fill="#c084fc" // Purple-400
                        opacity="0.5"
                    />
                ))}

                {/* --- Layer 2: Magic River --- */}
                <path
                    d={riverPath}
                    fill="none"
                    stroke={C_RIVER}
                    strokeWidth={RIVER_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* --- Layer 3: Props --- */}
                {props.map((prop, i) => (
                    <g key={`prop-${i}`} transform={`translate(${prop.x}, ${prop.y}) scale(${prop.scale})`}>

                        {/* ROCK (Darker, mossy grey) */}
                        {prop.type === 'rock' && (
                            <g>
                                <path d="M-2,0 L-1,-1.5 L1,-2 L2,0 Z" fill="#64748b" />
                                <path d="M-2,0 L2,0 L0,1 Z" fill="#475569" opacity="0.3" />
                            </g>
                        )}

                        {/* MUSHROOM */}
                        {prop.type === 'mushroom' && (
                            <g>
                                {/* Shadow */}
                                <ellipse cx="0" cy="1" rx="2" ry="0.8" fill="#581c87" opacity="0.2" />

                                {/* Stalk (Chunky white/cream) */}
                                <rect x="-1" y="-1.5" width="2" height="3" fill="#f5f5f4" rx="0.5" />

                                {/* Cap (Flat bottom, rounded top) */}
                                <path
                                    d="M -3.5,-1.5 Q 0,-6 3.5,-1.5 Z"
                                    fill={['#ef4444', '#a855f7', '#3b82f6'][prop.variant]} // Red, Purple, Blue
                                />

                                {/* Spots on Cap (White circles) */}
                                <circle cx="-1.5" cy="-3" r="0.6" fill="white" opacity="0.8" />
                                <circle cx="1.8" cy="-2.5" r="0.5" fill="white" opacity="0.8" />
                                <circle cx="0" cy="-4" r="0.4" fill="white" opacity="0.8" />
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}