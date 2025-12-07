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
    const TOTAL_LEVELS_MODULE_1 = 30;
    const TOTAL_LEVELS_OTHERS = 365;

    // We only process 1 cycle effectively for the specific level count request, 
    // but code structure allows loops.
    // Assuming 1 cycle covers the "Journey".

    sequence.forEach((type, index) => {
        const levels: Level[] = [];
        let levelsThisBiome = 0;

        if (index === 0) {
            // Module 1 (Beach): 30 Levels
            levelsThisBiome = TOTAL_LEVELS_MODULE_1;
        } else {
            // Modules 2-13 (12 biomes): 365 Levels total
            // 365 / 12 = 30.41...
            // Some get 30, some get 31.
            // 30 * 12 = 360. need 5 more.
            // Biomes 1-5 get 31, 6-12 get 30.
            if (index <= 5) { // indices 1,2,3,4,5
                levelsThisBiome = 31;
            } else {
                levelsThisBiome = 30;
            }
        }

        for (let i = 0; i < levelsThisBiome; i++) {
            // Simple zigzag pattern for variety
            const x = (i % 2 === 0) ? 30 : 70;
            // Distribute vertically 
            const y = 10 + (i / levelsThisBiome) * 80;

            levels.push({
                id: levelCounter++,
                x: x + (Math.random() * 20 - 10), // jitter
                y,
                status: levelCounter === 2 ? 'active' : 'locked' // Only first level active generally
            });
        }

        // Ensure strictly level 1 is active (override logic above slightly)
        if (levels.length > 0 && levels[0].id === 1) {
            levels[0].status = 'active'; // Level 1 is active
            if (levels.length > 1) levels[1].status = 'locked';
        }


        world.push({
            type,
            height: 1000,
            cssClass: type,
            levels
        });
    });

    return world;
};
