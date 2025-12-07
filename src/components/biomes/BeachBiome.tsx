'use client';

import styles from '@/styles/biomes.module.css';
import { useEffect, useState, useMemo } from 'react';

// --- Configuration & Types ---
interface Prop {
    x: number;
    y: number;
    type: 'rock' | 'shell';
    variant: number;
    scale: number;
    rotation?: number;
}

interface SandSpeck {
    x: number;
    y: number;
}

// --- Constants ---
const WORLD_WIDTH = 200; // Same longer width as GrassBiome
const WORLD_HEIGHT = 250;
const SHORE_BUFFER = 5; // Distance props must keep from the exact water line

// Colors (Matte/Flat style)
const C_SAND = '#fde68a'; // Amber-200
const C_WATER = '#93c5fd'; // Blue-300
const C_BORDR = '#f59e0b'; // Amber-500

// Helper: Seeded random-ish generator
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function BeachBiome({ height }: { height: number }) {
    const [isMounted, setIsMounted] = useState(false);

    // 1. Define Shoreline Function (Sine Wave mixture)
    // This defines the Y coordinate of the water's edge at any given X
    const getShoreY = (x: number) => {
        // The shore is lower down (around y=65) with gentle waves
        return 65 + 5 * Math.sin(x / 25) + 3 * Math.cos(x / 15);
    };

    // 2. Generate the SVG Path string for the Water (A filled polygon below the shore line)
    const waterPath = useMemo(() => {
        // Start at bottom left corner
        let d = `M 0,${WORLD_HEIGHT}`;
        // Line up to the start of the shore
        d += ` L 0,${getShoreY(0)}`;
        // Iterate across the width to build the wave
        for (let x = 5; x <= WORLD_WIDTH; x += 5) {
            d += ` L ${x},${getShoreY(x)}`;
        }
        // Line down to bottom right corner
        d += ` L ${WORLD_WIDTH},${WORLD_HEIGHT}`;
        // Close shape back to bottom left
        d += ` Z`;
        return d;
    }, []);

    // 3. Generate Environment Props (Rocks & Shells) with Collision Detection
    const props: Prop[] = useMemo(() => {
        const items: Prop[] = [];
        const count = 100;

        let attempts = 0;
        while (items.length < count && attempts < 500) {
            attempts++;

            let x = randomRange(5, WORLD_WIDTH - 5);
            // Generate Y randomly across the whole height initially
            let y = randomRange(5, WORLD_HEIGHT - 5);

            // --- COLLISION CHECK ---
            const shoreYAtPoint = getShoreY(x);

            // If the prop's Y is "below" the shore line (plus buffer), it's in the water.
            // In SVG coords, higher Y value means lower on screen.
            if (y > shoreYAtPoint - SHORE_BUFFER) {
                continue; // Skip, it's in the water
            }

            const type: Prop['type'] = Math.random() > 0.7 ? 'rock' : 'shell';

            items.push({
                x,
                y,
                type,
                variant: Math.floor(Math.random() * 3),
                scale: type === 'rock' ? randomRange(0.8, 1.2) : randomRange(0.4, 0.7),
                rotation: type === 'shell' ? randomRange(0, 360) : 0
            });
        }
        // Sort by Y for depth
        return items.sort((a, b) => a.y - b.y);
    }, []);

    // 4. Generate minimal sand texture (tiny specks)
    const sandSpecks: SandSpeck[] = useMemo(() => {
        const specks: SandSpeck[] = [];
        for (let i = 0; i < 120; i++) {
            const x = randomRange(2, WORLD_WIDTH - 2);
            const y = randomRange(2, WORLD_HEIGHT - 2);

            // Only place specks on the sand
            if (y < getShoreY(x)) {
                specks.push({ x, y });
            }
        }
        return specks;
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height, background: C_SAND }} />;

    return (
        <div
            className={`${styles.biomeBase} ${styles.beach}`}
            style={{
                height,
                position: 'relative',
                backgroundColor: C_SAND,
                overflow: 'hidden',
                borderRadius: '12px',
                border: `4px solid ${C_BORDR}`,
            }}
        >
            <svg
                style={{ width: '100%', height: '100%' }}
                // ViewBox matches the longer world width
                viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
                preserveAspectRatio="none"
            >
                {/* --- Layer 1: Solid Sand Background --- */}
                <rect width="100%" height="100%" fill={C_SAND} />

                {/* --- Layer 2: Minimal Sand Texture --- */}
                {sandSpecks.map((s, i) => (
                    <circle
                        key={`speck-${i}`}
                        cx={s.x} cy={s.y} r="0.4"
                        fill="#d97706" // Darker amber for contrast
                        opacity="0.3"
                    />
                ))}

                {/* --- Layer 3: The Ocean (Filled area below shore) --- */}
                <path
                    d={waterPath}
                    fill={C_WATER}
                    stroke="none"
                />
                {/* Optional: A subtle foam line at the edge */}
                <path
                    d={waterPath.split(' L ' + WORLD_WIDTH)[0].substring(WORLD_HEIGHT.toString().length + 4)} // Extract just the top curve part of the path roughly
                    fill="none"
                    stroke="#bfdbfe" // Lighter blue
                    strokeWidth="2"
                    opacity="0.5"
                />

                {/* --- Layer 4: Props on Sand --- */}
                {props.map((prop, i) => (
                    <g key={`prop-${i}`} transform={`translate(${prop.x}, ${prop.y}) scale(${prop.scale}) rotate(${prop.rotation || 0})`}>

                        {/* ROCK (Reused style from GrassBiome for consistency) */}
                        {prop.type === 'rock' && (
                            <g>
                                <path d="M-2,0 L-1,-1.5 L1,-2 L2,0 Z" fill="#a8a29e" /> {/* Warmer grey */}
                                <path d="M-2,0 L2,0 L0,1 Z" fill="#78716c" opacity="0.3" />
                            </g>
                        )}

                        {/* SHELL (Simple colorful circles/ovals) */}
                        {prop.type === 'shell' && (
                            <g>
                                {/* Small shadow */}
                                <ellipse cx="0" cy="0.5" rx="1.2" ry="0.8" fill="#d97706" opacity="0.2" />
                                {/* Shell body */}
                                <ellipse
                                    cx="0" cy="0" rx="1.5" ry="1.2"
                                    fill={['#fecdd3', '#bae6fd', '#e9d5ff'][prop.variant]} // Pastel pink, blue, purple
                                />
                                {/* Simple detail line */}
                                <path d="M -0.8,0 L 0.8,0" stroke="white" strokeWidth="0.3" opacity="0.5" />
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}