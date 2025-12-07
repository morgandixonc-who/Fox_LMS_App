'use client';

import styles from '@/styles/biomes.module.css';

export default function CityBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.city}`} style={{ height }}>
            {/* Specific generator logic for City */}
        </div>
    );
}
