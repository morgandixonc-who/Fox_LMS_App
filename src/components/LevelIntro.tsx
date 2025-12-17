import React, { useEffect, useState } from 'react';
import styles from './LevelIntro.module.css';
import { X } from 'lucide-react';

interface LevelIntroProps {
    targetColor: string;
    emotionName: string;
    hue: number;
    onClose: () => void;
    onStart: () => void;
}

export default function LevelIntro({ targetColor, emotionName, hue, onClose, onStart }: LevelIntroProps) {
    const [step, setStep] = useState(0); // 0: Init, 1: Approach, 2: Merge, 3: Reveal

    // Ingredient Colors
    const getIngredients = (h: number) => {
        const h1 = (h - 35 + 360) % 360;
        const h2 = (h + 35) % 360;
        return [`hsl(${h1}, 80%, 55%)`, `hsl(${h2}, 80%, 55%)`];
    };

    const [color1, color2] = getIngredients(hue);

    useEffect(() => {
        const t1 = setTimeout(() => setStep(1), 300);   // Orbs start moving
        const t2 = setTimeout(() => setStep(2), 1800);  // Collision & merge
        const t3 = setTimeout(() => setStep(3), 3800);  // Reveal
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <div
            className={styles.overlay}
            style={{
                '--target-color': targetColor,
                '--color1': color1,
                '--color2': color2
            } as React.CSSProperties}
        >
            {/* Close Button */}
            <button onClick={onClose} className={styles.closeButton}>
                <X size={24} />
            </button>

            {/* Animation Stage */}
            <div className={styles.stage} style={{ display: step === 3 ? 'none' : 'flex' }}>

                {/* Left Orb */}
                <div className={`${styles.orb} ${styles.orbLeft} ${step >= 1 ? styles.orbApproach : ''} ${step >= 2 ? styles.orbMerge : ''}`}>
                    <div className={styles.orbInner} style={{ background: color1 }}>
                        <div className={styles.orbShine} />
                    </div>
                    <div className={styles.orbGlow} style={{ background: color1 }} />
                    {/* Trailing particles */}
                    {step === 1 && (
                        <>
                            <div className={`${styles.trail} ${styles.trail1}`} style={{ background: color1 }} />
                            <div className={`${styles.trail} ${styles.trail2}`} style={{ background: color1 }} />
                            <div className={`${styles.trail} ${styles.trail3}`} style={{ background: color1 }} />
                        </>
                    )}
                </div>

                {/* Right Orb */}
                <div className={`${styles.orb} ${styles.orbRight} ${step >= 1 ? styles.orbApproach : ''} ${step >= 2 ? styles.orbMerge : ''}`}>
                    <div className={styles.orbInner} style={{ background: color2 }}>
                        <div className={styles.orbShine} />
                    </div>
                    <div className={styles.orbGlow} style={{ background: color2 }} />
                    {step === 1 && (
                        <>
                            <div className={`${styles.trail} ${styles.trail1}`} style={{ background: color2 }} />
                            <div className={`${styles.trail} ${styles.trail2}`} style={{ background: color2 }} />
                            <div className={`${styles.trail} ${styles.trail3}`} style={{ background: color2 }} />
                        </>
                    )}
                </div>

                {/* Center merged orb (appears on merge) */}
                <div
                    className={`${styles.mergedOrb} ${step >= 2 ? styles.mergedVisible : ''}`}
                    style={{ '--target-color': targetColor } as React.CSSProperties}
                >
                    <div className={styles.mergedInner} style={{ background: targetColor }}>
                        <div className={styles.orbShine} />
                        <div className={styles.orbShine2} />
                    </div>
                    <div className={styles.mergedGlow} style={{ background: targetColor }} />
                    <div className={styles.mergedRing} style={{ borderColor: targetColor }} />
                    <div className={styles.mergedRing2} style={{ borderColor: targetColor }} />
                </div>

                {/* Burst particles on collision */}
                {step >= 2 && (
                    <div className={styles.burstContainer}>
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={styles.burstParticle}
                                style={{
                                    '--angle': `${i * 30}deg`,
                                    '--delay': `${i * 0.02}s`,
                                    '--color': i % 2 === 0 ? color1 : color2
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>
                )}

                {/* Plus sign between orbs */}
                <div className={`${styles.plusSign} ${step >= 1 ? styles.plusVisible : ''} ${step >= 2 ? styles.plusHide : ''}`}>
                    +
                </div>
            </div>

            {/* Reveal Content */}
            <div className={`${styles.content} ${step === 3 ? styles.visible : ''}`}>
                <div className={styles.subtitle}>Emotion Discovered</div>
                <h1 className={styles.title}>{emotionName}</h1>

                <div
                    className={styles.colorSwatch}
                    style={{ background: targetColor, '--target-color': targetColor } as React.CSSProperties}
                />

                <button className={styles.button} onClick={onStart}>
                    Start Experience
                </button>
            </div>
        </div>
    );
}
