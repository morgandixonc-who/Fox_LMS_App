'use client';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Heart, Target, Users, Award, BookOpen, Shield } from 'lucide-react';

export default function AboutPage() {
    const { darkMode } = useDarkMode();

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '40px 20px'
        }}>
            {/* Hero Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '60px',
                padding: '40px 20px',
                background: 'linear-gradient(135deg, rgba(255,150,0,0.1) 0%, rgba(0,196,204,0.1) 100%)',
                borderRadius: 'var(--radius)',
                border: '2px solid var(--border-color)'
            }}>
                <Heart size={80} color="var(--primary)" style={{ marginBottom: '20px' }} />
                <h1 className="title" style={{
                    fontSize: '3rem',
                    marginBottom: '20px'
                }}>
                    About Our Platform
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: 'var(--text-light)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    A comprehensive suicide prevention training platform dedicated to saving lives through education and support
                </p>
            </div>

            {/* Mission Section */}
            <div style={{
                marginBottom: '50px',
                padding: '40px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '25px'
                }}>
                    <Target size={40} color="var(--primary)" />
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--text-color)',
                        margin: 0
                    }}>
                        Our Mission
                    </h2>
                </div>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    lineHeight: 1.8,
                    marginBottom: '20px'
                }}>
                    Our platform is dedicated to providing comprehensive, evidence-based suicide prevention training to healthcare professionals, first responders, educators, and community members. We believe that through proper education and training, we can create a network of informed individuals capable of recognizing warning signs, providing immediate support, and connecting those in crisis with life-saving resources.
                </p>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    lineHeight: 1.8,
                    margin: 0
                }}>
                    By combining interactive learning modules, realistic scenario-based training, and ongoing support, we empower our users to make a meaningful difference in their communities and potentially save lives.
                </p>
            </div>

            {/* Cornerstone Whole Health Section */}
            <div style={{
                marginBottom: '50px',
                padding: '40px',
                border: '2px solid var(--secondary)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '25px'
                }}>
                    <Shield size={40} color="var(--secondary)" />
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--text-color)',
                        margin: 0
                    }}>
                        Cornerstone Whole Health
                    </h2>
                </div>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    lineHeight: 1.8,
                    marginBottom: '20px'
                }}>
                    This platform is developed and maintained by <strong>Cornerstone Whole Health</strong>, a leading organization committed to advancing mental health care and suicide prevention initiatives. Cornerstone Whole Health brings together experts in psychology, psychiatry, social work, and crisis intervention to create comprehensive training solutions.
                </p>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    lineHeight: 1.8,
                    margin: 0
                }}>
                    With decades of combined experience in mental health services and community outreach, Cornerstone Whole Health is dedicated to reducing suicide rates through education, awareness, and accessible training programs that reach communities nationwide.
                </p>
            </div>

            {/* FOX Grant Section */}
            <div style={{
                marginBottom: '50px',
                padding: '40px',
                border: '2px solid var(--primary)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--surface-color)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(255,150,0,0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                }} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '25px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <Award size={40} color="var(--primary)" />
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--text-color)',
                        margin: 0
                    }}>
                        The FOX Grant
                    </h2>
                </div>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    This platform is made possible through the generous support of the <strong>FOX Grant</strong>, a federal funding initiative specifically designed to support innovative suicide prevention programs and training platforms. The FOX Grant recognizes the critical need for accessible, high-quality training resources that can reach diverse populations across the country.
                </p>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Through this funding, we are able to provide free and low-cost access to evidence-based training materials, continuously update our curriculum based on the latest research, and expand our reach to underserved communities that need these resources most.
                </p>
                <div style={{
                    padding: '20px',
                    backgroundColor: 'rgba(255,150,0,0.1)',
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--primary)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-color)',
                        margin: 0,
                        fontStyle: 'italic'
                    }}>
                        "The FOX Grant represents a commitment to saving lives through education and empowerment. We are honored to be part of this vital initiative."
                    </p>
                </div>
            </div>

            {/* What We Offer Section */}
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
                    What We Offer
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '25px'
                }}>
                    {[
                        {
                            icon: BookOpen,
                            color: '#00C4CC',
                            title: 'Comprehensive Training',
                            description: 'Evidence-based modules covering risk assessment, intervention techniques, and crisis management'
                        },
                        {
                            icon: Users,
                            color: '#FF9600',
                            title: 'Interactive Scenarios',
                            description: 'Realistic practice scenarios that prepare you for real-world situations'
                        },
                        {
                            icon: Shield,
                            color: '#58CC02',
                            title: 'Ongoing Support',
                            description: 'Access to resources, expert guidance, and a supportive community'
                        }
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} style={{
                                padding: '35px',
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
                                <Icon size={50} color={item.color} style={{ marginBottom: '20px' }} />
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 800,
                                    marginBottom: '15px',
                                    color: 'var(--text-color)'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-light)',
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Crisis Resources */}
            <div style={{
                padding: '40px',
                border: '3px solid var(--error)',
                borderRadius: 'var(--radius)',
                backgroundColor: 'rgba(255, 75, 75, 0.05)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--error)',
                    marginBottom: '20px'
                }}>
                    Crisis Resources
                </h2>
                <p style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-color)',
                    marginBottom: '25px',
                    lineHeight: 1.6
                }}>
                    If you or someone you know is in crisis, help is available 24/7:
                </p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'var(--surface-color)',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)'
                    }}>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: 800,
                            color: 'var(--text-color)',
                            marginBottom: '8px'
                        }}>
                            988 Suicide & Crisis Lifeline
                        </h3>
                        <p style={{
                            fontSize: '2rem',
                            fontWeight: 900,
                            color: 'var(--error)',
                            margin: 0
                        }}>
                            Call or Text: 988
                        </p>
                    </div>
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'var(--surface-color)',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)'
                    }}>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: 800,
                            color: 'var(--text-color)',
                            marginBottom: '8px'
                        }}>
                            Crisis Text Line
                        </h3>
                        <p style={{
                            fontSize: '1.5rem',
                            fontWeight: 900,
                            color: 'var(--secondary)',
                            margin: 0
                        }}>
                            Text HOME to 741741
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}