'use client';
import { useDarkMode } from '@/contexts/DarkModeContext';

export default function SettingsPage() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
            <h1 className="title">Settings</h1>

            {/* Appearance Section */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '20px' }}>Appearance</h2>
                <div style={{
                    padding: '20px',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--surface-color)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontWeight: 'bold',
                                marginBottom: '4px',
                                fontSize: '1.1rem'
                            }}>
                                Dark Mode
                            </label>
                            <p style={{
                                color: 'var(--text-light)',
                                fontSize: '0.9rem',
                                margin: 0
                            }}>
                                Switch between light and dark theme
                            </p>
                        </div>

                        {/* Toggle Switch */}
                        <div
                            onClick={toggleDarkMode}
                            style={{
                                width: '60px',
                                height: '32px',
                                backgroundColor: darkMode ? 'var(--primary)' : '#ccc',
                                borderRadius: '16px',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                flexShrink: 0,
                                marginLeft: '20px'
                            }}
                        >
                            <div style={{
                                width: '26px',
                                height: '26px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '3px',
                                left: darkMode ? '31px' : '3px',
                                transition: 'left 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div style={{
                padding: '20px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                textAlign: 'center',
                backgroundColor: 'var(--surface-color)'
            }}>
                <p style={{ color: 'var(--text-light)', margin: 0 }}>
                    Account and subscription settings have been moved to the Profile page.
                </p>
            </div>
        </div>
    );
}
