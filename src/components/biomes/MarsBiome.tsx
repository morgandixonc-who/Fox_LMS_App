'use client';

import styles from '@/styles/biomes.module.css';

export default function MarsBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.mars}`} style={{ height }}>
            {/* Specific generator logic for Mars */}
        </div>
    );
}
