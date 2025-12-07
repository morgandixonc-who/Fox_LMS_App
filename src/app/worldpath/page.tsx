'use client';

import { generateWorld, BiomeConfig } from '@/lib/biomes';
import BiomeSection from '@/components/BiomeSection';
import { useState, useMemo } from 'react';

export default function WorldPathPage() {
    const [world] = useState<BiomeConfig[]>(() => generateWorld(3)); // Generate 3 cycles initially

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: '#000' }}>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px', pointerEvents: 'none' }}>
                <h1 className="title" style={{
                    color: 'white',
                    textShadow: '0 4px 0 #000',
                    margin: 0,
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                }}>
                    Infinite World
                </h1>
            </header>

            <div style={{ paddingBottom: '0' }}>
                {world.map((biome, index) => (
                    <BiomeSection key={index} config={biome} />
                ))}
            </div>
        </div>
    );
}
