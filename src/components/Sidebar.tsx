'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, User, Settings, LogOut, Shield, Flame, Zap, Trophy } from 'lucide-react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const pathname = usePathname();
    const { darkMode } = useDarkMode();

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <Image
                    src={darkMode ? "/assets/logoflat-light.png" : "/assets/logoflat.png"}
                    alt="Fox Training"
                    width={200}
                    height={60}
                    style={{ objectFit: 'contain', width: 'auto', height: '60px' }}
                    priority
                />
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                <Link href="/dashboard" className={`${styles.navItem} ${isActive('/dashboard') ? styles.navItemActive : ''}`}>
                    <Home size={32} strokeWidth={isActive('/dashboard') ? 3 : 2.5} />
                    <span className={styles.navText}>Learn</span>
                </Link>
                <Link href="/practice" className={`${styles.navItem} ${isActive('/practice') ? styles.navItemActive : ''}`}>
                    <Dumbbell size={32} strokeWidth={isActive('/practice') ? 3 : 2.5} />
                    <span className={styles.navText}>Practice</span>
                </Link>
                <Link href="/leaderboard" className={`${styles.navItem} ${isActive('/leaderboard') ? styles.navItemActive : ''}`}>
                    <Trophy size={32} strokeWidth={isActive('/leaderboard') ? 3 : 2.5} />
                    <span className={styles.navText}>Leaderboard</span>
                </Link>
                <Link href="/profile" className={`${styles.navItem} ${isActive('/profile') ? styles.navItemActive : ''}`}>
                    <User size={32} strokeWidth={isActive('/profile') ? 3 : 2.5} />
                    <span className={styles.navText}>Profile</span>
                </Link>
                <Link href="/settings" className={`${styles.navItem} ${isActive('/settings') ? styles.navItemActive : ''}`}>
                    <Settings size={32} strokeWidth={isActive('/settings') ? 3 : 2.5} />
                    <span className={styles.navText}>Settings</span>
                </Link>
            </nav>

            {/* Widgets in Sidebar */}
            <div className={styles.widgetContainer}>
                {/* Streak */}
                <Link href="/streak" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.widget} style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,150,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <div className={styles.widgetHeader}>
                            <span>Streak</span>
                            <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Flame size={20} fill="currentColor" /> 5
                            </span>
                        </div>
                        {/* Simplified Streak Row for Sidebar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-light)' }}>
                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>
                    </div>
                </Link>


                {/* Daily Quests */}
                <Link href="/quests" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.widget} style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        <div className={styles.widgetHeader}>
                            <span>Daily Quests</span>
                        </div>
                        <div className={styles.questItem}>
                            <div className={styles.questIcon} style={{ backgroundColor: '#FFD700' }}>
                                <Zap size={18} fill="white" color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Earn 50 XP</div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: '40%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* League */}
                <div className={styles.widget}>
                    <div className={styles.widgetHeader}>
                        <span>League</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Trophy size={32} color="#9333ea" />
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>#5 Amethyst</div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Link href="/" className={styles.navItem}>
                    <LogOut size={32} strokeWidth={2.5} />
                    <span className={styles.navText}>Logout</span>
                </Link>
            </div>
        </aside>
    );
}
