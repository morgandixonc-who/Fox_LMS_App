export type BiomeType =
    | 'grass'
    | 'beach'
    | 'swamp'
    | 'mushroom'
    | 'desert'
    | 'cave'
    | 'mountain'
    | 'ice'
    | 'fire'
    | 'city'
    | 'mars'
    | 'moon'
    | 'space';

export interface Level {
    id: number;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100 of the biome height
    status: 'locked' | 'active' | 'completed';
}

export interface BiomeConfig {
    type: BiomeType;
    height: number;
    cssClass: string;
    levels?: Level[];
}

export const generateWorld = (cycles: number = 2): BiomeConfig[] => {
    // 13 Biomes in order
    const sequence: BiomeType[] = [
        'beach', 'grass', 'swamp', 'mushroom', 'desert', 'city', 'mountain', 'ice', 'cave', 'fire', 'moon', 'mars', 'space'
    ];

    let world: BiomeConfig[] = [];
    let levelCounter = 1;

    // Config for path generation
    // Config for path generation
    const LEVEL_SPACING_PX = 120; // Space between levels vertically
    const TOP_PADDING = 100;
    const BOTTOM_PADDING = 100;

    const TOTAL_LEVELS_MODULE_1 = 30; // Beach

    sequence.forEach((type, index) => {
        const levels: Level[] = [];
        let levelsThisBiome = 0;

        if (index === 0) {
            levelsThisBiome = TOTAL_LEVELS_MODULE_1;
        } else {
            // Distribute remaining 365 levels
            if (index <= 5) levelsThisBiome = 31;
            else levelsThisBiome = 30;
        }

        // Calculate dynamic height for this biome
        // Ensure enough space for all levels + padding
        const neededHeight = (levelsThisBiome * LEVEL_SPACING_PX) + TOP_PADDING + BOTTOM_PADDING;

        // Sine wave path parameters
        // We want the path to wind back and forth. 
        // A full sine wave cycle is 2*PI. 
        // We probably want the path to switch sides every 5-7 levels?
        const waveFreq = 0.5; // Controls how tight the turns are
        const amplitude = 25; // Percentage from center (center is 50%, so swings 25% to 75%)

        for (let i = 0; i < levelsThisBiome; i++) {
            // Y Position:
            // Calculated as pixel offsets then converted to percentage relative to neededHeight for the layout system
            // But LevelNode usually takes Y as 'px' if we change the BiomeSection to run that way, 
            // OR we stick to % layout. The current BiomeSection passes `config.height * (level.y / 100)`.
            // So we just need to calculate the % that corresponds to the specific pixel placement.

            const yPx = TOP_PADDING + (i * LEVEL_SPACING_PX);
            const yPercent = (yPx / neededHeight) * 100;

            // X Position: Sine wave
            // Sin(i) gives -1 to 1.
            const xOffset = Math.sin(i * waveFreq) * amplitude;

            // Add slight randomness to 'x' so it's not a perfect robot path
            // But keep it bounded so nodes don't fall off screen
            const randomJitter = 0;
            const x = 50 + xOffset + randomJitter;

            levels.push({
                id: levelCounter++,
                x: Math.max(10, Math.min(90, x)), // Clamp between 10% and 90%
                y: yPercent,
                status: 'active'
            });
        }

        world.push({
            type,
            height: neededHeight,
            cssClass: type,
            levels
        });
    });

    return world;
};
