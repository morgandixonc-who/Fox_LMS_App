import React from 'react';
import { VoxelCube, VoxelScene } from './VoxelPrimitives';
import styles from './Voxel.module.css';

export const VoxelCloud = () => {
    // A simple 3x2x2ish cloud shape
    return (
        <div style={{ transform: 'rotateX(-20deg) rotateY(25deg)', transformStyle: 'preserve-3d' }}>
            {/* Center Body */}
            <VoxelCube x={0} y={0} z={0} colorClass={styles.cloudBase} />
            <VoxelCube x={1} y={0} z={0} colorClass={styles.cloudBase} />
            <VoxelCube x={-1} y={0} z={0} colorClass={styles.cloudBase} />

            {/* Top bumps */}
            <VoxelCube x={0.5} y={-1} z={0} colorClass={styles.cloudBase} />
            <VoxelCube x={-0.5} y={-1} z={0} colorClass={styles.cloudBase} />

            {/* Depth bumps */}
            <VoxelCube x={0} y={0} z={1} colorClass={styles.cloudBase} />
            <VoxelCube x={0} y={0} z={-1} colorClass={styles.cloudBase} />
        </div>
    );
};

export const VoxelCross = () => {
    // Green Medical Cross
    return (
        <div style={{ transform: 'rotateX(-15deg) rotateY(45deg)', transformStyle: 'preserve-3d' }}>
            {/* Vertical Bar */}
            <VoxelCube x={0} y={-1} z={0} colorClass={styles.greenCube} />
            <VoxelCube x={0} y={0} z={0} colorClass={styles.greenCube} />
            <VoxelCube x={0} y={1} z={0} colorClass={styles.greenCube} />

            {/* Horizontal Bar */}
            <VoxelCube x={1} y={0} z={0} colorClass={styles.greenCube} />
            <VoxelCube x={-1} y={0} z={0} colorClass={styles.greenCube} />
        </div>
    );
};

export const VoxelHeart = () => {
    // Red Heart
    return (
        <div style={{ transform: 'rotateX(-10deg) rotateY(-10deg)', transformStyle: 'preserve-3d' }}>
            {/* Bottom tip */}
            <VoxelCube x={0} y={1} z={0} colorClass={styles.redCube} />

            {/* Middle Row */}
            <VoxelCube x={-1} y={0} z={0} colorClass={styles.redCube} />
            <VoxelCube x={0} y={0} z={0} colorClass={styles.redCube} />
            <VoxelCube x={1} y={0} z={0} colorClass={styles.redCube} />

            {/* Top Lobes */}
            <VoxelCube x={-1} y={-1} z={0} colorClass={styles.redCube} />
            <VoxelCube x={1} y={-1} z={0} colorClass={styles.redCube} />
        </div>
    );
};
