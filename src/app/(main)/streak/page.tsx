'use client';
import { useState } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Flame, Calendar, Award, TrendingUp } from 'lucide-react';

type ViewMode = 'week' | 'month' | 'year';

export default function StreakPage() {
    const { darkMode } = useDarkMode();
    const [viewMode, setViewMode] = useState<ViewMode>('week');

    // Sample streak data
    const currentStreak = 5;
    const longestStreak = 12;
    const totalDays = 45;

    const weekData = [
        { day: 'Mon', active: true },
        { day: 'Tue', active: true },
        { day: 'Wed', active: true },
        { day: 'Thu', active: true },
        { day: 'Fri', active: true },
        { day: 'Sat', active: false },
        { day: 'Sun', active: false },
    ];

    // Generate month data (30 days)
    const monthData = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        active: Math.random() > 0.3 // Random active days for demo
    }));

    // Generate year data (12 months)
    const yearData = [
        { month: 'Jan', days: 20 },
        { month: 'Feb', days: 18 },
        { month: 'Mar', days: 25 },
        { month: 'Apr', days: 22 },
        { month: 'May', days: 28 },
        { month: 'Jun', days: 15 },
        { month: 'Jul', days: 12 },
        { month: 'Aug', days: 19 },
        { month: 'Sep', days: 23 },
        { month: 'Oct', days: 26 },
        { month: 'Nov', days: 21 },
        { month: 'Dec', days: 5 },
    ];

    const getViewTitle = () => {
        switch (viewMode) {
            case 'week': return 'This Week';
            case 'month': return 'This Month';
            case 'year': return 'This Year';
        }
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px'
        }}>
            <h1 className="title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                🔥 Your Streak
            </h1>

            {/* Current Streak Card */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(255,150,0,0.1) 0%, rgba(255,150,0,0.05) 100%)',
                border: '2px solid var(--primary)',
                borderRadius: 'var(--radius)',
                padding: '40px',
                textAlign: 'center',
                marginBottom: '30px',
                boxShadow: '0 8px 32px rgba(255,150,0,0.2)'
            }}>
                <Flame size={80} fill="var(--primary)" color="var(--primary)" style={{ marginBottom: '20px' }} />
                <h2 style={{
                    fontSize: '4rem',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    margin: '0 0 10px 0'
                }}>
                    {currentStreak}
                </h2>
                <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text-color)',
                    margin: 0
                }}>
                    Day Streak
                </p>
                <p style={{
                    marginTop: '20px',
                    color: 'var(--text-light)',
                    fontSize: '1rem'
                }}>
                    Keep it up! Complete a lesson today to maintain your streak.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {/* Longest Streak */}
                <div style={{
                    padding: '30px',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--surface-color)',
                    textAlign: 'center'
                }}>
                    <Award size={40} color="var(--secondary)" style={{ marginBottom: '15px' }} />
                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: 'var(--secondary)',
                        margin: '0 0 5px 0'
                    }}>
                        {longestStreak}
                    </h3>
                    <p style={{
                        color: 'var(--text-light)',
                        margin: 0,
                        fontWeight: 600
                    }}>
                        Longest Streak
                    </p>
                </div>

                {/* Total Days */}
                <div style={{
                    padding: '30px',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--surface-color)',
                    textAlign: 'center'
                }}>
                    <Calendar size={40} color="var(--success)" style={{ marginBottom: '15px' }} />
                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: 'var(--success)',
                        margin: '0 0 5px 0'
                    }}>
                        {totalDays}
                    </h3>
                    <p style={{
                        color: 'var(--text-light)',
                        margin: 0,
                        fontWeight: 600
                    }}>
                        Total Days
                    </p>
                </div>
            </div>

            {/* Activity View with Toggle */}
            <div style={{
                padding: '30px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)',
                marginBottom: '30px'
            }}>
                {/* Header with Toggle Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '15px'
                }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--text-color)',
                        margin: 0
                    }}>
                        {getViewTitle()}
                    </h3>

                    {/* Toggle Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        backgroundColor: 'var(--bg-color)',
                        padding: '4px',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)'
                    }}>
                        {(['week', 'month', 'year'] as ViewMode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: viewMode === mode ? 'var(--primary)' : 'transparent',
                                    color: viewMode === mode ? 'white' : 'var(--text-color)',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textTransform: 'capitalize'
                                }}
                                onMouseEnter={(e) => {
                                    if (viewMode !== mode) {
                                        e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (viewMode !== mode) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Week View */}
                {viewMode === 'week' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '10px'
                    }}>
                        {weekData.map((item, index) => (
                            <div key={index} style={{
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    borderRadius: '12px',
                                    backgroundColor: item.active ? 'var(--primary)' : 'var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '8px',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {item.active && (
                                        <Flame size={24} fill="white" color="white" />
                                    )}
                                </div>
                                <p style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    color: item.active ? 'var(--text-color)' : 'var(--text-light)',
                                    margin: 0
                                }}>
                                    {item.day}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Month View */}
                {viewMode === 'month' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '8px'
                    }}>
                        {monthData.map((item, index) => (
                            <div key={index} style={{
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    borderRadius: '8px',
                                    backgroundColor: item.active ? 'var(--primary)' : 'var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: item.active ? 'white' : 'var(--text-light)'
                                }}>
                                    {item.day}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Year View */}
                {viewMode === 'year' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                        gap: '12px'
                    }}>
                        {yearData.map((item, index) => (
                            <div key={index} style={{
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '80px',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '8px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {/* Fill bar based on days */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: `${(item.days / 31) * 100}%`,
                                        backgroundColor: 'var(--primary)',
                                        transition: 'all 0.3s ease'
                                    }} />
                                    <div style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        fontSize: '1.5rem',
                                        fontWeight: 900,
                                        color: item.days > 15 ? 'white' : 'var(--text-color)'
                                    }}>
                                        {item.days}
                                    </div>
                                </div>
                                <p style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    color: 'var(--text-color)',
                                    margin: 0
                                }}>
                                    {item.month}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Streak Tips */}
            <div style={{
                padding: '30px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)'
            }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '20px',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <TrendingUp size={28} color="var(--primary)" />
                    Streak Tips
                </h3>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                }}>
                    <li style={{
                        padding: '15px 0',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--text-color)'
                    }}>
                        ✅ Complete at least one lesson every day
                    </li>
                    <li style={{
                        padding: '15px 0',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--text-color)'
                    }}>
                        ⏰ Set a daily reminder to practice
                    </li>
                    <li style={{
                        padding: '15px 0',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--text-color)'
                    }}>
                        🎯 Make it a habit - same time every day
                    </li>
                    <li style={{
                        padding: '15px 0',
                        color: 'var(--text-color)'
                    }}>
                        🔥 Don't break the chain!
                    </li>
                </ul>
            </div>
        </div>
    );
}
