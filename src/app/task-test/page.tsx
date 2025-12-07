"use client";

import React, { useState, useEffect } from 'react';
import { getEmotion } from '@/lib/emotions';
import MultipleChoiceTask from '@/components/tasks/MultipleChoiceTask';
import TrueFalseTask from '@/components/tasks/TrueFalseTask';
import FillInBlankTask from '@/components/tasks/FillInBlankTask';
import MatchDefinitionTask from '@/components/tasks/MatchDefinitionTask';
import ChatInterface from '@/components/chat/ChatInterface';

export default function TaskTestPage() {
    const [color1, setColor1] = useState('#3498db'); // Blueish
    const [color2, setColor2] = useState('#e74c3c'); // Reddish
    const [mixedColor, setMixedColor] = useState('#8e728c');
    const [emotion, setEmotion] = useState('');
    const [emotion1, setEmotion1] = useState('');
    const [emotion2, setEmotion2] = useState('');

    // API State
    const [isLoading, setIsLoading] = useState(false);
    const [apiResult, setApiResult] = useState<string | null>(null);

    // Task Generation State
    const [isTasksLoading, setIsTasksLoading] = useState(false);
    const [tasksResult, setTasksResult] = useState<string | null>(null);
    const [parsedTasks, setParsedTasks] = useState<any[]>([]);
    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);

    // Chat State
    const [isChatActive, setIsChatActive] = useState(false);

    // Helper: Hex to RGB
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    // Helper: RGB to HSL
    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    };

    // Helper: Component to Hex
    const componentToHex = (c: number) => {
        const hex = Math.round(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    // Helper: RGB to Hex
    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };

    // Helper: Get emotion from hex
    const getEmotionFromHex = (hex: string) => {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return getEmotion(hsl.h, hsl.l);
    };

    useEffect(() => {
        const c1 = hexToRgb(color1);
        const c2 = hexToRgb(color2);

        // Mix: Simple Average
        const mixedR = (c1.r + c2.r) / 2;
        const mixedG = (c1.g + c2.g) / 2;
        const mixedB = (c1.b + c2.b) / 2;

        setMixedColor(rgbToHex(mixedR, mixedG, mixedB));

        // Get Emotion for Mix
        const hsl = rgbToHsl(mixedR, mixedG, mixedB);
        const result = getEmotion(hsl.h, hsl.l);
        setEmotion(result);

        // Get Individual Emotions
        setEmotion1(getEmotionFromHex(color1));
        setEmotion2(getEmotionFromHex(color2));

        // Reset API result when colors change
        setApiResult(null);

    }, [color1, color2]);

    const handleContinue = async () => {
        setIsLoading(true);
        setApiResult(null);
        try {
            const res = await fetch('/api/generate-descriptors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emotion }),
            });
            const data = await res.json();
            if (data.result) {
                setApiResult(data.result);
            } else if (data.error) {
                setApiResult(`Error: ${data.error}`);
            }
        } catch (err) {
            setApiResult('Error connecting to API');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateTasks = async () => {
        if (!apiResult) return;
        setIsTasksLoading(true);
        setTasksResult(null);
        setParsedTasks([]);
        setActiveTaskIndex(null);
        try {
            const res = await fetch('/api/generate-tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emotion, descriptors: apiResult }),
            });
            const data = await res.json();
            if (data.result) {
                setTasksResult(data.result);
                // Parse JSON
                try {
                    const parsed = JSON.parse(data.result);
                    if (parsed && parsed.tasks) {
                        setParsedTasks(parsed.tasks);
                    }
                } catch (e) {
                    console.error("Failed to parse tasks JSON", e);
                }
            } else if (data.error) {
                setTasksResult(`Error: ${data.error}`);
            }
        } catch (err) {
            setTasksResult('Error connecting to API');
        } finally {
            setIsTasksLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f3f4f6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            fontFamily: 'sans-serif'
        }}>
            <h1 style={{ color: '#1f2937', marginBottom: '40px', fontSize: '2rem' }}>Task Generation Test</h1>

            <div style={{ display: 'flex', gap: '50px', alignItems: 'center', marginBottom: '40px' }}>
                {/* Color 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        style={{
                            width: '120px',
                            height: '120px',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563', fontSize: '0.9rem' }}>{emotion1}</p>
                </div>

                <div style={{ fontSize: '2rem', color: '#9ca3af' }}>+</div>

                {/* Color 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        style={{
                            width: '120px',
                            height: '120px',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    />
                    <p style={{ marginTop: '10px', color: '#4b5563', fontSize: '0.9rem' }}>{emotion2}</p>
                </div>
            </div>

            {/* Arrow */}
            <div style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '20px' }}>↓</div>

            {/* Result Hexagon with Emotion */}
            <div style={{
                position: 'relative',
                width: '200px',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px' // Added margin to space out from next section
            }}>
                <div style={{
                    width: '220px',
                    height: '240px',
                    background: mixedColor,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                    transition: 'background 0.3s ease',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginBottom: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Emotion Generated</div>
                    <div style={{
                        fontSize: '1.4rem',
                        fontWeight: '900',
                        color: 'white',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                        wordWrap: 'break-word',
                        width: '100%'
                    }}>
                        {emotion}
                    </div>
                </div>
            </div>

            {/* Down Arrow & Continue */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                <div style={{ fontSize: '2rem', color: '#9ca3af' }}>↓</div>

                <button
                    onClick={handleContinue}
                    disabled={isLoading}
                    style={{
                        padding: '12px 30px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: 'white',
                        background: isLoading ? '#9ca3af' : '#4f46e5',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 5px 15px rgba(79, 70, 229, 0.4)',
                        transition: 'transform 0.1s, background 0.2s'
                    }}
                    onMouseDown={e => !isLoading && (e.currentTarget.style.transform = 'scale(0.95)')}
                    onMouseUp={e => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {isLoading ? 'Generating...' : 'Continue'}
                </button>
            </div>

            {/* Workflow Modules Container */}
            <div style={{
                display: 'flex',
                gap: '30px',
                justifyContent: 'center',
                alignItems: 'stretch',
                width: '100%',
                maxWidth: '1200px',
                perspective: '1000px',
                marginBottom: '50px',
                flexWrap: 'wrap' // Allow wrapping on small screens
            }}>

                {/* Left Module: Workflow A */}
                <div style={{
                    width: '250px',
                    minWidth: '250px',
                    background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    border: '1px solid rgba(255,255,255,0.5)',
                    transition: 'transform 0.3s ease',
                    overflow: 'hidden'
                }}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚡</div>
                    <h3 style={{ color: '#4338ca', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Workflow A</h3>
                    <p style={{ color: '#6366f1', fontSize: '0.8rem', textAlign: 'center', marginTop: '5px', marginBottom: '15px' }}>
                        Task Generator
                    </p>

                    {/* Action Area */}
                    {!tasksResult && (
                        <button
                            onClick={(e) => { e.stopPropagation(); handleGenerateTasks(); }}
                            disabled={!apiResult || isTasksLoading}
                            style={{
                                padding: '8px 16px',
                                background: !apiResult ? '#9ca3af' : (isTasksLoading ? '#818cf8' : '#4338ca'),
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: (!apiResult || isTasksLoading) ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                width: '100%'
                            }}
                        >
                            {isTasksLoading ? 'Generating...' : 'Generate Tasks'}
                        </button>
                    )}

                    {/* Result Display */}
                    {tasksResult && (
                        <div style={{
                            width: '100%',
                            marginTop: '10px',
                            background: 'rgba(255,255,255,0.6)',
                            borderRadius: '10px',
                            padding: '10px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            fontSize: '0.7rem',
                            fontFamily: 'monospace',
                            color: '#1e3a8a',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {tasksResult}
                        </div>
                    )}
                </div>

                {/* Center: API Result Terminal */}
                <div style={{
                    flex: 1,
                    minWidth: '350px',
                    background: '#1f2937',
                    borderRadius: '15px',
                    padding: '20px',
                    color: '#10b981', // Terminal green
                    fontFamily: 'monospace',
                    minHeight: '200px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: '1px solid #374151'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '15px',
                        fontSize: '0.7rem',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        AI Descriptors
                    </div>
                    <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {apiResult ? apiResult : <span style={{ color: '#4b5563' }}>Press "Continue" to generate descriptors...</span>}
                    </div>
                </div>

                {/* Right Module: Workflow B (Chat) */}
                <div style={{
                    width: '350px', // Wider for chat
                    minWidth: '300px',
                    height: isChatActive ? '500px' : 'auto', // Expand height when active
                    background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                    borderRadius: '20px',
                    padding: isChatActive ? '0' : '20px', // Remove padding for chat fit
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center initially
                    justifyContent: isChatActive ? 'stretch' : 'center',
                    border: '1px solid rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative' // For close button positioning
                }}
                >
                    {!isChatActive ? (
                        <>
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔮</div>
                            <h3 style={{ color: '#be185d', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Workflow B</h3>
                            <p style={{ color: '#db2777', fontSize: '0.8rem', textAlign: 'center', marginTop: '5px', marginBottom: '15px' }}>
                                Output Analysis & Simulation
                            </p>

                            <button
                                onClick={() => setIsChatActive(true)}
                                disabled={!apiResult} // Need descriptors context
                                style={{
                                    padding: '8px 16px',
                                    background: !apiResult ? '#9ca3af' : '#be185d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: !apiResult ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    marginTop: '10px',
                                    width: '80%'
                                }}
                            >
                                Start Simulation
                            </button>
                            {!apiResult && (
                                <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '5px' }}>
                                    Generate descriptors first
                                </p>
                            )}
                        </>
                    ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <ChatInterface emotion={emotion} descriptors={apiResult || ''} />
                            <button
                                onClick={() => setIsChatActive(false)}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(255,255,255,0.5)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    color: '#be185d',
                                    zIndex: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Close Chat"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Task Visualization Section */}
            {parsedTasks.length > 0 && (
                <div style={{ width: '100%', maxWidth: '800px', marginBottom: '80px', animation: 'fadeIn 0.5s ease' }}>

                    <div style={{
                        height: '2px',
                        background: '#e5e7eb',
                        width: '100%',
                        marginBottom: '40px'
                    }}></div>

                    <h2 style={{ textAlign: 'center', color: '#1f2937', marginBottom: '30px' }}>Generated Warm-up Tasks</h2>

                    {/* Task Toggle Buttons */}
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {parsedTasks.map((task, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTaskIndex(index)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: activeTaskIndex === index ? '#4f46e5' : 'white',
                                    color: activeTaskIndex === index ? 'white' : '#4b5563',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s',
                                    borderBottom: activeTaskIndex === index ? '4px solid #3730a3' : '4px solid #e5e7eb'
                                }}
                            >
                                Task {index + 1} ({task.type.replace('_', ' ')})
                            </button>
                        ))}
                    </div>

                    {/* Active Task Render */}
                    {activeTaskIndex !== null && parsedTasks[activeTaskIndex] && (
                        <div style={{ animation: 'slideUp 0.3s ease' }}>
                            {parsedTasks[activeTaskIndex].type === 'multiple_choice' && (
                                <MultipleChoiceTask {...parsedTasks[activeTaskIndex]} />
                            )}
                            {parsedTasks[activeTaskIndex].type === 'true_false' && (
                                <TrueFalseTask {...parsedTasks[activeTaskIndex]} />
                            )}
                            {parsedTasks[activeTaskIndex].type === 'fill_in_blank' && (
                                <FillInBlankTask {...parsedTasks[activeTaskIndex]} />
                            )}
                            {parsedTasks[activeTaskIndex].type === 'match_definition' && (
                                <MatchDefinitionTask {...parsedTasks[activeTaskIndex]} />
                            )}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
