'use client';

import styles from '@/styles/biomes.module.css';
import { useEffect, useState, useMemo } from 'react';

// --- Configuration & Types ---
interface Prop {
    x: number;
    y: number;
    type: 'cactus' | 'rock' | 'skull';
    variant: number;
    scale: number;
}

interface SandGrain {
    x: number;
    y: number;
    color: string;
}

// --- Constants ---
const WORLD_WIDTH = 200;
const WORLD_HEIGHT = 250;

// Helper: Seeded random-ish generator
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function DesertBiome({ height }: { height: number }) {
    const [isMounted, setIsMounted] = useState(false);

    // 1. Generate Props (Cacti, Rocks, Dry Bones)
    const props: Prop[] = useMemo(() => {
        const items: Prop[] = [];
        const count = 50; // Sparse

        let attempts = 0;
        while (items.length < count && attempts < 500) {
            attempts++;
            let x = randomRange(5, WORLD_WIDTH - 5);
            let y = randomRange(5, WORLD_HEIGHT - 5);

            // No river to avoid, freely place
            items.push({
                x,
                y,
                type: Math.random() > 0.7 ? 'cactus' : Math.random() > 0.9 ? 'skull' : 'rock',
                variant: Math.floor(Math.random() * 3),
                scale: randomRange(0.8, 1.3)
            });
        }
        return items.sort((a, b) => a.y - b.y);
    }, []);

    // 2. Texture (Sand Grains)
    const sand: SandGrain[] = useMemo(() => {
        const items: SandGrain[] = [];
        const colors = ['#fde047', '#facc15', '#eab308'];
        for (let i = 0; i < 200; i++) {
            items.push({
                x: randomRange(0, WORLD_WIDTH),
                y: randomRange(0, WORLD_HEIGHT),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        return items;
    }, []);

    // 3. Dunes (Sine waves)
    const dunes = useMemo(() => {
        let paths = [];
        for (let i = 0; i < 3; i++) {
            let yBase = (WORLD_HEIGHT / 4) * (i + 1);
            let d = `M 0,${yBase}`;
            for (let x = 0; x <= WORLD_WIDTH; x += 10) {
                d += ` Q ${x + 5} ${yBase - 15} ${x + 10} ${yBase}`;
            }
            // Actually, let's just do gentle curves
            d = `M 0,${yBase} Q ${WORLD_WIDTH / 2} ${yBase - 30} ${WORLD_WIDTH} ${yBase + 10}`;
            paths.push(d);
        }
        return paths;
    }, []);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height, background: '#fef3c7' }} />;

    return (
        <div
            style={{
                height,
                position: 'relative',
                backgroundColor: '#fef3c7', // Pale yellow sand
                overflow: 'hidden',
                border: '4px solid #fde047',
            }}
        >
            <svg
                style={{ width: '100%', height: '100%' }}
                viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
                preserveAspectRatio="none"
            >
                {/* Background */}
                <rect width="100%" height="100%" fill="#fef3c7" />

                {/* Dunes (Subtle) */}
                {dunes.map((d, i) => (
                    <path key={i} d={d} fill="none" stroke="#fcd34d" strokeWidth="20" opacity="0.4" />
                ))}

                {/* Sand Grains */}
                {sand.map((s, i) => (
                    <rect key={i} x={s.x} y={s.y} width="1" height="1" fill={s.color} opacity="0.6" />
                ))}

                {/* Props */}
                {props.map((p, i) => (
                    <g key={i} transform={`translate(${p.x}, ${p.y}) scale(${p.scale})`}>
                        {p.type === 'rock' && (
                            <path d="M-3,0 L-1,-2 L3,-1 L2,0 Z" fill="#d6d3d1" />
                        )}
                        {p.type === 'cactus' && (
                            <g>
                                <rect x="-1" y="-5" width="2" height="6" fill="#15803d" rx="1" />
                                <rect x="-3" y="-4" width="4" height="1.5" fill="#15803d" rx="0.5" />
                                <rect x="-3" y="-5.5" width="1.5" height="2" fill="#15803d" rx="0.5" />
                                <rect x="1" y="-3" width="2.5" height="1.5" fill="#15803d" rx="0.5" />
                                <rect x="2" y="-4.5" width="1.5" height="2" fill="#15803d" rx="0.5" />
                            </g>
                        )}
                        {p.type === 'skull' && (
                            <g opacity="0.8">
                                <circle cx="0" cy="-1" r="1.5" fill="#e7e5e4" />
                                <rect x="-1" y="0" width="2" height="1" fill="#e7e5e4" />
                                <circle cx="-0.5" cy="-1.2" r="0.4" fill="#44403c" />
                                <circle cx="0.5" cy="-1.2" r="0.4" fill="#44403c" />
                            </g>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
}
