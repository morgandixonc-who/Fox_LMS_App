'use client';

import { generateWorld, BiomeConfig } from '@/lib/biomes';
import BiomeSection from '@/components/BiomeSection';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEmotion } from '@/lib/emotions';
import { getLevelColor, getLevelHue } from '@/lib/levelColors';
import { VoxelScene } from '@/components/voxels/VoxelPrimitives';
import { VoxelCloud } from '@/components/voxels/VoxelShapes';

export default function DashboardPage() {
    const [world, setWorld] = useState<BiomeConfig[]>([]);
    const router = useRouter();

    useEffect(() => {
        setWorld(generateWorld(3));
    }, []);

    const handleLevelClick = (levelId: number) => {
        const color = getLevelColor(levelId);
        const hue = getLevelHue(levelId);
        const name = getEmotion((levelId * 15) % 360, 50);
        router.push(`/training/${levelId}?hue=${hue}&color=${encodeURIComponent(color)}&name=${encodeURIComponent(name)}`);
    };

    if (world.length === 0) return null;

    return (
        <div style={{
            // Padding left handled by layout via sidebar-width
            textAlign: 'center',
            backgroundColor: '#f0fdf4',
            backgroundImage: `radial-gradient(#00a896 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            minHeight: '100vh',
            position: 'relative',
        }}>

            {/* Header */}
            <header style={{
                position: 'fixed',
                top: 20,
                left: 0,
                right: 0,
                // paddingLeft handled by layout margin
                zIndex: 90,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <h1 className="title" style={{
                    color: 'var(--text-color)',
                    fontSize: '2rem',
                    margin: 0,
                    padding: '12px 32px',
                    backgroundColor: 'var(--white)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.1)',
                    border: '2px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>🗺️</span> My Journey
                </h1>
            </header>

            {/* Voxel Decorations (Floating Clouds) */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '10%', left: '10%', animation: 'float 12s ease-in-out infinite' }}>
                    <VoxelScene><VoxelCloud /></VoxelScene>
                </div>
                <div style={{ position: 'absolute', top: '20%', right: '15%', animation: 'float 15s ease-in-out infinite reverse' }}>
                    <VoxelScene><VoxelCloud /></VoxelScene>
                </div>
                <div style={{ position: 'absolute', bottom: '10%', left: '25%', opacity: 0.8, transform: 'scale(0.8)', animation: 'float 20s ease-in-out infinite' }}>
                    <VoxelScene><VoxelCloud /></VoxelScene>
                </div>
            </div>

            <div style={{ paddingBottom: '100px', paddingTop: '100px', position: 'relative', zIndex: 1 }}>
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
