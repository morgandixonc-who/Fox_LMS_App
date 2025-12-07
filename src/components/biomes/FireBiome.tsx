'use client';

import styles from '@/styles/biomes.module.css';

export default function FireBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.fire}`} style={{ height }}>
            {/* Specific generator logic for Fire */}
        </div>
    );
}
