'use client';
import { useRouter } from 'next/navigation';

export default function AboutPage(){
    const router = useRouter();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: '#000', minHeight: '100vh' }}>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px', pointerEvents: 'none' }}>
                <h1 className="title" style={{
                    color: 'white',
                    textShadow: '0 4px 0 #000',
                    margin: 0,
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0,0,127,0.5)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                }}>
                    PRACTICE
                </h1>
            </header>

        </div>
    );

}