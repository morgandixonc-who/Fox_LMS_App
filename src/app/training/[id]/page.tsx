'use client';

import { useParams, useRouter } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';
import { X } from 'lucide-react';

export default function TrainingPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', maxWidth: '1000px', margin: '0 auto' }}>
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
                        border: '2px solid transparent'
                    }}>
                        <div style={{
                            width: '20%',
                            height: '100%',
                            backgroundColor: 'var(--success)',
                            borderRadius: '10px',
                            boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2)' /* 3D effect */
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
                        backgroundColor: '#fcd34d', // Yellow circle
                        marginBottom: '24px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '4rem'
                    }}>
                        😐
                    </div>
                    <h3 className="title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Alex</h3>
                    <p style={{ color: 'var(--text-light)', textAlign: 'center', fontSize: '1rem', lineHeight: '1.5' }}>
                        "I feel like I'm a burden to everyone around me."
                    </p>

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
                            Topic: Empathy
                        </div>
                    </div>
                </div>

                {/* Right Side: Chat */}
                <div style={{ flex: 1, height: '100%' }}>
                    <ChatInterface
                        initialMessages={[
                            { id: 'start', role: 'ai', text: "I don't know why I'm even here. It doesn't matter." }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
