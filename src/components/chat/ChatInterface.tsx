import React, { useState, useRef, useEffect } from 'react';

interface ChatInterfaceProps {
    emotion: string;
    descriptors: string;
}

interface Message {
    role: 'user' | 'model';
    content: string;
    hidden?: boolean;
}

export default function ChatInterface({ emotion, descriptors }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // New error state
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, error]); // Scroll on error too

    // Auto-start Logic
    useEffect(() => {
        if (!hasInitialized.current && messages.length === 0) {
            hasInitialized.current = true;
            sendMessage("So tell me about how you feel", true);
        }
    }, [emotion]);

    const sendMessage = async (text: string, isHidden: boolean = false) => {
        if (!text.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);

        const newMsg: Message = { role: 'user', content: text, hidden: isHidden };

        // Add to state
        const newMessages = [...messages, newMsg];
        setMessages(newMessages);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages,
                    emotion,
                    descriptors
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Server is busy (Rate Limit). Please wait a moment.");
                }
                throw new Error(`Connection error: ${response.statusText}`);
            }

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiMsgContent = '';

            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                aiMsgContent += chunk;

                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'model', content: aiMsgContent };
                    return updated;
                });
            }

        } catch (err: any) {
            console.error('Chat Error:', err);
            setError(err.message || 'Could not connect.');
            // Remove the empty model message if it exists and is empty (failed start)
            setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last && last.role === 'model' && last.content === '') {
                    return prev.slice(0, -1);
                }
                return prev;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    const handleRetry = () => {
        // Retry the last user message if possible, or reset
        // For auto-start failure (hidden message), we just call it again
        if (messages.length > 0) {
            const lastUserMsg = messages[messages.length - 1]; // This might be the hidden one
            // We need to remove the failed attempt from state to "try again" cleanly if we want to just re-call sendMessage
            // But sendMessage appends. 
            // Better strategy: Simple "Retry Connection" button that re-triggers the *last logic*.
            // For now simplest: just call sendMessage with the last user text again, but we need to slice it off first?
            // Actually, simplest is just to clear error and call sendMessage with the hidden prompt if init failed.

            // If checking specifically for initialization failure:
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.hidden) {
                // Remove it and try again
                setMessages(prev => prev.slice(0, -1));
                sendMessage(lastMsg.content, true);
                return;
            }

            // If normal message failed
            setMessages(prev => prev.slice(0, -1));
            sendMessage(lastMsg.content, false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '500px',
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '15px',
                background: '#fce7f3',
                borderBottom: '1px solid #fbcfe8',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <div style={{ fontSize: '1.5rem' }}>🔮</div>
                <div>
                    <h3 style={{ margin: 0, color: '#be185d', fontSize: '1rem' }}>Patient Simulation</h3>
                    <div style={{ fontSize: '0.8rem', color: '#db2777' }}>State: {emotion}</div>
                </div>
            </div>

            {/* Messages Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                background: '#f9fafb'
            }}>
                {messages.filter(m => !m.hidden).length === 0 && !isLoading && !error && (
                    <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '50px', fontSize: '0.9rem' }}>
                        Connecting to patient...
                    </div>
                )}

                {messages.map((msg, idx) => {
                    if (msg.hidden) return null;
                    const isUser = msg.role === 'user';
                    return (
                        <div key={idx} style={{
                            alignSelf: isUser ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            padding: '10px 15px',
                            borderRadius: '12px',
                            background: isUser ? '#4f46e5' : 'white',
                            color: isUser ? 'white' : '#1f2937',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            border: isUser ? 'none' : '1px solid #e5e7eb',
                            borderBottomRightRadius: isUser ? '2px' : '12px',
                            borderBottomLeftRadius: isUser ? '12px' : '2px',
                        }}>
                            {msg.content}
                        </div>
                    );
                })}

                {isLoading && (
                    <div style={{ alignSelf: 'flex-start', color: '#9ca3af', fontSize: '0.8rem', marginLeft: '10px' }}>
                        Patient is typing...
                    </div>
                )}

                {error && (
                    <div style={{
                        alignSelf: 'center',
                        color: '#b91c1c',
                        background: '#fef2f2',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        border: '1px solid #fecaca',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <span>⚠️ {error}</span>
                        <button
                            onClick={handleRetry}
                            style={{
                                padding: '4px 12px',
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{
                padding: '15px',
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                gap: '10px',
                background: 'white'
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading || !!error}
                    style={{
                        flex: 1,
                        padding: '10px 15px',
                        borderRadius: '20px',
                        border: '1px solid #d1d5db',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading || !!error}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        background: '#be185d',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: (!input.trim() || isLoading || !!error) ? 'default' : 'pointer',
                        opacity: (!input.trim() || isLoading || !!error) ? 0.5 : 1
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
