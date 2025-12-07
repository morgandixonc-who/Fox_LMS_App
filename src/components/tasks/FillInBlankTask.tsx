import React, { useState, useEffect } from 'react';

interface FillInBlankTaskProps {
    question: string;
    correct_answer: string;
    options?: string[]; // Made optional for backward compatibility, but system prompt should provide it
}

export default function FillInBlankTask({ question, correct_answer, options = [] }: FillInBlankTaskProps) {
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        // Fallback if options aren't provided by API yet
        let opts = options && options.length > 0 ? [...options] : [correct_answer, 'incorrect', 'random', 'word'];

        // Simple shuffle
        opts = opts.sort(() => Math.random() - 0.5);
        setShuffledOptions(opts);
        setSelectedWord(null);
        setIsCorrect(null);
    }, [question, correct_answer, options]);

    const handleWordClick = (word: string) => {
        if (isCorrect === true) return; // Prevent changing after correct
        setSelectedWord(word);

        // Immediate check
        if (word.toLowerCase() === correct_answer.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
            // Optional: Auto-clear incorrect after delay? 
            // For now let them see it's wrong.
        }
    };

    const handleBlankClick = () => {
        if (isCorrect === true) return;
        setSelectedWord(null);
        setIsCorrect(null);
    };

    // Split question by blank placeholder
    const parts = question.split('_____');

    return (
        <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <h3 style={{
                color: '#6366f1',
                marginBottom: '25px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.9rem',
                fontWeight: '800'
            }}>
                Fill in the Blank
            </h3>

            {/* Sentence Area */}
            <div style={{
                fontSize: '1.3rem',
                marginBottom: '40px',
                color: '#1f2937',
                lineHeight: '1.8',
                background: '#f9fafb',
                padding: '25px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb'
            }}>
                {parts[0]}
                <span
                    onClick={handleBlankClick}
                    style={{
                        display: 'inline-block',
                        minWidth: '120px',
                        padding: '0 10px',
                        borderBottom: '3px solid',
                        borderColor: isCorrect === true ? '#10b981' : (selectedWord ? '#6366f1' : '#9ca3af'),
                        color: isCorrect === true ? '#047857' : '#4338ca',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: isCorrect === true ? '#d1fae5' : (selectedWord ? '#e0e7ff' : 'transparent'),
                        borderRadius: '6px 6px 0 0',
                        transition: 'all 0.2s',
                        margin: '0 5px'
                    }}
                >
                    {selectedWord || '______'}
                </span>
                {parts[1]}
            </div>

            {/* Word Bank */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {shuffledOptions.map((word, idx) => {
                    const isSelected = selectedWord === word;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleWordClick(word)}
                            disabled={isSelected || isCorrect === true}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '50px',
                                border: '2px solid',
                                borderColor: isSelected ? 'transparent' : '#e5e7eb',
                                background: isSelected ? '#e5e7eb' : 'white',
                                color: isSelected ? 'transparent' : '#4b5563',
                                cursor: (isSelected || isCorrect === true) ? 'default' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                boxShadow: isSelected ? 'none' : '0 4px 6px rgba(0,0,0,0.05)',
                                transform: isSelected ? 'scale(0.95)' : 'scale(1)',
                                transition: 'all 0.2s',
                                opacity: isSelected ? 0.3 : 1
                            }}
                        >
                            {word}
                        </button>
                    );
                })}
            </div>

            {/* Feedback Message */}
            {isCorrect !== null && (
                <div style={{
                    marginTop: '25px',
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: '12px',
                    background: isCorrect ? '#ecfdf5' : '#fef2f2',
                    color: isCorrect ? '#065f46' : '#991b1b',
                    fontWeight: 'bold',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {isCorrect ? '✨ Perfect match!' : '❌ Not quite. Tap the blank to clear and try again.'}
                </div>
            )}
        </div>
    );
}
