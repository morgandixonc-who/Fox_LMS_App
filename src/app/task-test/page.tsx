"use client";

import React, { useState, useEffect } from 'react';
import { getEmotion } from '@/lib/emotions';

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

            {/* API Result Shape */}
            {/* Using a different shape, e.g., a rounded rectangle or terminal-like box */}
            <div style={{
                width: '100%',
                maxWidth: '600px',
                background: '#1f2937',
                borderRadius: '15px',
                padding: '20px',
                color: '#10b981', // Terminal green
                fontFamily: 'monospace',
                minHeight: '150px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                marginBottom: '50px'
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

        </div>
    );
}
