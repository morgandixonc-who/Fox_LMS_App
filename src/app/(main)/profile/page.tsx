'use client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
            <h1 className="title">Profile</h1>

            {/* Account Section */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ marginBottom: '20px' }}>Account</h2>
                <div style={{
                    padding: '20px',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius)',
                    marginBottom: '20px'
                }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Username</label>
                        <div style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--surface-color)'
                        }}>
                            DrFox
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Email</label>
                        <div style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--surface-color)'
                        }}>
                            fox@example.com
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div>
                <h2 style={{ marginBottom: '20px' }}>Subscription</h2>
                <div style={{
                    padding: '30px',
                    backgroundColor: '#fffbe6', /* Light yellow/gold */
                    border: '2px solid var(--primary)',
                    borderRadius: 'var(--radius)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>Fox Training Pro</h3>
                    <p style={{ marginBottom: '20px' }}>Unlock unlimited practice scenarios and advanced AI personas.</p>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={() => router.push('/subscription')}
                    >
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        </div>
    );

}