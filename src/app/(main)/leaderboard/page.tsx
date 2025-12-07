'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDarkMode } from '@/contexts/DarkModeContext';

// Sample leaderboard data
const leaderboardData = [
    { id: 1, name: 'Sarah Mitchell', score: 12450, profilePicture: null, level: 'Captain', streak: 45 },
    { id: 2, name: 'James Rodriguez', score: 11890, profilePicture: null, level: 'First Officer', streak: 38 },
    { id: 3, name: 'Emily Chen', score: 10320, profilePicture: null, level: 'Captain', streak: 32 },
    { id: 4, name: 'Michael Torres', score: 9875, profilePicture: null, level: 'First Officer', streak: 28 },
    { id: 5, name: 'Jessica Park', score: 9234, profilePicture: null, level: 'Senior FO', streak: 25 },
    { id: 6, name: 'David Kim', score: 8901, profilePicture: null, level: 'First Officer', streak: 22 },
    { id: 7, name: 'Amanda Foster', score: 8456, profilePicture: null, level: 'First Officer', streak: 19 },
    { id: 8, name: 'Robert Chang', score: 7823, profilePicture: null, level: 'Second Officer', streak: 15 },
    { id: 9, name: 'Lisa Anderson', score: 7234, profilePicture: null, level: 'Second Officer', streak: 12 },
    { id: 10, name: 'Chris Martinez', score: 6890, profilePicture: null, level: 'Second Officer', streak: 10 },
];

export default function LeaderboardPage() {
    const router = useRouter();
    const { darkMode } = useDarkMode();

    const getMedalColor = (rank: number) => {
        if (rank === 1) return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'; // Gold
        if (rank === 2) return 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'; // Silver
        if (rank === 3) return 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)'; // Bronze
        return 'transparent';
    };

    const getMedalEmoji = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
            padding: '100px 20px 40px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255,150,0,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(0,196,204,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite reverse'
            }} />

            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '50px',
                position: 'relative',
                zIndex: 10
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #FF9600 0%, #00C4CC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '10px',
                    textShadow: '0 0 40px rgba(255,150,0,0.3)',
                    letterSpacing: '-1px'
                }}>
                    🏆 LEADERBOARD
                </h1>
                <p style={{
                    color: '#888',
                    fontSize: '1.1rem',
                    fontWeight: 500
                }}>
                    Top pilots ranked by training score
                </p>
            </div>

            {/* Main Container */}
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Top 3 Podium */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {leaderboardData.slice(0, 3).map((user, index) => {
                        const rank = index + 1;
                        const isFirst = rank === 1;
                        return (
                            <div
                                key={user.id}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,150,0,0.1) 0%, rgba(0,196,204,0.1) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid rgba(255,255,255,0.1)',
                                    borderRadius: '24px',
                                    padding: '30px 20px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    transform: 'scale(1)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                    e.currentTarget.style.borderColor = '#FF9600';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                            >
                                {/* Medal Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '2.5rem',
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                }}>
                                    {getMedalEmoji(rank)}
                                </div>

                                {/* Avatar */}
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    margin: '20px auto 15px auto',
                                    border: '3px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                }}>
                                    <Image
                                        src={user.profilePicture || '/assets/default-avatar.png'}
                                        alt={user.name}
                                        width={100}
                                        height={100}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </div>

                                {/* Name */}
                                <h3 style={{
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    marginBottom: '8px'
                                }}>
                                    {user.name}
                                </h3>

                                {/* Level */}
                                <p style={{
                                    color: '#00C4CC',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    marginBottom: '15px'
                                }}>
                                    {user.level}
                                </p>

                                {/* Score */}
                                <div style={{
                                    background: 'rgba(255,150,0,0.2)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    marginBottom: '10px'
                                }}>
                                    <div style={{
                                        color: '#FF9600',
                                        fontSize: '1.8rem',
                                        fontWeight: 900
                                    }}>
                                        {user.score.toLocaleString()}
                                    </div>
                                    <div style={{
                                        color: '#888',
                                        fontSize: '0.8rem',
                                        marginTop: '4px'
                                    }}>
                                        POINTS
                                    </div>
                                </div>

                                {/* Streak */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    color: '#fff',
                                    fontSize: '0.9rem'
                                }}>
                                    <span>🔥</span>
                                    <span>{user.streak} day streak</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Rest of Rankings */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    padding: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}>
                    {leaderboardData.slice(3).map((user, index) => {
                        const rank = index + 4;
                        return (
                            <div
                                key={user.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '20px',
                                    marginBottom: '12px',
                                    background: 'linear-gradient(90deg, rgba(255,150,0,0.05) 0%, rgba(0,196,204,0.05) 100%)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,150,0,0.15) 0%, rgba(0,196,204,0.15) 100%)';
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                    e.currentTarget.style.borderColor = 'rgba(255,150,0,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,150,0,0.05) 0%, rgba(0,196,204,0.05) 100%)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                }}
                            >
                                {/* Rank Number */}
                                <div style={{
                                    minWidth: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, rgba(255,150,0,0.2) 0%, rgba(0,196,204,0.2) 100%)',
                                    borderRadius: '12px',
                                    color: '#FF9600',
                                    fontSize: '1.3rem',
                                    fontWeight: 900,
                                    marginRight: '20px'
                                }}>
                                    {rank}
                                </div>

                                {/* Avatar */}
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginRight: '20px',
                                    border: '2px solid rgba(255,150,0,0.3)',
                                    flexShrink: 0
                                }}>
                                    <Image
                                        src={user.profilePicture || '/assets/default-avatar.png'}
                                        alt={user.name}
                                        width={60}
                                        height={60}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </div>

                                {/* User Info */}
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        color: '#fff',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        marginBottom: '4px'
                                    }}>
                                        {user.name}
                                    </h4>
                                    <p style={{
                                        color: '#00C4CC',
                                        fontSize: '0.85rem',
                                        fontWeight: 500
                                    }}>
                                        {user.level}
                                    </p>
                                </div>

                                {/* Streak */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginRight: '30px',
                                    color: '#888',
                                    fontSize: '0.9rem'
                                }}>
                                    <span>🔥</span>
                                    <span>{user.streak}</span>
                                </div>

                                {/* Score */}
                                <div style={{
                                    textAlign: 'right'
                                }}>
                                    <div style={{
                                        color: '#FF9600',
                                        fontSize: '1.5rem',
                                        fontWeight: 900
                                    }}>
                                        {user.score.toLocaleString()}
                                    </div>
                                    <div style={{
                                        color: '#666',
                                        fontSize: '0.75rem',
                                        marginTop: '2px'
                                    }}>
                                        POINTS
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </div>
    );

}