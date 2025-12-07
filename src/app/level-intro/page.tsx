'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import LevelIntro from '@/components/LevelIntro';
import { Suspense } from 'react';

function LevelIntroContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const name = searchParams.get('name') || 'Unknown Level';
    const color = searchParams.get('color') || '#8b5cf6'; // Default purple
    const hue = parseInt(searchParams.get('hue') || '0', 10);
    const id = searchParams.get('id') || '1'; // Default to 1 if missing

    const handleClose = () => {
        // Navigate back to the Dashboard (or wherever the flow dictates next)
        router.push(`/training/${id}`);
    };

    return (
        <LevelIntro
            emotionName={name}
            targetColor={color}
            hue={hue}
            onClose={handleClose}
        />
    );
}

export default function LevelIntroPage() {
    return (
        <Suspense fallback={<div style={{ background: '#000', height: '100vh' }} />}>
            <LevelIntroContent />
        </Suspense>
    );
}
