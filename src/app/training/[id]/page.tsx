'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ChatInterface from '@/components/chat/ChatInterface';
import { X } from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import LevelIntro from '@/components/LevelIntro';
import MultipleChoiceTask from '@/components/tasks/MultipleChoiceTask';
import TrueFalseTask from '@/components/tasks/TrueFalseTask';
import FillInBlankTask from '@/components/tasks/FillInBlankTask';
import MatchDefinitionTask from '@/components/tasks/MatchDefinitionTask';
import TrainingSessionLayout from '@/components/TrainingSessionLayout';

function TrainingPageContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id } = params;

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

    // Fetch Descriptors & Tasks on mount
    useEffect(() => {
        const fetchData = async () => {
            if (!name) return;

            // 1. Fetch Descriptors
            setLoadingDescriptors(true);
            let fetchedDescriptors = "";
            try {
                const res = await fetch('/api/generate-descriptors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emotion: name }),
                });
                const data = await res.json();
                if (data.result) {
                    fetchedDescriptors = data.result;
                    setDescriptors(data.result);
                }
            } catch (error) {
                console.error("Failed to fetch descriptors", error);
            } finally {
                setLoadingDescriptors(false);
            }

            // 2. Fetch Tasks (if descriptors found)
            if (fetchedDescriptors) {
                setLoadingTasks(true);
                try {
                    const res = await fetch('/api/generate-tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ emotion: name, descriptors: fetchedDescriptors }),
                    });
                    const data = await res.json();
                    if (data.result) {
                        try {
                            const parsed = JSON.parse(data.result);
                            if (parsed && parsed.tasks) {
                                setTasks(parsed.tasks);
                            }
                        } catch (e) {
                            console.error("Failed to parse tasks", e);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch tasks", error);
                } finally {
                    setLoadingTasks(false);
                }
            }
        };

        fetchData();
    }, [name]);

    const handleTaskComplete = (isCorrect: boolean) => {
        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            // Fix: Use current closure value of activeTaskIndex for update to prevent race conditions (double clicks)
            // causing double increments. i.e. use setActiveTaskIndex(activeTaskIndex + 1) instead of s => s + 1
            if (activeTaskIndex < tasks.length - 1) {
                setActiveTaskIndex(activeTaskIndex + 1);
            } else {
                setTasksComplete(true);
            }
        }, 500);
    };

    // Calculate Progress: Based on Accuracy Score relative to Total Tasks?
    // Or just completion? User asked for "accuracy".
    // Let's do: (Score / Total Tasks) * 100
    const totalTasks = tasks.length || 1; // avoid divide by zero
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

export default function TrainingPage() {
    return (
        <Suspense fallback={<div />}>
            <TrainingPageContent />
        </Suspense>
    );
}
