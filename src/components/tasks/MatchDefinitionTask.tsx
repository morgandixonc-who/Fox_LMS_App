import React, { useState } from 'react';

interface MatchDefinitionTaskProps {
    term: string;
    definition: string;
}

export default function MatchDefinitionTask({ term, definition }: MatchDefinitionTaskProps) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div style={{
            padding: '40px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h3 style={{
                color: '#db2777',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.9rem',
                fontWeight: '800',
                alignSelf: 'flex-start'
            }}>
                Match Definition
            </h3>

            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                position: 'relative',
                width: '100%'
            }}>
                <div style={{
                    fontSize: '0.9rem',
                    color: '#9ca3af',
                    marginBottom: '10px',
                    letterSpacing: '2px',
                    fontWeight: 'bold'
                }}>
                    TERM
                </div>
                <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    background: 'linear-gradient(45deg, #4f46e5, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '15px'
                }}>
                    {term}
                </div>
                <div style={{ width: '60px', height: '4px', background: '#e5e7eb', margin: '0 auto', borderRadius: '2px' }}></div>
            </div>

            <div style={{
                width: '100%',
                background: revealed ? '#eff6ff' : '#f9fafb',
                padding: '30px',
                borderRadius: '20px',
                minHeight: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed',
                borderColor: revealed ? '#bfdbfe' : '#d1d5db',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {revealed ? (
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#1e40af',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        animation: 'fadeIn 0.5s ease',
                        margin: 0
                    }}>
                        {definition}
                    </p>
                ) : (
                    <button
                        onClick={() => setRevealed(true)}
                        style={{
                            padding: '15px 30px',
                            background: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
                            transition: 'transform 0.2s',
                            zIndex: 10
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Reveal Definition
                    </button>
                )}

                {/* Background Pattern Hint */}
                {!revealed && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        opacity: 0.5,
                        zIndex: 0
                    }}></div>
                )}
            </div>
        </div>
    );
}
