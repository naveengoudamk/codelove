
"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { CheckCircle2, Lock, PlayCircle, Award, Star, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

// Mock Data based on slugs
const QUEST_DATA = {
    "30-days-of-javascript": {
        title: "30 Days of JavaScript",
        description: "Master JavaScript from scratch to advanced concepts in 30 days.",
        totalQuestions: 30,
        completed: 12,
        modules: [
            {
                id: 1,
                title: "Basics & Closures",
                status: "completed",
                questions: [
                    { id: 1, title: "Create Hello World Function", difficulty: "Easy", status: "solved" },
                    { id: 2, title: "Counter", difficulty: "Easy", status: "solved" },
                    { id: 3, title: "To Be Or Not To Be", difficulty: "Easy", status: "solved" },
                ]
            },
            {
                id: 2,
                title: "Basic Array Transformations",
                status: "in-progress",
                questions: [
                    { id: 4, title: "Apply Transform Over Each Element in Array", difficulty: "Easy", status: "solved" },
                    { id: 5, title: "Filter Elements from Array", difficulty: "Easy", status: "unsolved" },
                    { id: 6, title: "Array Reduce Transformation", difficulty: "Easy", status: "unsolved" },
                ]
            },
            {
                id: 3,
                title: "Function Transformations",
                status: "locked",
                questions: [
                    { id: 7, title: "Function Composition", difficulty: "Medium", status: "locked" },
                    { id: 8, title: "Return Length of Arguments Passed", difficulty: "Medium", status: "locked" },
                    { id: 9, title: "Allow One Function Call", difficulty: "Medium", status: "locked" },
                ]
            },
            {
                id: 4,
                title: "Promises and Time",
                status: "locked",
                questions: [
                    { id: 10, title: "Add Two Promises", difficulty: "Easy", status: "locked" },
                    { id: 11, title: "Sleep", difficulty: "Easy", status: "locked" },
                    { id: 12, title: "Timeout Cancellation", difficulty: "Easy", status: "locked" },
                ]
            },
            {
                id: 5,
                title: "Final Hard Challenge",
                status: "locked",
                isHard: true,
                questions: [
                    { id: 28, title: "Curry", difficulty: "Hard", status: "locked" },
                    { id: 29, title: "Flatten Deeply Nested Array", difficulty: "Medium", status: "locked" },
                    { id: 30, title: "Call Function with Custom Context", difficulty: "Hard", status: "locked" },
                ]
            }
        ]
    }
};

const DEFAULT_QUEST = {
    title: "Unknown Quest",
    description: "This quest could not be found.",
    totalQuestions: 0,
    completed: 0,
    modules: []
};

export default function QuestDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    // cast to any to avoid strict type checking on the mock dictionary keys for now
    const quest = (QUEST_DATA as any)[slug] || DEFAULT_QUEST;
    const progress = Math.round((quest.completed / quest.totalQuestions) * 100);

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
                    <div className={styles.statValue}>{quest.completed} / {quest.totalQuestions}</div>
                    <div className={styles.statLabel}>Questions Solved</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{progress}%</div>
                    <div className={styles.statLabel}>Completion</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>12</div>
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
                    Solve all {quest.totalQuestions} questions to earn your certificate of completion.
                </p>
            </div>

            {/* Timeline / Modules */}
            <div className={styles.pathContainer}>
                <div className={styles.pathLine} />

                {quest.modules.map((module: any, index: number) => (
                    <motion.div
                        key={module.id}
                        className={styles.module}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={styles.moduleHeader}>
                            <div className={`${styles.moduleIcon} ${module.status === 'completed' ? styles.completed : module.status === 'locked' ? styles.locked : ''}`}>
                                {module.status === 'completed' ? <CheckCircle2 size={24} /> : module.status === 'locked' ? <Lock size={20} /> : <span>{index + 1}</span>}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: module.status === 'locked' ? '#737373' : 'var(--foreground)' }}>
                                {module.title}
                            </h3>
                        </div>

                        <div className={styles.moduleContent}>
                            {module.questions.map((q: any) => (
                                <div key={q.id} className={styles.questionItem} style={{ opacity: q.status === 'locked' ? 0.5 : 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {q.status === 'solved' ? (
                                            <CheckCircle2 size={18} color="var(--success)" />
                                        ) : q.status === 'locked' ? (
                                            <Lock size={18} color="var(--border)" />
                                        ) : (
                                            <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)' }} />
                                        )}
                                        <span style={{ fontWeight: 500 }}>{q.title}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span className={`${styles.difficulty} ${styles[q.difficulty.toLowerCase()]}`}>
                                            {q.difficulty}
                                        </span>
                                        {q.status !== 'locked' && (
                                            <button className={styles.startBtn}>
                                                {q.status === 'solved' ? 'Review' : 'Solve'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certificate Section */}
            <motion.div
                className={styles.certificateSection}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className={quest.completed < quest.totalQuestions ? styles.certificateBlur : ''}>
                    <Award size={64} color="#eab308" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
                        Certificate of Completion
                    </h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: '#d4d4d4' }}>
                        Successfully complete all {quest.totalQuestions} questions in this quest to receive a signed certificate of achievement verified by CodeLove.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className={styles.claimBtn}>
                            Download Certificate
                        </button>
                        <button style={{ padding: '0 1rem', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>

                {quest.completed < quest.totalQuestions && (
                    <div className={styles.lockOverlay}>
                        <Lock size={48} color="white" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Certificate Locked</h3>
                        <p>Complete {quest.totalQuestions - quest.completed} more problems to unlock.</p>
                    </div>
                )}
            </motion.div>

        </div>
    );
}
