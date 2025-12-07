import React, { useEffect, useState } from 'react';
import styles from './LevelIntro.module.css';
import { X } from 'lucide-react';

interface LevelIntroProps {
    targetColor: string; // CSS color string
    emotionName: string;
    hue: number; // 0-360, used for recipe calculation
    onClose: () => void;
    onStart: () => void;
}

export default function LevelIntro({ targetColor, emotionName, hue, onClose, onStart }: LevelIntroProps) {
    const [step, setStep] = useState(0); // 0: Init, 1: Pour, 2: Blend, 3: Reveal

    // Ingredient Colors
    // Ingredient Colors
    const getIngredients = (h: number) => {
        // Calculate neighbor hues for realistic mixing (analogue colors)
        // e.g., Target 30deg (Orange) <- 0deg (Red) + 60deg (Yellow)
        // We use +/- 30 degrees to create the mix ingredients
        const h1 = (h - 30 + 360) % 360;
        const h2 = (h + 30) % 360;
        return [`hsl(${h1}, 70%, 50%)`, `hsl(${h2}, 70%, 50%)`];
    };

    const [color1, color2] = getIngredients(hue);

    useEffect(() => {
        // Animation Sequence
        const t1 = setTimeout(() => setStep(1), 500); // Start Pour
        const t2 = setTimeout(() => setStep(2), 2500); // Start Blend
        const t3 = setTimeout(() => setStep(3), 5000); // Reveal
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <div className={styles.overlay} style={{ '--target-color': targetColor } as React.CSSProperties}>

            {/* Close Button (Top Right) */}
            <button
                onClick={onClose}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.6 }}
            >
                <X size={32} />
            </button>

            {/* Animation Stage */}
            <div className={styles.stage} style={{ display: step === 3 ? 'none' : 'block' }}>

                {/* --- Left Bucket --- */}
                <div className={`${styles.bucketWrapper} ${styles.bucketLeft} ${step >= 1 ? styles.pourLeft : ''}`}>
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        {/* Bucket Shape */}
                        <path d="M10,10 L25,90 L75,90 L90,10 Z" fill="#94a3b8" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                        <path d="M10,10 Q50,0 90,10 Z" fill="#cbd5e1" /> {/* Rim back */}
                        {/* Paint Inside */}
                        <path d="M15,20 L22,80 L78,80 L85,20 Z" fill={color1} opacity="0.9" />
                        <path d="M10,10 Q50,20 90,10 Z" fill="none" stroke="white" strokeWidth="4" /> {/* Rim front */}
                        {/* Handle */}
                        <path d="M10,10 Q50,-40 90,10" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                    {/* Stream */}
                    <div
                        className={`${styles.stream} ${styles.streamLeft} ${step >= 1 ? styles.flowing : ''}`}
                        style={{ '--stream-color': color1 } as React.CSSProperties}
                    />
                </div>

                {/* --- Right Bucket --- */}
                <div className={`${styles.bucketWrapper} ${styles.bucketRight} ${step >= 1 ? styles.pourRight : ''}`}>
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <path d="M10,10 L25,90 L75,90 L90,10 Z" fill="#94a3b8" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                        <path d="M10,10 Q50,0 90,10 Z" fill="#cbd5e1" />
                        <path d="M15,20 L22,80 L78,80 L85,20 Z" fill={color2} opacity="0.9" />
                        <path d="M10,10 Q50,20 90,10 Z" fill="none" stroke="white" strokeWidth="4" />
                        <path d="M10,10 Q50,-40 90,10" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                    <div
                        className={`${styles.stream} ${styles.streamRight} ${step >= 1 ? styles.flowing : ''}`}
                        style={{ '--stream-color': color2 } as React.CSSProperties}
                    />
                </div>

                {/* --- Blender --- */}
                <div className={`${styles.blenderWrapper} ${step === 2 ? styles.blenderShake : ''}`}>
                    <svg width="140" height="180" viewBox="0 0 140 180">
                        {/* Base */}
                        <rect x="30" y="140" width="80" height="40" rx="8" fill="#475569" stroke="white" strokeWidth="3" />
                        <circle cx="70" cy="160" r="10" fill="white" opacity="0.5" /> {/* Knock */}

                        {/* Glass Body */}
                        <path d="M35,140 L25,10 L115,10 L105,140 Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                        <path d="M25,10 Q70,0 115,10 Z" fill="rgba(255,255,255,0.3)" /> {/* Lid area */}

                        {/* Liquid Mask/Fill */}
                        <mask id="liquidMask">
                            <path d="M35,140 L25,10 L115,10 L105,140 Z" fill="white" />
                        </mask>
                        <g mask="url(#liquidMask)">
                            <rect
                                x="0" y="0" width="140" height="180"
                                fill={step === 2 ? `url(#mixG-${hue})` : targetColor}
                                className={`${styles.liquidLevel} ${step >= 1 ? styles.fillUp : ''}`}
                            />
                        </g>

                        {/* Shine Reflection */}
                        <path d="M100,20 L95,130" stroke="white" strokeWidth="4" opacity="0.2" strokeLinecap="round" />

                        <defs>
                            <linearGradient id={`mixG-${hue}`} x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor={color1} />
                                <stop offset="50%" stopColor={color2} />
                                <stop offset="100%" stopColor={color1} />
                                <animate attributeName="x1" from="0" to="1" dur="0.5s" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Reveal Content */}
            <div className={`${styles.content} ${step === 3 ? styles.visible : ''}`}>
                <div className={styles.subtitle}>Emotion Discovered</div>
                <h1 className={styles.title}>{emotionName}</h1>

                {/* Visual Swatch */}
                <div style={{
                    width: '120px', height: '120px', borderRadius: '50%', background: targetColor,
                    margin: '30px auto', boxShadow: `0 0 50px ${targetColor}80`, border: '4px solid white'
                }} />

                <button className={styles.button} onClick={onStart}>
                    Start Experience
                </button>
            </div>
        </div>
    );
}
