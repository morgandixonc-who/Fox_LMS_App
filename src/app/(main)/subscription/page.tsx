'use client';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Check, Zap, Star, Shield, Users, BookOpen, Trophy, Sparkles } from 'lucide-react';

export default function SubscriptionPage() {
    const router = useRouter();
    const { darkMode } = useDarkMode();

    const freeFeatures = [
        'Access to basic training modules',
        '5 practice scenarios per day',
        'Community support',
        'Basic progress tracking'
    ];

    const proFeatures = [
        'Unlimited practice scenarios',
        'Advanced AI personas',
        'Priority support',
        'Detailed analytics & insights',
        'Custom training paths',
        'Offline mode access',
        'Certificate of completion',
        'Ad-free experience',
        'Early access to new features'
    ];

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 className="title" style={{
                    fontSize: '3rem',
                    marginBottom: '15px'
                }}>
                    Choose Your Plan
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-light)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Unlock your full potential with Fox Training Pro
                </p>
            </div>

            {/* Pricing Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                marginBottom: '50px'
            }}>
                {/* Free Plan */}
                <div style={{
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    padding: '40px 30px',
                    backgroundColor: 'var(--surface-color)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            marginBottom: '10px',
                            color: 'var(--text-color)'
                        }}>
                            Free
                        </h2>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 900,
                            color: 'var(--text-color)',
                            marginBottom: '10px'
                        }}>
                            $0
                            <span style={{
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                color: 'var(--text-light)'
                            }}>
                                /month
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--text-light)',
                            fontSize: '1rem'
                        }}>
                            Perfect for getting started
                        </p>
                    </div>

                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 30px 0',
                        flex: 1
                    }}>
                        {freeFeatures.map((feature, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                marginBottom: '15px',
                                color: 'var(--text-color)'
                            }}>
                                <Check size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="btn btn-outline"
                        style={{ width: '100%' }}
                        onClick={() => router.push('/profile')}
                    >
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div style={{
                    border: '3px solid var(--primary)',
                    borderRadius: 'var(--radius)',
                    padding: '40px 30px',
                    backgroundColor: 'var(--surface-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 10px 40px rgba(255,150,0,0.2)',
                    transform: 'scale(1.05)'
                }}>
                    {/* Popular Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '6px 20px',
                        borderRadius: '20px',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <Star size={16} fill="white" />
                        MOST POPULAR
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            marginBottom: '10px',
                            color: 'var(--primary)'
                        }}>
                            Pro
                        </h2>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 900,
                            color: 'var(--text-color)',
                            marginBottom: '10px'
                        }}>
                            $29
                            <span style={{
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                color: 'var(--text-light)'
                            }}>
                                /month
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--text-light)',
                            fontSize: '1rem'
                        }}>
                            Everything you need to excel
                        </p>
                    </div>

                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 30px 0',
                        flex: 1
                    }}>
                        {proFeatures.map((feature, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                marginBottom: '15px',
                                color: 'var(--text-color)'
                            }}>
                                <Check size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ fontWeight: 600 }}>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        Upgrade to Pro
                    </button>
                </div>
            </div>

            {/* Features Showcase */}
            <div style={{
                marginBottom: '50px'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    textAlign: 'center',
                    marginBottom: '40px',
                    color: 'var(--text-color)'
                }}>
                    Why Go Pro?
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '25px'
                }}>
                    {[
                        {
                            icon: Zap,
                            color: '#FFD700',
                            title: 'Unlimited Practice',
                            description: 'Access unlimited practice scenarios without daily limits'
                        },
                        {
                            icon: BookOpen,
                            color: '#00C4CC',
                            title: 'Advanced Content',
                            description: 'Get access to premium training modules and materials'
                        },
                        {
                            icon: Users,
                            color: '#FF9600',
                            title: 'Priority Support',
                            description: 'Get help faster with dedicated priority support'
                        },
                        {
                            icon: Trophy,
                            color: '#58CC02',
                            title: 'Certificates',
                            description: 'Earn official certificates upon course completion'
                        },
                        {
                            icon: Shield,
                            color: '#9333ea',
                            title: 'Ad-Free',
                            description: 'Enjoy an uninterrupted learning experience'
                        },
                        {
                            icon: Sparkles,
                            color: '#FF4B4B',
                            title: 'Early Access',
                            description: 'Be the first to try new features and content'
                        }
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} style={{
                                padding: '30px',
                                border: '2px solid var(--border-color)',
                                borderRadius: 'var(--radius)',
                                backgroundColor: 'var(--surface-color)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.borderColor = item.color;
                                    e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}33`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                <Icon size={48} color={item.color} style={{ marginBottom: '15px' }} />
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 800,
                                    marginBottom: '10px',
                                    color: 'var(--text-color)'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-light)',
                                    fontSize: '0.95rem',
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FAQ Section */}
            <div style={{
                padding: '40px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    marginBottom: '30px',
                    color: 'var(--text-color)'
                }}>
                    Frequently Asked Questions
                </h2>

                {[
                    {
                        q: 'Can I cancel anytime?',
                        a: 'Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.'
                    },
                    {
                        q: 'Is there a free trial?',
                        a: 'We offer a 7-day free trial for new Pro subscribers. No credit card required to start.'
                    },
                    {
                        q: 'What payment methods do you accept?',
                        a: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.'
                    },
                    {
                        q: 'Can I upgrade from Free to Pro?',
                        a: 'Absolutely! You can upgrade at any time and your progress will be preserved.'
                    }
                ].map((faq, index) => (
                    <div key={index} style={{
                        marginBottom: index < 3 ? '25px' : 0,
                        paddingBottom: index < 3 ? '25px' : 0,
                        borderBottom: index < 3 ? '1px solid var(--border-color)' : 'none'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: 800,
                            marginBottom: '10px',
                            color: 'var(--text-color)'
                        }}>
                            {faq.q}
                        </h3>
                        <p style={{
                            color: 'var(--text-light)',
                            margin: 0,
                            lineHeight: 1.6
                        }}>
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
