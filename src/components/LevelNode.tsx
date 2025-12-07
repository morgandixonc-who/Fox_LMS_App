'use strict';
import React from 'react';
import { Check, Lock, Star, Play } from 'lucide-react';
import styles from './LevelNode.module.css';

interface LevelNodeProps {
    level: number;
    status: 'locked' | 'active' | 'completed';
    x: number; // Percentage or px
    y: number; // Percentage or px
    onClick?: () => void;
}

export default function LevelNode({ level, status, x, y, onClick }: LevelNodeProps) {
    return (
        <div
            className={styles.nodeWrapper}
            style={{ left: `${x}%`, top: `${y}px` }}
        >
            <button
                className={`${styles.node} ${styles[status]}`}
                onClick={status !== 'locked' ? onClick : undefined}
            >
                {status === 'completed' ? <Check size={36} strokeWidth={4} /> :
                    status === 'locked' ? <Lock size={24} strokeWidth={3} /> :
                        <Play size={36} fill="white" strokeWidth={0} style={{ marginLeft: '4px' }} />}
            </button>

            {/* Level Label below node */}
            <div style={{
                marginTop: '12px',
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '4px 12px',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
                Level {level}
            </div>
        </div>
    );
}
