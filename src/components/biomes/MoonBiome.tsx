'use client';

import styles from '@/styles/biomes.module.css';

export default function MoonBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.moon}`} style={{ height }}>
            {/* Specific generator logic for Moon */}
        </div>
    );
}
