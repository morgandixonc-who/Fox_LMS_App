'use client';
import { useState } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Zap, CheckCircle, Circle, Gift, Star, Target, Book, Dumbbell, Trophy } from 'lucide-react';

interface Quest {
    id: number;
    title: string;
    description: string;
    icon: any;
    iconColor: string;
    iconBg: string;
    progress: number;
    goal: number;
    xpReward: number;
    completed: boolean;
}

export default function QuestsPage() {
    const { darkMode } = useDarkMode();

    const [quests, setQuests] = useState<Quest[]>([
        {
            id: 1,
            title: 'Earn 50 XP',
            description: 'Complete lessons to earn experience points',
            icon: Zap,
            iconColor: '#FFD700',
            iconBg: '#FFF9E6',
            progress: 20,
            goal: 50,
            xpReward: 10,
            completed: false
        },
        {
            id: 2,
            title: 'Complete 3 Lessons',
            description: 'Finish three training modules today',
            icon: Book,
            iconColor: '#00C4CC',
            iconBg: '#E6F9FA',
            progress: 1,
            goal: 3,
            xpReward: 15,
            completed: false
        },
        {
            id: 3,
            title: 'Practice 5 Scenarios',
            description: 'Complete practice scenarios to improve your skills',
            icon: Dumbbell,
            iconColor: '#FF9600',
            iconBg: '#FFF3E6',
            progress: 3,
            goal: 5,
            xpReward: 20,
            completed: false
        },
        {
            id: 4,
            title: 'Perfect Score',
            description: 'Get 100% on any lesson',
            icon: Star,
            iconColor: '#9333ea',
            iconBg: '#F3E8FF',
            progress: 0,
            goal: 1,
            xpReward: 25,
            completed: false
        },
        {
            id: 5,
            title: 'Reach Top 10',
            description: 'Climb the leaderboard rankings',
            icon: Trophy,
            iconColor: '#58CC02',
            iconBg: '#EEFBE6',
            progress: 0,
            goal: 1,
            xpReward: 30,
            completed: false
        }
    ]);

    const totalXP = quests.reduce((sum, quest) => sum + (quest.completed ? quest.xpReward : 0), 0);
    const completedCount = quests.filter(q => q.completed).length;

    const toggleQuestComplete = (id: number) => {
        setQuests(quests.map(quest =>
            quest.id === id
                ? { ...quest, completed: !quest.completed, progress: !quest.completed ? quest.goal : 0 }
                : quest
        ));
    };

    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 20px'
        }}>
            <h1 className="title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                ⚡ Daily Quests
            </h1>

            {/* Progress Summary */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(255,150,0,0.1) 0%, rgba(0,196,204,0.1) 100%)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                padding: '30px',
                marginBottom: '30px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: 'var(--primary)',
                        marginBottom: '5px'
                    }}>
                        {completedCount}/{quests.length}
                    </div>
                    <div style={{
                        color: 'var(--text-light)',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}>
                        Quests Completed
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: 'var(--secondary)',
                        marginBottom: '5px'
                    }}>
                        {totalXP}
                    </div>
                    <div style={{
                        color: 'var(--text-light)',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}>
                        XP Earned Today
                    </div>
                </div>
            </div>

            {/* Quest List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {quests.map((quest) => {
                    const Icon = quest.icon;
                    const progressPercent = (quest.progress / quest.goal) * 100;

                    return (
                        <div
                            key={quest.id}
                            style={{
                                border: `2px solid ${quest.completed ? 'var(--success)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius)',
                                padding: '20px',
                                backgroundColor: quest.completed
                                    ? 'rgba(88, 204, 2, 0.05)'
                                    : 'var(--surface-color)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onClick={() => toggleQuestComplete(quest.id)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Completion Overlay */}
                            {quest.completed && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    zIndex: 2
                                }}>
                                    <CheckCircle size={32} color="var(--success)" fill="var(--success)" />
                                </div>
                            )}

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '20px'
                            }}>
                                {/* Icon */}
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : quest.iconBg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Icon size={32} color={quest.iconColor} />
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '8px',
                                        gap: '10px'
                                    }}>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 800,
                                                color: 'var(--text-color)',
                                                marginBottom: '4px',
                                                textDecoration: quest.completed ? 'line-through' : 'none',
                                                opacity: quest.completed ? 0.7 : 1
                                            }}>
                                                {quest.title}
                                            </h3>
                                            <p style={{
                                                color: 'var(--text-light)',
                                                fontSize: '0.9rem',
                                                margin: 0
                                            }}>
                                                {quest.description}
                                            </p>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            backgroundColor: 'rgba(255,215,0,0.2)',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            flexShrink: 0
                                        }}>
                                            <Zap size={16} fill="#FFD700" color="#FFD700" />
                                            <span style={{
                                                fontWeight: 800,
                                                color: '#FFD700',
                                                fontSize: '0.9rem'
                                            }}>
                                                +{quest.xpReward} XP
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{ marginTop: '12px' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '6px'
                                        }}>
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 700,
                                                color: 'var(--text-light)'
                                            }}>
                                                Progress
                                            </span>
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 700,
                                                color: quest.completed ? 'var(--success)' : 'var(--text-color)'
                                            }}>
                                                {quest.progress}/{quest.goal}
                                            </span>
                                        </div>
                                        <div style={{
                                            height: '10px',
                                            backgroundColor: 'var(--border-color)',
                                            borderRadius: '5px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${progressPercent}%`,
                                                backgroundColor: quest.completed ? 'var(--success)' : 'var(--primary)',
                                                transition: 'width 0.3s ease',
                                                borderRadius: '5px'
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bonus Reward */}
            {completedCount === quests.length && (
                <div style={{
                    marginTop: '30px',
                    background: 'linear-gradient(135deg, rgba(88,204,2,0.1) 0%, rgba(88,204,2,0.05) 100%)',
                    border: '2px solid var(--success)',
                    borderRadius: 'var(--radius)',
                    padding: '30px',
                    textAlign: 'center'
                }}>
                    <Gift size={60} color="var(--success)" style={{ marginBottom: '15px' }} />
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: 'var(--success)',
                        marginBottom: '10px'
                    }}>
                        🎉 All Quests Complete!
                    </h2>
                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '1.1rem',
                        marginBottom: '15px'
                    }}>
                        You've completed all daily quests!
                    </p>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'var(--success)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        fontWeight: 800,
                        fontSize: '1.2rem'
                    }}>
                        <Zap size={24} fill="white" />
                        +50 Bonus XP
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)'
            }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--text-color)',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Target size={24} color="var(--primary)" />
                    Quest Tips
                </h3>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    color: 'var(--text-color)'
                }}>
                    <li style={{ padding: '8px 0' }}>
                        💡 Complete all daily quests to earn bonus XP
                    </li>
                    <li style={{ padding: '8px 0' }}>
                        🔄 Quests reset every day at midnight
                    </li>
                    <li style={{ padding: '8px 0' }}>
                        ⚡ XP helps you level up and unlock new content
                    </li>
                </ul>
            </div>
        </div>
    );
}
