'use client';

import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <h1 className="title">Create Account</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '300px' }}>
                <input
                    type="text"
                    placeholder="Full Name"
                    style={{ padding: '12px', borderRadius: 'var(--radius)', border: '2px solid var(--border-color)' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    style={{ padding: '12px', borderRadius: 'var(--radius)', border: '2px solid var(--border-color)' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={{ padding: '12px', borderRadius: 'var(--radius)', border: '2px solid var(--border-color)' }}
                />
                <button className="btn btn-primary" type="button" onClick={() => router.push('/dashboard')}>
                    Sign Up
                </button>
            </form>
            <p style={{ marginTop: '20px' }}>
                <a href="/login" style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>I have an account</a>
            </p>
        </div>
    );
}
