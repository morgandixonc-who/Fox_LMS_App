'use client';

import styles from '@/components/BoardMap.module.css';
import { ReactNode } from 'react';

interface WorldMapBackgroundProps {
    children?: ReactNode;
}

export default function WorldMapBackground({ children }: WorldMapBackgroundProps) {
    return (
        <div className={styles.mapContainer}>

            {/* River Layer */}
            <svg className={styles.riverLayer} viewBox="0 0 100 1400" preserveAspectRatio="none">
                <path
                    d="M -10 1050 Q 50 1100 110 950 L 110 1050 Q 50 1200 -10 1150 Z"
                    fill="#4ade80" opacity="0"
                />
                <path
                    d="M 0 950 C 30 970, 70 930, 100 800 V 900 C 70 1000, 30 1050, 0 1000 Z"
                    fill="#60a5fa"
                />
            </svg>

            {/* Forest Groups */}
            <div className={styles.forestGroup} style={{ top: '1100px', left: '75%' }}>
                <span style={{ fontSize: '2.5rem' }}>🌲</span>
                <span style={{ fontSize: '2rem', position: 'absolute', top: '10px', left: '-20px' }}>🌲</span>
                <span style={{ fontSize: '2.2rem', position: 'absolute', top: '20px', left: '15px' }}>🌲</span>
            </div>

            <div className={styles.forestGroup} style={{ top: '400px', left: '5%' }}>
                <span style={{ fontSize: '2.5rem' }}>🌳</span>
                <span style={{ fontSize: '2rem', position: 'absolute', top: '15px', left: '25px' }}>🌳</span>
                <span style={{ fontSize: '2.2rem', position: 'absolute', top: '-10px', left: '15px' }}>🌳</span>
            </div>

            {/* Decor */}
            <div className={styles.decor} style={{ top: '150px', left: '10%' }}>🦊</div>
            <div className={styles.decor} style={{ top: '600px', right: '5%' }}>🏕️</div>
            <div className={styles.decor} style={{ top: '850px', left: '45%', fontSize: '3rem', zIndex: 11 }}>🌉</div>
            <div className={styles.decor} style={{ top: '1000px', right: '15%' }}>🦌</div>
            <div className={styles.decor} style={{ top: '1200px', left: '20%' }}>🍄</div>

            {/* Finale Castle */}
            <div className={styles.decor} style={{ top: '1250px', left: '70%', fontSize: '4rem', zIndex: 1 }}>🏰</div>

            {/* Children (Levels, Paths overlay) rendered here */}
            {children}
        </div>
    );
}
