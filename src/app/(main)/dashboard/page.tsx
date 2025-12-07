'use client';

import { generateWorld, BiomeConfig } from '@/lib/biomes';
import BiomeSection from '@/components/BiomeSection';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEmotion } from '@/lib/emotions';
import { getLevelColor, getLevelHue } from '@/lib/levelColors';

export default function DashboardPage() {
    const [world, setWorld] = useState<BiomeConfig[]>([]);
    const router = useRouter();

    useEffect(() => {
        setWorld(generateWorld(3));
    }, []);

    const handleLevelClick = (levelId: number) => {
        const color = getLevelColor(levelId);
        const hue = getLevelHue(levelId);

        // Mock name generation based on ID for consistency
        const name = getEmotion((levelId * 15) % 360, 50);

        router.push(`/training/${levelId}?hue=${hue}&color=${encodeURIComponent(color)}&name=${encodeURIComponent(name)}`);
    };

    if (world.length === 0) return null; // Prevent mismatch during initial render

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: '#000', minHeight: '100vh', position: 'relative' }}>
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
                    My Journey
                </h1>
            </header>

            <div style={{ paddingBottom: '0' }}>
                {world.map((biome, index) => (
                    <BiomeSection
                        key={index}
                        config={biome}
                        onLevelClick={handleLevelClick}
                    />
                ))}
            </div>
        </div>
    );
}
