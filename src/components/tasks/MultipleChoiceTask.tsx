import React, { useState } from 'react';

interface MultipleChoiceTaskProps {
    question: string;
    options: string[];
    correct_answer: string;
}

export default function MultipleChoiceTask({ question, options, correct_answer }: MultipleChoiceTaskProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSelect = (option: string) => {
        if (isCorrect === true) return;
        setSelected(option);
        setIsCorrect(option === correct_answer);
    };

    return (
        <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6'
        }}>
            <h3 style={{
                color: '#6366f1',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.9rem',
                fontWeight: '800'
            }}>
                Multiple Choice
            </h3>

            <p style={{
                fontSize: '1.25rem',
                marginBottom: '30px',
                color: '#1f2937',
                lineHeight: '1.6',
                fontWeight: '600'
            }}>
                {question}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {options.map((option, idx) => {
                    const isSelected = selected === option;
                    let bgColor = 'white';
                    let borderColor = '#e5e7eb';
                    let textColor = '#4b5563';

                    if (isSelected) {
                        if (isCorrect) {
                            bgColor = '#ecfdf5'; // green-50
                            borderColor = '#10b981'; // green-500
                            textColor = '#065f46'; // green-800
                        } else {
                            bgColor = '#fef2f2'; // red-50
                            borderColor = '#ef4444'; // red-500
                            textColor = '#991b1b'; // red-800
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(option)}
                            disabled={isCorrect === true}
                            style={{
                                padding: '18px 20px',
                                borderRadius: '16px',
                                border: '2px solid',
                                borderColor: borderColor,
                                background: bgColor,
                                color: textColor,
                                cursor: isCorrect === true ? 'default' : 'pointer',
                                textAlign: 'left',
                                fontSize: '1rem',
                                fontWeight: '500',
                                transition: 'all 0.2s',
                                boxShadow: isSelected ? '0 0 0 2px rgba(255,255,255,0.5)' : '0 2px 4px rgba(0,0,0,0.02)',
                                transform: isSelected ? 'scale(1)' : 'scale(1)'
                            }}
                            onMouseOver={e => !isCorrect && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseOut={e => !isCorrect && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            <span style={{
                                display: 'inline-block',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: isSelected ? textColor : '#f3f4f6',
                                color: isSelected ? 'white' : '#9ca3af',
                                textAlign: 'center',
                                lineHeight: '24px',
                                marginRight: '10px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                        </button>
                    );
                })}
            </div>

            {selected && (
                <div style={{
                    marginTop: '25px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: isCorrect ? '#ecfdf5' : '#fef2f2',
                    color: isCorrect ? '#065f46' : '#991b1b',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {isCorrect ? '✅ Answer Correct!' : '❌ Incorrect. Please try again.'}
                </div>
            )}
        </div>
    );
}
