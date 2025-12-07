'use client';

import { useEffect, useState, useMemo } from 'react';

// --- Voxel Constants ---
const GRID_SIZE = 40; // Large grid for chunky look
const WORLD_WIDTH_UNITS = 40; // INCREASED to cover wider screens
// The physical height of the 3D block face. Sand is "taller" than water.
const BLOCK_HEIGHT_SAND = 12;
const BLOCK_HEIGHT_WATER = 6;

// --- Palette (Flat, vibrant Crossy Road colors) ---
const COLORS = {
    SAND_TOP: '#fde68a',
    SAND_SIDE: '#d6b962',
    // Using slightly different blues for shallow vs deep to add texture without lines
    WATER_SHALLOW_TOP: '#60a5fa',
    WATER_SHALLOW_SIDE: '#3b82f6',
    WATER_DEEP_TOP: '#3b82f6',
    // Foam/Waves
    FOAM: '#ffffff',
    // Props
    ROCK_TOP: '#9ca3af', ROCK_SIDE: '#6b7280',
    WOOD_TOP: '#92400e', WOOD_SIDE: '#78350f',
    STAR_TOP: '#fb923c', STAR_SIDE: '#c2410c',
    SHADOW: 'rgba(0,0,0,0.15)'
};

// Types used for generating the map
type BlockType = 'sand' | 'water_shallow' | 'water_deep';

interface GridBlock {
    col: number;
    row: number;
    type: BlockType;
    // Does this block need to show its front face? (Is the block below it lower?)
    showEdge: boolean;
}

interface Prop {
    id: string;
    col: number;
    row: number;
    type: 'rock' | 'driftwood' | 'starfish';
    rotation?: number;
}

export default function BeachBiomeSmooth({ height }: { height: number }) {
    const [isMounted, setIsMounted] = useState(false);
    const rowCount = Math.ceil(height / GRID_SIZE) + 2; // Add buffer rows at bottom

    // 1. Generate the Terrain Map (Grid of Blocks)
    const gridBlocks = useMemo(() => {
        const blocks: GridBlock[] = [];
        const gridMap = new Map<string, BlockType>(); // Helper for lookups

        // Generate base types based on row index (the banding)
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < WORLD_WIDTH_UNITS; col++) {
                let type: BlockType = 'sand';

                // Calculate the wavy coastline curve
                // Using sin/cos to create a natural bay shape
                // Adjust frequency based on col/2 to stretch it out for wider world
                const noise = Math.sin(col * 0.2) * 2 + Math.cos(col * 0.1) * 1.5;
                const waterLine = rowCount * 0.45 + noise;
                const deepWaterLine = rowCount * 0.7 + noise;

                if (row > deepWaterLine) type = 'water_deep';
                else if (row > waterLine) type = 'water_shallow';

                gridMap.set(`${col},${row}`, type);
            }
        }

        // Second pass: define edges based on neighbors
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < WORLD_WIDTH_UNITS; col++) {
                const currentType = gridMap.get(`${col},${row}`);
                const typeBelow = gridMap.get(`${col},${row + 1}`);

                if (!currentType) continue;

                // Key Logic: Show edge ONLY if the block below is different and "lower"
                // Sand sits above Water. Shallow Water sits above Deep Water.
                let showEdge = false;
                if (currentType === 'sand' && typeBelow?.includes('water')) showEdge = true;
                if (currentType === 'water_shallow' && typeBelow === 'water_deep') showEdge = true;

                blocks.push({ col, row, type: currentType, showEdge });
            }
        }
        return blocks;
    }, [rowCount]);


    // 2. Generate Props placed on the grid blocks
    const props = useMemo(() => {
        const items: Prop[] = [];
        gridBlocks.forEach((block, i) => {
            // Skip rows too close to bottom edge or top edge
            if (block.row > rowCount - 3 || block.row < 2) return;

            const rand = Math.random();

            if (block.type === 'sand' && rand > 0.94) {
                items.push({ id: `p-${i}`, col: block.col, row: block.row, type: rand > 0.97 ? 'rock' : 'starfish', rotation: Math.floor(Math.random() * 4) * 90 });
            }
            // Driftwood only in shallow water near the sand edge
            if (block.type === 'water_shallow' && block.showEdge && rand > 0.85) {
                items.push({ id: `p-${i}`, col: block.col, row: block.row, type: 'driftwood', rotation: rand > 0.5 ? 0 : 90 });
            }
        });
        // Sort by row to ensure correct overlap (painter's algorithm)
        return items.sort((a, b) => a.row - b.row);
    }, [gridBlocks, rowCount]);


    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return <div style={{ height, background: COLORS.SAND_TOP }} />;

    const totalWidth = WORLD_WIDTH_UNITS * GRID_SIZE;

    return (
        <div
            style={{
                height,
                width: '100%',
                // Removed maxWidth to allow filling
                position: 'relative',
                backgroundColor: COLORS.WATER_DEEP_TOP, // Base background
                overflow: 'hidden',
                borderRadius: '16px', // Softer corners
                // No border here anymore
            }}
        >
            {/* --- LAYER 1 & 2: TERRAIN BLOCKS --- */}
            {/* We render this as HTML divs because they handle the interlocking easier than one giant SVG */}
            <div style={{ position: 'relative', width: '100%', minWidth: totalWidth, height: height }}>
                {gridBlocks.map((block) => {
                    // Skip blocks that are way off screen at bottom
                    if (block.row * GRID_SIZE > height) return null;

                    const x = block.col * GRID_SIZE;
                    const y = block.row * GRID_SIZE;
                    const isSand = block.type === 'sand';
                    const blockDepth = isSand ? BLOCK_HEIGHT_SAND : BLOCK_HEIGHT_WATER;

                    const colorTop = block.type === 'sand' ? COLORS.SAND_TOP :
                        block.type === 'water_shallow' ? COLORS.WATER_SHALLOW_TOP : COLORS.WATER_DEEP_TOP;

                    const colorSide = block.type === 'sand' ? COLORS.SAND_SIDE : COLORS.WATER_SHALLOW_SIDE;

                    return (
                        <div key={`blk-${block.col}-${block.row}`} style={{ position: 'absolute', top: y, left: x, width: GRID_SIZE, height: GRID_SIZE }}>

                            {/* CONDITIONAL SIDE FACE (The "Depth" without lines) */}
                            {/* Only rendered at the transition boundary */}
                            {block.showEdge && (
                                <div style={{
                                    position: 'absolute',
                                    top: GRID_SIZE - blockDepth, // Positioned at bottom of tile
                                    left: 0, width: GRID_SIZE,
                                    height: blockDepth + 4, // Extend down slightly to cover gaps
                                    backgroundColor: colorSide,
                                    zIndex: 1 // Ensure side is below the top face
                                }} />
                            )}

                            {/* TOP FACE (Seamless Floor) */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, width: GRID_SIZE,
                                // If it shows an edge, the top face is shorter to reveal the side
                                height: block.showEdge ? GRID_SIZE - blockDepth : GRID_SIZE,
                                backgroundColor: colorTop,
                                zIndex: 2 // Top face sits above side face
                            }}>
                                {/* Subtle Foam detail on water edge blocks */}
                                {!isSand && block.showEdge && Math.random() > 0.5 && (
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 4, background: COLORS.FOAM, opacity: 0.4 }} />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* --- LAYER 3: VOXEL PROPS (SVG for crisp shapes) --- */}
            <svg
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', minWidth: totalWidth, height: height, pointerEvents: 'none', zIndex: 10 }}
                viewBox={`0 0 ${totalWidth} ${height}`}
                preserveAspectRatio="none"
            >
                {props.map((p) => {
                    // Center props in their grid cell
                    const x = p.col * GRID_SIZE + (GRID_SIZE / 2);
                    // Offset Y slightly so they sit "on" the block, not inside it
                    const yOffset = p.type === 'driftwood' ? BLOCK_HEIGHT_WATER : BLOCK_HEIGHT_SAND;
                    const y = p.row * GRID_SIZE + (GRID_SIZE / 2) - yOffset + 4;

                    return (
                        <g key={p.id} transform={`translate(${x}, ${y})`}>
                            {/* --- ROCK Voxel --- */}
                            {p.type === 'rock' && (
                                <g>
                                    <rect x="-9" y="4" width="18" height="12" rx="4" fill={COLORS.SHADOW} />
                                    <rect x="-9" y="-4" width="18" height="14" rx="4" fill={COLORS.ROCK_SIDE} />
                                    <rect x="-9" y="-10" width="18" height="14" rx="4" fill={COLORS.ROCK_TOP} />
                                </g>
                            )}

                            {/* --- STARFISH Voxel --- */}
                            {p.type === 'starfish' && (
                                <g transform={`rotate(${p.rotation || 0}) scale(0.8)`}>
                                    <rect x="-3" y="-8" width="6" height="16" rx="2" fill={COLORS.STAR_SIDE} />
                                    <rect x="-3" y="-11" width="6" height="16" rx="2" fill={COLORS.STAR_TOP} />
                                    <rect x="-3" y="-8" width="6" height="16" rx="2" fill={COLORS.STAR_SIDE} transform="rotate(90)" />
                                    <rect x="-3" y="-11" width="6" height="16" rx="2" fill={COLORS.STAR_TOP} transform="rotate(90)" />
                                </g>
                            )}

                            {/* --- DRIFTWOOD Voxel --- */}
                            {p.type === 'driftwood' && (
                                <g transform={`rotate(${p.rotation})`}>
                                    <rect x="-12" y="3" width="24" height="8" rx="3" fill={COLORS.SHADOW} />
                                    <rect x="-12" y="-1" width="24" height="8" rx="3" fill={COLORS.WOOD_SIDE} />
                                    <rect x="-12" y="-5" width="24" height="8" rx="3" fill={COLORS.WOOD_TOP} />
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Subtle vignette for focus */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.1)', pointerEvents: 'none', borderRadius: '16px'
            }} />
        </div>
    );
}