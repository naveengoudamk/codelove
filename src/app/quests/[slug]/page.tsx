
"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { CheckCircle2, Lock, PlayCircle, Award, Star, Share2, ArrowLeft, RefreshCw, Archive, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Mock Data Type
type Question = {
    id: number;
    title: string;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
};

type Module = {
    id: number;
    title: string;
    questions: Question[];
};

type Quest = {
    title: string;
    description: string;
    modules: Module[];
};

const QUEST_DATA: Record<string, Quest> = {
    "30-days-of-javascript": {
        title: "30 Days of JavaScript",
        description: "Master JavaScript from scratch to advanced concepts in 30 days.",
        modules: [
            {
                id: 1,
                title: "Basics & Closures",
                questions: [
                    { id: 1, title: "Create Hello World Function", slug: "create-hello-world-function", difficulty: "Easy" },
                    { id: 2, title: "Counter", slug: "counter", difficulty: "Easy" },
                    { id: 3, title: "To Be Or Not To Be", slug: "to-be-or-not-to-be", difficulty: "Easy" },
                ]
            },
            {
                id: 2,
                title: "Basic Array Transformations",
                questions: [
                    { id: 4, title: "Apply Transform Over Each Element in Array", slug: "apply-transform", difficulty: "Easy" },
                    { id: 5, title: "Filter Elements from Array", slug: "filter-elements", difficulty: "Easy" },
                    { id: 6, title: "Array Reduce Transformation", slug: "array-reduce", difficulty: "Easy" },
                ]
            },
            {
                id: 3,
                title: "Function Transformations",
                questions: [
                    { id: 7, title: "Function Composition", slug: "function-composition", difficulty: "Medium" },
                    { id: 8, title: "Return Length of Arguments Passed", slug: "arguments-length", difficulty: "Medium" },
                    { id: 9, title: "Allow One Function Call", slug: "one-call", difficulty: "Medium" },
                ]
            },
            {
                id: 4,
                title: "Promises and Time",
                questions: [
                    { id: 10, title: "Add Two Promises", slug: "add-two-promises", difficulty: "Easy" },
                    { id: 11, title: "Sleep", slug: "sleep", difficulty: "Easy" },
                    { id: 12, title: "Timeout Cancellation", slug: "timeout-cancellation", difficulty: "Easy" },
                ]
            },
            {
                id: 5,
                title: "Final Hard Challenge",
                questions: [
                    { id: 28, title: "Curry", slug: "curry", difficulty: "Hard" },
                    { id: 29, title: "Flatten Deeply Nested Array", slug: "flatten-array", difficulty: "Medium" },
                    { id: 30, title: "Call Function with Custom Context", slug: "call-context", difficulty: "Hard" },
                ]
            }
        ]
    }
};

const DEFAULT_QUEST: Quest = {
    title: "Unknown Quest",
    description: "This quest could not be found.",
    modules: []
};

export default function QuestDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const quest = QUEST_DATA[slug] || DEFAULT_QUEST;

    // State for tracking progress (persisted in local storage in a real app)
    const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem(`quest_${slug}_progress`);
        if (saved) {
            setSolvedQuestions(JSON.parse(saved));
        } else {
            // Pre-solve some for demo if empty
            const demoSolved = [1, 2, 4];
            setSolvedQuestions(demoSolved);
            localStorage.setItem(`quest_${slug}_progress`, JSON.stringify(demoSolved));
        }
    }, [slug]);

    const toggleSolve = (id: number) => {
        const newSolved = solvedQuestions.includes(id)
            ? solvedQuestions.filter(qId => qId !== id)
            : [...solvedQuestions, id];

        setSolvedQuestions(newSolved);
        localStorage.setItem(`quest_${slug}_progress`, JSON.stringify(newSolved));
    };

    const totalQuestions = quest.modules.reduce((acc, m) => acc + m.questions.length, 0);
    const completedCount = solvedQuestions.length;
    const progress = Math.round((completedCount / totalQuestions) * 100);

    const handleDownloadCertificate = () => {
        alert("Downloading certificate for " + quest.title + "...");
        // In a real app, this would trigger a PDF generation or download
    };

    if (!isClient) return <div className={styles.container}>Loading...</div>;

    return (
        <div className={styles.container}>
            <Link href="/quests" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#a1a1aa' }}>
                <ArrowLeft size={18} /> Back to Quests
            </Link>

            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className={styles.title}>{quest.title}</h1>
                <p className={styles.subtitle}>{quest.description}</p>
            </motion.div>

            {/* Stats */}
            <motion.div
                className={styles.statsGrid}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{completedCount} / {totalQuestions}</div>
                    <div className={styles.statLabel}>Questions Solved</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{progress}%</div>
                    <div className={styles.statLabel}>Completion</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{Math.min(completedCount, 15)}</div>
                    <div className={styles.statLabel}>Current Streak</div>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>Your Progress</span>
                    <span style={{ color: 'var(--success)' }}>{progress}%</span>
                </div>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>
                    Solve all {totalQuestions} questions to earn your certificate of completion.
                </p>
            </div>

            {/* Timeline / Modules */}
            <div className={styles.pathContainer}>
                <div className={styles.pathLine} />

                {quest.modules.map((module, index) => {
                    const moduleCompletedCount = module.questions.filter(q => solvedQuestions.includes(q.id)).length;
                    const isModuleCompleted = moduleCompletedCount === module.questions.length;

                    // Simple logic: Module is locked if previous module not completed (except first)
                    // For demo, we are showing likely "available" but maybe locked visually if we want stricter enforcement.
                    // Here we will just calculate status.

                    return (
                        <motion.div
                            key={module.id}
                            className={styles.module}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.moduleHeader}>
                                <div className={`${styles.moduleIcon} ${isModuleCompleted ? styles.completed : ''}`}>
                                    {isModuleCompleted ? <CheckCircle2 size={24} /> : <span>{index + 1}</span>}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--foreground)' }}>
                                    {module.title}
                                </h3>
                                <span style={{ fontSize: '0.85rem', color: '#a1a1aa', marginLeft: 'auto' }}>
                                    {moduleCompletedCount} / {module.questions.length}
                                </span>
                            </div>

                            <div className={styles.moduleContent}>
                                {module.questions.map((q) => {
                                    const isSolved = solvedQuestions.includes(q.id);
                                    return (
                                        <div key={q.id} className={styles.questionItem}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {isSolved ? (
                                                    <CheckCircle2 size={18} color="var(--success)" />
                                                ) : (
                                                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)' }} />
                                                )}
                                                <Link href={`/problems/${q.slug}`} className={styles.titleLink} style={{ color: isSolved ? 'var(--foreground)' : 'var(--foreground)' }}>
                                                    <span style={{ fontWeight: 500 }}>{q.title}</span>
                                                </Link>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span className={`${styles.difficulty} ${styles[q.difficulty.toLowerCase()]}`}>
                                                    {q.difficulty}
                                                </span>

                                                {/* Demo Toggle Checkbox */}
                                                <button
                                                    onClick={() => toggleSolve(q.id)}
                                                    title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                                                    style={{ padding: '0.2rem', opacity: 0.3, hover: { opacity: 1 } }}
                                                >
                                                    {isSolved ? <Archive size={16} /> : <Check size={16} />}
                                                </button>

                                                <Link href={`/problems/${q.slug}`}>
                                                    <button className={styles.startBtn}>
                                                        {isSolved ? 'Review' : 'Solve'}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Certificate Section */}
            <motion.div
                className={styles.certificateSection}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className={progress < 100 ? styles.certificateBlur : ''}>
                    <Award size={64} color="#eab308" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
                        Certificate of Completion
                    </h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: '#d4d4d4' }}>
                        Successfully complete all {totalQuestions} questions in this quest to receive a signed certificate of achievement verified by CodeLove.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className={styles.claimBtn} onClick={handleDownloadCertificate} disabled={progress < 100}>
                            Download Certificate
                        </button>
                        <button style={{ padding: '0 1rem', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>

                {progress < 100 && (
                    <div className={styles.lockOverlay}>
                        <Lock size={48} color="white" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Certificate Locked</h3>
                        <p>Complete {totalQuestions - completedCount} more problems to unlock.</p>
                    </div>
                )}
            </motion.div>

        </div>
    );
}
