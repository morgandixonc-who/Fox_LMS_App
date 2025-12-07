'use client';

import { BiomeConfig } from '@/lib/biomes';
import { BiomeComponents } from './biomes';
import LevelNode from './LevelNode';

interface BiomeSectionProps {
    config: BiomeConfig;
}

export default function BiomeSection({ config }: BiomeSectionProps) {
    // Look up the specific component from the registry
    const BiomeComponent = BiomeComponents[config.type];

    // Render the specific component, passing the height config
    // This allows each biome to handle its own internal rendering (SVGs, CSS classes, interactive elements)
    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {BiomeComponent ? (
                <BiomeComponent height={config.height} />
            ) : (
                // Fallback if type not found
                <div style={{ height: config.height, background: '#000', color: 'red' }}>
                    Unknown Biome: {config.type}
                </div>
            )}

            {/* Level Nodes Overlay */}
            {config.levels?.map((level) => (
                <LevelNode
                    key={level.id}
                    level={level.id}
                    status={level.status}
                    x={level.x}
                    y={config.height * (level.y / 100)}
                    onClick={() => console.log(`Clicked level ${level.id}`)}
                />
            ))}


        </div>
    );
}
