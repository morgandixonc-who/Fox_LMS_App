
"use client";

import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { X } from 'lucide-react';
import MultipleChoiceTask from '@/components/tasks/MultipleChoiceTask';
import TrueFalseTask from '@/components/tasks/TrueFalseTask';
import FillInBlankTask from '@/components/tasks/FillInBlankTask';
import MatchDefinitionTask from '@/components/tasks/MatchDefinitionTask';

interface TrainingSessionLayoutProps {
    color: string;
    emotionName: string;
    emoji?: string; // Optional, can be derived or passed
    descriptors: string | null;
    loadingDescriptors: boolean;

    tasks: any[];
    loadingTasks: boolean;
    activeTaskIndex: number;
    tasksComplete: boolean;

    score: number; // For progress calc

    // Handlers
    onTaskComplete: (isCorrect: boolean) => void;
    onQuit: () => void;
}

export default function TrainingSessionLayout({
    color,
    emotionName,
    emoji = '😐',
    descriptors,
    loadingDescriptors,
    tasks,
    loadingTasks,
    activeTaskIndex,
    tasksComplete,
    score,
    onTaskComplete,
    onQuit
}: TrainingSessionLayoutProps) {

    // Calculate Progress
    const totalTasks = tasks.length || 1;
    const progressPercent = Math.min(100, Math.round((score / totalTasks) * 100));

    // Desired Quote logic
    const quote = loadingDescriptors
        ? <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Analyzing patient state...</span>
        : (descriptors ? `"${descriptors}"` : `"I feel like I'm a burden to everyone around me."`);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', maxWidth: '1000px', margin: '0 auto' }}>

            {/* Top Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 0',
                marginBottom: '20px'
            }}>
                <button
                    onClick={onQuit}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        color: 'var(--text-light, #777)',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontSize: '1rem', fontWeight: 800
                    }}
                >
                    <X size={32} strokeWidth={3} />
                    <span style={{ textTransform: 'uppercase' }}>Quit</span>
                </button>

                <div style={{ flex: 1, margin: '0 40px' }}>
                    {/* Progress Bar */}
                    <div style={{
                        height: '24px',
                        backgroundColor: '#e5e5e5',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '2px solid white',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            width: `${progressPercent}%`,
                            height: '100%',
                            backgroundColor: 'var(--success, #58CC02)',
                            borderRadius: '10px',
                            boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2)',
                            transition: 'width 0.5s ease-out'
                        }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, gap: '24px', paddingBottom: '20px', minHeight: 0 }}>
                {/* Left Side: Patient Avatar */}
                <div style={{
                    width: '320px',
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                    border: '2px solid var(--border-color, #e5e5e5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.05)',
                    padding: '20px'
                }}>
                    <div style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        marginBottom: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '4rem',
                        transition: 'background-color 0.5s ease',
                        boxShadow: `0 0 30px ${color}60`
                    }}>
                        {emoji}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: 'bold' }}>Alex</h3>
                    <div style={{ color: 'var(--text-light, #777)', textAlign: 'center', fontSize: '1rem', lineHeight: '1.5', minHeight: '60px' }}>
                        {quote}
                    </div>

                    <div style={{ marginTop: 'auto', width: '100%' }}>
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#eff6ff',
                            borderRadius: '16px',
                            color: '#1d4ed8',
                            fontWeight: 600,
                            textAlign: 'center',
                            border: '2px solid #dbeafe'
                        }}>
                            Topic: {emotionName}
                        </div>
                    </div>
                </div>

                {/* Right Side: Tasks or Chat */}
                <div style={{ flex: 1, height: '100%' }}>
                    {!tasksComplete && loadingTasks ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            flexDirection: 'column',
                            gap: '30px',
                            background: 'linear-gradient(135deg, rgba(249,250,251,0.8) 0%, rgba(243,244,246,0.9) 100%)',
                            borderRadius: '24px',
                            padding: '40px'
                        }}>
                            {/* Orb Loader Container */}
                            <div style={{
                                position: 'relative',
                                width: '120px',
                                height: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* Main Pulsing Orb */}
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
                                    boxShadow: `
                                        0 0 40px ${color}80,
                                        0 0 80px ${color}40,
                                        inset 0 -10px 20px rgba(0,0,0,0.2),
                                        inset 0 8px 15px rgba(255,255,255,0.3)
                                    `,
                                    animation: 'orbPulse 2s ease-in-out infinite'
                                }}>
                                    {/* Shine */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '15%',
                                        left: '20%',
                                        width: '30%',
                                        height: '20%',
                                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%)',
                                        borderRadius: '50%'
                                    }} />
                                </div>

                                {/* Orbiting Particles */}
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        style={{
                                            position: 'absolute',
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            background: color,
                                            boxShadow: `0 0 10px ${color}`,
                                            animation: `orbit 3s linear infinite`,
                                            animationDelay: `${i * 0.5}s`,
                                            opacity: 0.8
                                        }}
                                    />
                                ))}

                                {/* Outer Ring */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    border: `2px solid ${color}40`,
                                    animation: 'ringPulse 2s ease-in-out infinite'
                                }} />

                                {/* Second Ring */}
                                <div style={{
                                    position: 'absolute',
                                    width: '115px',
                                    height: '115px',
                                    borderRadius: '50%',
                                    border: `1px solid ${color}20`,
                                    animation: 'ringPulse 2s ease-in-out infinite 0.5s'
                                }} />
                            </div>

                            {/* Loading Text */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <p style={{
                                    color: '#374151',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    margin: 0
                                }}>
                                    Generating Training Tasks
                                </p>
                                <div style={{
                                    display: 'flex',
                                    gap: '6px'
                                }}>
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: color,
                                                animation: 'dotBounce 1.4s ease-in-out infinite',
                                                animationDelay: `${i * 0.2}s`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Animation Styles */}
                            <style>{`
                                @keyframes orbPulse {
                                    0%, 100% { transform: scale(1); }
                                    50% { transform: scale(1.1); }
                                }
                                @keyframes orbit {
                                    0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
                                    100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
                                }
                                @keyframes ringPulse {
                                    0%, 100% { transform: scale(1); opacity: 0.5; }
                                    50% { transform: scale(1.1); opacity: 0.8; }
                                }
                                @keyframes dotBounce {
                                    0%, 80%, 100% { transform: translateY(0); }
                                    40% { transform: translateY(-8px); }
                                }
                            `}</style>
                        </div>
                    ) : !tasksComplete && tasks.length > 0 && tasks[activeTaskIndex] ? (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            {tasks[activeTaskIndex].type === 'multiple_choice' && (
                                <MultipleChoiceTask {...tasks[activeTaskIndex]} onComplete={onTaskComplete} />
                            )}
                            {tasks[activeTaskIndex].type === 'true_false' && (
                                <TrueFalseTask {...tasks[activeTaskIndex]} onComplete={onTaskComplete} />
                            )}
                            {tasks[activeTaskIndex].type === 'fill_in_blank' && (
                                <FillInBlankTask {...tasks[activeTaskIndex]} onComplete={onTaskComplete} />
                            )}
                            {tasks[activeTaskIndex].type === 'match_definition' && (
                                <MatchDefinitionTask {...tasks[activeTaskIndex]} onComplete={onTaskComplete} />
                            )}
                        </div>
                    ) : (
                        <div style={{ marginTop: '50px', height: '100%' }}>
                            <ChatInterface
                                emotion={emotionName}
                                descriptors={descriptors || ''}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
