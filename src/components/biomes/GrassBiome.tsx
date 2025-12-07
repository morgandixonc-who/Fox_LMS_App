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

interface GrassTuft {
    x: number;
    y: number;
}

// --- Constants ---
const WORLD_WIDTH = 200; // Increased from 100 to make it "longer"
const WORLD_HEIGHT = 250;
const RIVER_WIDTH = 12; // Visual width of the river
const RIVER_BUFFER = 16; // Minimum distance props must be from river center

// Helper: Seeded random-ish generator
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function GrassBiome({ height }: { height: number }) {
    const [isMounted, setIsMounted] = useState(false);

    // 1. Define River Path Function (Sine Wave)
    // We define this as a function so we can use it for both drawing AND collision logic
    const getRiverY = (x: number) => {
        // A gentle sine wave that meanders through the center
        return 50 + 20 * Math.sin(x / 40) + 5 * Math.sin(x / 10);
    };

    // 2. Generate the SVG Path string for the river based on the function
    const riverPath = useMemo(() => {
        let d = `M 0,${getRiverY(0)}`;
        // Iterate across the width to build the curve
        for (let x = 5; x <= WORLD_WIDTH; x += 5) {
            d += ` L ${x},${getRiverY(x)}`;
        }
        return d;
    }, []);

    // 3. Generate Environment Props (Trees & Rocks) with Collision Detection
    const props: Prop[] = useMemo(() => {
        const items: Prop[] = [];
        const count = 120; // Increased count to fill the longer world

        let attempts = 0;
        while (items.length < count && attempts < 500) {
            attempts++;

            let x = randomRange(5, WORLD_WIDTH - 5);
            let y = randomRange(5, WORLD_HEIGHT - 5);

            // --- COLLISION CHECK ---
            const riverYAtPoint = getRiverY(x);
            const distFromRiver = Math.abs(y - riverYAtPoint);

            // If too close to river, skip this attempt
            if (distFromRiver < RIVER_BUFFER) {
                continue;
            }

            const type: Prop['type'] = Math.random() > 0.6 ? 'tree' : 'rock';

            items.push({
                x,
                y,
                type,
                variant: Math.floor(Math.random() * 3),
                scale: randomRange(0.8, 1.1)
            });
        }
        // Sort by Y for depth
        return items.sort((a, b) => a.y - b.y);
    }, []);

    // 4. Generate minimal grass texture
    const grassTufts: GrassTuft[] = useMemo(() => {
        const tufts: GrassTuft[] = [];
        for (let i = 0; i < 100; i++) { // More tufts for longer world
            const x = randomRange(2, WORLD_WIDTH - 2);
            const y = randomRange(2, WORLD_HEIGHT - 2);

            // Optional: Don't put grass IN the river either (visual preference)
            if (Math.abs(y - getRiverY(x)) > RIVER_WIDTH / 2) {
                tufts.push({ x, y });
            }
        }
        return tufts;
    }, [riverPath]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height, background: '#bef264' }} />;

    return (
        <div
            className={`${styles.biomeBase} ${styles.grass}`}
            style={{
                height,
                position: 'relative',
                backgroundColor: '#bef264',
                overflow: 'hidden',
                borderRadius: '12px',
                border: '4px solid #84cc16',
            }}
        >
            <svg
                style={{ width: '100%', height: '100%' }}
                // Updated viewBox to be 200 wide (Longer)
                viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
                preserveAspectRatio="none" // Stretches to fill container
            >
                {/* --- Layer 1: Flat Ground --- */}
                <rect width="100%" height="100%" fill="#bef264" />

                {/* --- Layer 1.5: Minimal Grass Tufts --- */}
                {grassTufts.map((t, i) => (
                    <path
                        key={`tuft-${i}`}
                        d={`M${t.x},${t.y} l1,-1.5 l1,1.5`}
                        stroke="#65a30d"
                        strokeWidth="0.5"
                        fill="none"
                        opacity="0.4"
                    />
                ))}

                {/* --- Layer 2: River --- */}
                {/* We use the generated path here */}
                <path
                    d={riverPath}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth={RIVER_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round" // Smooths out the segmented line
                />

                {/* --- Layer 3: Props --- */}
                {props.map((prop, i) => (
                    <g key={`prop-${i}`} transform={`translate(${prop.x}, ${prop.y}) scale(${prop.scale})`}>

                        {/* ROCK */}
                        {prop.type === 'rock' && (
                            <g>
                                <path d="M-2,0 L-1,-1.5 L1,-2 L2,0 Z" fill="#9ca3af" />
                                <path d="M-2,0 L2,0 L0,1 Z" fill="#6b7280" opacity="0.3" />
                            </g>
                        )}

                        {/* TREE */}
                        {prop.type === 'tree' && (
                            <g>
                                {/* Shadow */}
                                <ellipse cx="0" cy="1" rx="2.5" ry="1" fill="#3f6212" opacity="0.2" />
                                {/* Trunk */}
                                <rect x="-0.5" y="-1" width="1" height="3" fill="#854d0e" rx="0.5" />
                                {/* Leaves */}
                                <circle cy="-3" r="3.5" fill="#4d7c0f" />
                                <path d="M-2.5,-3 A 2.5,2.5 0 0,1 0,-5" stroke="#65a30d" strokeWidth="0.5" strokeLinecap="round" opacity="0.5" fill="none" />
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}