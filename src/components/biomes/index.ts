import { BiomeType } from '@/lib/biomes';
import GrassBiome from './GrassBiome';
import BeachBiome from './BeachBiome';
import MushroomBiome from './MushroomBiome';
import CaveBiome from './CaveBiome';
import MountainBiome from './MountainBiome';
import IceBiome from './IceBiome';
import FireBiome from './FireBiome';
import CityBiome from './CityBiome';
import MarsBiome from './MarsBiome';
import MoonBiome from './MoonBiome';
import SpaceBiome from './SpaceBiome';

import SwampBiome from './SwampBiome';
import DesertBiome from './DesertBiome';

export const BiomeComponents: Record<BiomeType, React.ComponentType<{ height: number }>> = {
    grass: GrassBiome,
    beach: BeachBiome,
    swamp: SwampBiome,
    mushroom: MushroomBiome,
    desert: DesertBiome,
    cave: CaveBiome,
    mountain: MountainBiome,
    ice: IceBiome,
    fire: FireBiome,
    city: CityBiome,
    mars: MarsBiome,
    moon: MoonBiome,
    space: SpaceBiome,
};
