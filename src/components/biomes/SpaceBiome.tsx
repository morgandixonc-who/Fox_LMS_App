'use client';

import styles from '@/styles/biomes.module.css';

export default function SpaceBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.space}`} style={{ height }}>
            {/* Specific generator logic for Space */}
        </div>
    );
}
