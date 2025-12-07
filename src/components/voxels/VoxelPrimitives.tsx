import React from 'react';
import styles from './Voxel.module.css';

interface VoxelCubeProps {
    x: number;
    y: number;
    z: number;
    colorClass?: string;
    scale?: number;
}

export const VoxelCube: React.FC<VoxelCubeProps> = ({ x, y, z, colorClass = styles.whiteCube, scale = 1 }) => {
    const style: React.CSSProperties = {
        transform: `translate3d(${x}em, ${y}em, ${z}em) scale(${scale})`,
    };

    return (
        <div className={`${styles.cube} ${colorClass}`} style={style}>
            <div className={`${styles.face} ${styles.front}`} />
            <div className={`${styles.face} ${styles.back}`} />
            <div className={`${styles.face} ${styles.right}`} />
            <div className={`${styles.face} ${styles.left}`} />
            <div className={`${styles.face} ${styles.top}`} />
            <div className={`${styles.face} ${styles.bottom}`} />
        </div>
    );
};

interface VoxelSceneProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
}

export const VoxelScene: React.FC<VoxelSceneProps> = ({ children, width = '100px', height = '100px' }) => {
    return (
        <div style={{ width, height, position: 'absolute', pointerEvents: 'none' }}>
            <div className={styles.scene}>
                {children}
            </div>
        </div>
    );
};
