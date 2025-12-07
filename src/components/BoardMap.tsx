'use client';

import LevelNode from '@/components/LevelNode';
import WorldMapBackground from '@/components/WorldMapBackground';
import styles from '@/components/BoardMap.module.css';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function BoardMap() {
    const router = useRouter();

    const handleStartLevel = (id: number) => {
        router.push(`/training/${id}`);
    };

    // Winding path points
    const pathPoints = [
        { id: 1, x: 50, y: 200, status: 'completed' }, // Start at Top
        { id: 2, x: 25, y: 350, status: 'completed' },
        { id: 3, x: 60, y: 500, status: 'active' },
        { id: 4, x: 80, y: 650, status: 'locked' },
        { id: 5, x: 40, y: 800, status: 'locked' },
        { id: 6, x: 20, y: 950, status: 'locked' },
        { id: 7, x: 60, y: 1100, status: 'locked' },
        { id: 8, x: 50, y: 1300, status: 'locked' }, // Finale at Bottom
    ] as const;

    const svgPathData = useMemo(() => {
        let d = `M ${pathPoints[0].x}% ${pathPoints[0].y}`;
        for (let i = 1; i < pathPoints.length; i++) {
            const prev = pathPoints[i - 1];
            const curr = pathPoints[i];
            const cpY = (prev.y + curr.y) / 2;
            d += ` Q 50 ${cpY} ${curr.x}% ${curr.y}`;
        }
        return d;
    }, [pathPoints]);

    return (
        <WorldMapBackground>
            {/* Path Overlay */}
            <svg className={styles.svgPath} viewBox="0 0 100 1400" preserveAspectRatio="none">
                <path d={svgPathData} stroke="rgba(255,255,255,0.5)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="15 15" />
            </svg>

            {/* Nodes Overlay */}
            <div className={styles.levelContainer}>
                {pathPoints.map((point) => (
                    <LevelNode
                        key={point.id}
                        level={point.id}
                        status={point.status}
                        x={point.x}
                        y={point.y}
                        onClick={() => handleStartLevel(point.id)}
                    />
                ))}
            </div>
        </WorldMapBackground>
    );
}
