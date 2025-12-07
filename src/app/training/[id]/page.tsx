'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ChatInterface from '@/components/chat/ChatInterface';
import { X } from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import LevelIntro from '@/components/LevelIntro';
import MultipleChoiceTask from '@/components/tasks/MultipleChoiceTask';
import TrueFalseTask from '@/components/tasks/TrueFalseTask';
import FillInBlankTask from '@/components/tasks/FillInBlankTask';
import MatchDefinitionTask from '@/components/tasks/MatchDefinitionTask';

function TrainingPageContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id } = params;

    const [showIntro, setShowIntro] = useState(true);
    const [descriptors, setDescriptors] = useState<string | null>(null);
    const [loadingDescriptors, setLoadingDescriptors] = useState(false);

    // Task State
    const [tasks, setTasks] = useState<any[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [activeTaskIndex, setActiveTaskIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [tasksComplete, setTasksComplete] = useState(false);

    const hue = parseInt(searchParams.get('hue') || '0', 10);
    const color = searchParams.get('color') || '#fcd34d'; // Default yellow if no param
    const name = searchParams.get('name') || 'Empathy';

    // Fetch Descriptors & Tasks on mount
    useEffect(() => {
        const fetchData = async () => {
            if (!name) return;

            // 1. Fetch Descriptors
            setLoadingDescriptors(true);
            let fetchedDescriptors = "";
            try {
                const res = await fetch('/api/generate-descriptors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: name }),
                });
                const data = await res.json();
                if (data.result) {
                    fetchedDescriptors = data.result;
                    setDescriptors(data.result);
                }
            } catch (error) {
                console.error("Failed to fetch descriptors", error);
            } finally {
                setLoadingDescriptors(false);
            }

            // 2. Fetch Tasks (if descriptors found)
            if (fetchedDescriptors) {
                setLoadingTasks(true);
                try {
                    const res = await fetch('/api/generate-tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ emotion: name, descriptors: fetchedDescriptors }),
                    });
                    const data = await res.json();
                    if (data.result) {
                        try {
                            const parsed = JSON.parse(data.result);
                            if (parsed && parsed.tasks) {
                                setTasks(parsed.tasks);
                            }
                        } catch (e) {
                            console.error("Failed to parse tasks", e);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch tasks", error);
                } finally {
                    setLoadingTasks(false);
                }
            }
        };

        fetchData();
    }, [name]);

    const handleTaskComplete = (isCorrect: boolean) => {
        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            // Fix: Use current closure value of activeTaskIndex for update to prevent race conditions (double clicks)
            // causing double increments. i.e. use setActiveTaskIndex(activeTaskIndex + 1) instead of s => s + 1
            if (activeTaskIndex < tasks.length - 1) {
                setActiveTaskIndex(activeTaskIndex + 1);
            } else {
                setTasksComplete(true);
            }
        }, 500);
    };

    // Calculate Progress: Based on Accuracy Score relative to Total Tasks?
    // Or just completion? User asked for "accuracy".
    // Let's do: (Score / Total Tasks) * 100
    const totalTasks = tasks.length || 1; // avoid divide by zero
    const progressPercent = Math.min(100, Math.round((score / totalTasks) * 100));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Level Intro Overlay */}
            {showIntro && (
                <LevelIntro
                    targetColor={color}
                    emotionName={name}
                    hue={hue}
                    onClose={() => router.push('/dashboard')} // Close goes back
                    onStart={() => setShowIntro(false)}
                />
            )}

            {/* Top Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 0',
                marginBottom: '20px' // Removed border-bottom from here to keep it clean, maybe just space
            }}>
                <button
                    onClick={() => router.push('/dashboard')}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        color: 'var(--text-light)',
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
                            backgroundColor: 'var(--success)',
                            borderRadius: '10px',
                            boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2)', /* 3D effect */
                            transition: 'width 0.5s ease-out'
                        }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, gap: '24px', paddingBottom: '20px', minHeight: 0 }}>
                {/* Left Side: Patient Avatar/Video Placeholder */}
                <div style={{
                    width: '320px',
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                    border: '2px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    // height: '100%', // Match parent
                    boxShadow: '0 8px 0 rgba(0,0,0,0.05)',
                    padding: '20px'
                }}>
                    <div style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        backgroundColor: color, // Dynamic Color
                        marginBottom: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '4rem',
                        transition: 'background-color 0.5s ease',
                        boxShadow: `0 0 30px ${color}60`
                    }}>
                        😐
                    </div>
                    <h3 className="title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Alex</h3>
                    <div style={{ color: 'var(--text-light)', textAlign: 'center', fontSize: '1rem', lineHeight: '1.5', minHeight: '60px' }}>
                        {loadingDescriptors ? (
                            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Analyzing patient state...</span>
                        ) : (
                            descriptors ? `"${descriptors}"` : `"I feel like I'm a burden to everyone around me."`
                        )}
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
                            Topic: {name}
                        </div>
                    </div>
                </div>

                {/* Right Side: Tasks or Chat */}
                <div style={{ flex: 1, height: '100%' }}>
                    {!tasksComplete && loadingTasks ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '20px', color: '#6b7280' }}>
                            <div className="spinner"></div> {/* Assuming global spinner or just text */}
                            <p>Generating Training Tasks...</p>
                        </div>
                    ) : !tasksComplete && tasks.length > 0 && tasks[activeTaskIndex] ? (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            {tasks[activeTaskIndex].type === 'multiple_choice' && (
                                <MultipleChoiceTask {...tasks[activeTaskIndex]} onComplete={handleTaskComplete} />
                            )}
                            {tasks[activeTaskIndex].type === 'true_false' && (
                                <TrueFalseTask {...tasks[activeTaskIndex]} onComplete={handleTaskComplete} />
                            )}
                            {tasks[activeTaskIndex].type === 'fill_in_blank' && (
                                <FillInBlankTask {...tasks[activeTaskIndex]} onComplete={handleTaskComplete} />
                            )}
                            {tasks[activeTaskIndex].type === 'match_definition' && (
                                <MatchDefinitionTask {...tasks[activeTaskIndex]} onComplete={handleTaskComplete} />
                            )}
                            {/* Fallback for unknown types? */}
                        </div>
                    ) : (
                        <div style={{ marginTop: '50px', height: '100%' }}>
                            <ChatInterface
                                emotion={name}
                                descriptors={descriptors || ''}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function TrainingPage() {
    return (
        <Suspense fallback={<div />}>
            <TrainingPageContent />
        </Suspense>
    );
}
