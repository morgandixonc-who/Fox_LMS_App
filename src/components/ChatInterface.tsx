'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import styles from './ChatInterface.module.css';

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
}

interface ChatInterfaceProps {
    initialMessages?: Message[];
}

export default function ChatInterface({ initialMessages = [] }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: inputValue,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Placeholder AI response logic
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: "I'm feeling really overwhelmed right now. Nothing seems to make sense anymore.",
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.messagesArea}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isTyping && (
                    <div className={`${styles.messageBubble} ${styles.aiMessage}`} style={{ fontStyle: 'italic', color: '#888' }}>
                        Typing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
                <input
                    className={styles.input}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your response..."
                    disabled={isTyping}
                />
                <button
                    className={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={isTyping}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
