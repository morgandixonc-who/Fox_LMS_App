'use client';

import { generateWorld, BiomeConfig } from '@/lib/biomes';
import BiomeSection from '@/components/BiomeSection';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEmotion } from '@/lib/emotions';
import { getLevelColor, getLevelHue } from '@/lib/levelColors';

// Progress Panel Component
function ProgressPanel({ currentSection = 3 }: { currentSection?: number }) {
    const metrics = {
        xp: 1250,
        levelsComplete: 5,
        totalLevels: 13,
        streak: 5
    };

    const skills = {
        comfort: 72,
        confidence: 45,
        competence: 68
    };

    const rainbowColors = [
        '#ff0000', '#ff4500', '#ff8c00', '#ffd700', '#ffff00',
        '#9acd32', '#32cd32', '#00ced1', '#1e90ff', '#4169e1',
        '#8a2be2', '#da70d6', '#ff69b4',
    ];

    const sectionNames = [
        'Awareness', 'Recognition', 'Understanding', 'Acceptance',
        'Expression', 'Regulation', 'Empathy', 'Connection',
        'Resilience', 'Growth', 'Mastery', 'Integration', 'Transcendence'
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '320px',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            borderLeft: '2px solid var(--border-color, #e5e5e5)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            overflowY: 'auto',
            zIndex: 80
        }}>
            {/* Header */}
            <div style={{
                paddingBottom: '16px',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#1f2937'
                }}>
                    📈 My Progress
                </h2>
            </div>

            {/* Metrics Section */}
            <div>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700
                }}>
                    📊 Progress
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                }}>
                    <div style={{
                        background: '#fef3c7',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706' }}>
                            {metrics.xp.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#92400e', fontWeight: 600 }}>XP</div>
                    </div>
                    <div style={{
                        background: '#dbeafe',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563eb' }}>
                            {metrics.levelsComplete}/{metrics.totalLevels}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 600 }}>Levels</div>
                    </div>
                    <div style={{
                        background: '#dcfce7',
                        borderRadius: '12px',
                        padding: '12px',
                        textAlign: 'center',
                        gridColumn: 'span 2'
                    }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            🔥 {metrics.streak} Day Streak
                        </div>
                    </div>
                </div>
            </div>

            {/* Rainbow Section Indicator */}
            <div>
                <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700
                }}>
                    🌈 Current Section
                </h3>
                <div style={{
                    background: '#f1f5f9',
                    borderRadius: '12px',
                    padding: '14px'
                }}>
                    <div style={{
                        display: 'flex',
                        height: '14px',
                        borderRadius: '7px',
                        overflow: 'hidden',
                        marginBottom: '10px'
                    }}>
                        {rainbowColors.map((color, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    background: color,
                                    opacity: i <= currentSection ? 1 : 0.3,
                                    position: 'relative',
                                    transition: 'opacity 0.3s ease'
                                }}
                            >
                                {i === currentSection && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '8px',
                                        height: '24px',
                                        background: 'white',
                                        borderRadius: '4px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                                        border: `2px solid ${color}`
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        fontWeight: 700,
                        color: rainbowColors[currentSection],
                        fontSize: '1rem'
                    }}>
                        {sectionNames[currentSection]}
                    </div>
                </div>
            </div>

            {/* Skill Bars */}
            <div>
                <h3 style={{
                    margin: '0 0 14px 0',
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700
                }}>
                    💪 Skills
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Comfort */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Comfort</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ec4899' }}>{skills.comfort}%</span>
                        </div>
                        <div style={{
                            height: '12px',
                            background: '#fce7f3',
                            borderRadius: '6px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${skills.comfort}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)',
                                borderRadius: '6px',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>

                    {/* Confidence */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Confidence</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6' }}>{skills.confidence}%</span>
                        </div>
                        <div style={{
                            height: '12px',
                            background: '#ede9fe',
                            borderRadius: '6px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${skills.confidence}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
                                borderRadius: '6px',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>

                    {/* Competence */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Competence</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4' }}>{skills.competence}%</span>
                        </div>
                        <div style={{
                            height: '12px',
                            background: '#cffafe',
                            borderRadius: '6px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${skills.competence}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 100%)',
                                borderRadius: '6px',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer to push content up on larger screens */}
            <div style={{ flex: 1 }} />
        </div>
    );
}

export default function DashboardPage() {
    const [world, setWorld] = useState<BiomeConfig[]>([]);
    const router = useRouter();

    useEffect(() => {
        setWorld(generateWorld(3));
    }, []);

    const handleLevelClick = (levelId: number) => {
        const color = getLevelColor(levelId);
        const hue = getLevelHue(levelId);
        const name = getEmotion((levelId * 15) % 360, 50);
        router.push(`/training/${levelId}?hue=${hue}&color=${encodeURIComponent(color)}&name=${encodeURIComponent(name)}`);
    };

    if (world.length === 0) return null;

    return (
        <div style={{
            backgroundColor: '#fff',
            minHeight: '100vh',
            position: 'relative',
            marginRight: '320px', // Space for fixed right panel
        }}>

            {/* Header - aligned with map */}
            <header style={{
                paddingTop: '20px',
                paddingLeft: '20px',
                paddingBottom: '10px',
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                <h1 className="title" style={{
                    color: 'var(--text-color)',
                    fontSize: '2rem',
                    margin: 0,
                    padding: '12px 32px',
                    backgroundColor: 'var(--white)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.1)',
                    border: '2px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>🗺️</span> My Journey
                </h1>
            </header>

            {/* Journey Board - Wider and aligned left */}
            <div style={{
                paddingBottom: '100px',
                paddingLeft: '20px',
                paddingRight: '20px'
            }}>
                <div style={{
                    maxWidth: '720px'
                }}>
                    {world.map((biome, index) => (
                        <BiomeSection
                            key={index}
                            config={biome}
                            onLevelClick={handleLevelClick}
                        />
                    ))}
                </div>
            </div>

            {/* Fixed Right Panel */}
            <ProgressPanel currentSection={3} />
        </div>
    );
}
