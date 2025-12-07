import React, { useState } from 'react';

interface TrueFalseTaskProps {
    question: string;
    answer: boolean;
    onComplete?: (success: boolean) => void;
}

export default function TrueFalseTask({ question, answer, onComplete }: TrueFalseTaskProps) {
    const [selected, setSelected] = useState<boolean | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSelect = (val: boolean) => {
        if (isCorrect === true) return;
        setSelected(val);
        const correct = val === answer;
        setIsCorrect(correct);

        if (onComplete) {
            setTimeout(() => onComplete(correct), 1500);
        }
    };

    return (
        <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <h3 style={{
                color: '#be185d',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.9rem',
                fontWeight: '800'
            }}>
                True or False
            </h3>

            <p style={{
                fontSize: '1.4rem',
                marginBottom: '40px',
                color: '#1f2937',
                textAlign: 'center',
                lineHeight: '1.5',
                padding: '0 20px',
                fontWeight: '600'
            }}>
                {question}
            </p>

            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                {/* True Button */}
                <button
                    onClick={() => handleSelect(true)}
                    disabled={isCorrect === true}
                    style={{
                        padding: '20px 50px',
                        borderRadius: '20px',
                        border: '3px solid',
                        borderColor: selected === true
                            ? (isCorrect ? '#10b981' : '#ef4444')
                            : '#e5e7eb',
                        background: selected === true
                            ? (isCorrect ? '#ecfdf5' : '#fef2f2')
                            : 'white',
                        cursor: isCorrect === true ? 'default' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s',
                        transform: selected === true ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: selected === true ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    <span style={{ fontSize: '2rem' }}>👍</span>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: selected === true ? (isCorrect ? '#059669' : '#b91c1c') : '#374151'
                    }}>
                        TRUE
                    </span>
                </button>

                {/* False Button */}
                <button
                    onClick={() => handleSelect(false)}
                    disabled={isCorrect === true}
                    style={{
                        padding: '20px 50px',
                        borderRadius: '20px',
                        border: '3px solid',
                        borderColor: selected === false
                            ? (isCorrect ? '#10b981' : '#ef4444')
                            : '#e5e7eb',
                        background: selected === false
                            ? (isCorrect ? '#ecfdf5' : '#fef2f2')
                            : 'white',
                        cursor: isCorrect === true ? 'default' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s',
                        transform: selected === false ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: selected === false ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    <span style={{ fontSize: '2rem' }}>👎</span>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: selected === false ? (isCorrect ? '#059669' : '#b91c1c') : '#374151'
                    }}>
                        FALSE
                    </span>
                </button>
            </div>

            {/* Feedback Overlay */}
            {isCorrect === true && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    zIndex: 100,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '20px', animation: 'bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                        ✨
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        color: '#059669',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        textShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
                    }}>
                        Correct!
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#047857', marginTop: '10px', fontWeight: 'bold' }}>
                        You got it!
                    </div>
                </div>
            )}

            {selected !== null && isCorrect === false && (
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    padding: '15px',
                    borderRadius: '12px',
                    background: '#fef2f2',
                    color: '#991b1b',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    ❌ Incorrect.
                </div>
            )}
        </div>
    );
}
