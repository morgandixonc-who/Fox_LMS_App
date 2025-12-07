'use client';

import styles from '@/styles/biomes.module.css';

export default function MountainBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.mountain}`} style={{ height }}>
            {/* Specific generator logic for Mountain */}
        </div>
    );
}
