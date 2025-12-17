'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import LevelIntro from '@/components/LevelIntro';
import TrainingSessionLayout from '@/components/TrainingSessionLayout';

// Mock tasks for testing without API calls
const MOCK_TASKS = [
    {
        type: 'multiple_choice',
        question: "Which of the following is the BEST way to de-escalate a heated situation?",
        options: [
            "Shout louder than the other person",
            "Remain calm and use a low, steady voice",
            "Ignore them and walk away immediately",
            "Tell them they are being irrational"
        ],
        correct_answer: "Remain calm and use a low, steady voice"
    },
    {
        type: 'true_false',
        question: "When feeling overwhelmed, it is helpful to verify safely with a trusted colleague.",
        answer: true
    },
    {
        type: 'fill_in_blank',
        question: "Active _____ is a key skill in demonstrating empathy.",
        correct_answer: "listening",
        options: ["listening", "speaking", "ignoring", "judging"]
    },
    {
        type: 'match_definition',
        pairs: [
            { term: "Empathy", definition: "Understanding another's feelings" },
            { term: "Sympathy", definition: "Feeling pity for someone" },
            { term: "Apathy", definition: "Lack of interest or concern" }
        ]
    }
];

function UiTestPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showIntro, setShowIntro] = useState(true);
    const [descriptors, setDescriptors] = useState<string | null>(null);
    const [loadingDescriptors, setLoadingDescriptors] = useState(false);

    // Task State
    const [tasks, setTasks] = useState<any[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [activeTaskIndex, setActiveTaskIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [tasksComplete, setTasksComplete] = useState(false);

    const hue = parseInt(searchParams.get('hue') || '0', 10);
    const color = searchParams.get('color') || '#fcd34d'; // Default yellow if no param
    const name = searchParams.get('name') || 'Empathy';

    // Simulate loading with mock data (no API calls)
    useEffect(() => {
        const loadMockData = async () => {
            if (!name) return;

            // 1. Simulate loading descriptors
            setLoadingDescriptors(true);
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
            const mockDescriptor = `I feel like I'm experiencing ${name.toLowerCase()} right now and I don't know how to handle it.`;
            setDescriptors(mockDescriptor);
            setLoadingDescriptors(false);

            // 2. Simulate loading tasks
            setLoadingTasks(true);
            await new Promise(resolve => setTimeout(resolve, 600)); // Simulate delay
            setTasks(MOCK_TASKS);
            setLoadingTasks(false);
        };

        loadMockData();
    }, [name]);

    const handleTaskComplete = (isCorrect: boolean) => {
        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            if (activeTaskIndex < tasks.length - 1) {
                setActiveTaskIndex(activeTaskIndex + 1);
            } else {
                setTasksComplete(true);
            }
        }, 500);
    };

    // Calculate Progress
    const totalTasks = tasks.length || 1;
    const progressPercent = Math.min(100, Math.round((score / totalTasks) * 100));

    return (
        <>
            {showIntro && (
                <LevelIntro
                    targetColor={color}
                    emotionName={name}
                    hue={hue}
                    onClose={() => router.push('/dashboard')}
                    onStart={() => setShowIntro(false)}
                />
            )}

            <TrainingSessionLayout
                color={color}
                emotionName={name}
                emoji="😐"
                descriptors={descriptors}
                loadingDescriptors={loadingDescriptors}
                tasks={tasks}
                loadingTasks={loadingTasks}
                activeTaskIndex={activeTaskIndex}
                tasksComplete={tasksComplete}
                score={score}
                onTaskComplete={handleTaskComplete}
                onQuit={() => router.push('/dashboard')}
            />
        </>
    );
}

export default function UiTestPage() {
    return (
        <Suspense fallback={<div />}>
            <UiTestPageContent />
        </Suspense>
    );
}
