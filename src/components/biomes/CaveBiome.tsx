'use client';

import styles from '@/styles/biomes.module.css';

export default function CaveBiome({ height }: { height: number }) {
    return (
        <div className={`${styles.biomeBase} ${styles.cave}`} style={{ height }}>
            {/* Specific generator logic for Cave */}
        </div>
    );
}
