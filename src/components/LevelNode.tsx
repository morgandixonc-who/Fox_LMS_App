'use strict';
import React from 'react';
import { Check, Lock, Star, Play } from 'lucide-react';
import styles from './LevelNode.module.css';

interface LevelNodeProps {
    level: number;
    status: 'locked' | 'active' | 'completed';
    color?: string;
    x: number; // Percentage or px
    y: number; // Percentage or px
    onClick?: () => void;
}

export default function LevelNode({ level, status, color, x, y, onClick }: LevelNodeProps) {
    return (
        <div
            className={styles.nodeWrapper}
            style={{ left: `${x}%`, top: `${y}px` }}
        >
            <button
                className={`${styles.node} ${styles[status]}`}
                onClick={status !== 'locked' ? onClick : undefined}
                style={color ? { backgroundColor: color, borderColor: status === 'active' ? 'white' : 'rgba(0,0,0,0.1)' } : undefined}
            >
                {status === 'completed' ? <Check size={36} strokeWidth={4} /> :
                    status === 'locked' ? <Lock size={24} strokeWidth={3} /> :
                        <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>{level}</span>}
            </button>
        </div>
    );
}
