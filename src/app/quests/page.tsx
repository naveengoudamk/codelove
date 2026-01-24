
"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { CheckCircle2, Lock, FileText, Flame, Gift, Zap, Map, BookOpen, Trophy } from "lucide-react";

// Mock Data for Quests
const quests = [
    {
        id: 1,
        slug: "30-days-of-javascript",
        title: "30 Days of JavaScript",
        description: "Learn JS from scratch to advanced.",
        duration: "30 Days",
        difficulty: "Easy",
        status: "in-progress",
        progress: 12,
        total: 30,
        isPremium: false,
    },
    {
        id: 2,
        slug: "sql-50",
        title: "SQL 50",
        description: "Crack SQL interviews with 50 essential questions.",
        duration: "15 Days",
        difficulty: "Medium",
        status: "not-started",
        progress: 0,
        total: 50,
        isPremium: false,
    },
    {
        id: 3,
        slug: "top-interview-150",
        title: "Top Interview 150",
        description: "Must-do list for interview prep.",
        duration: "Ongoing",
        difficulty: "Medium",
        status: "not-started",
        progress: 0,
        total: 150,
        isPremium: false,
    },
    {
        id: 4,
        slug: "introduction-to-pandas",
        title: "Introduction to Pandas",
        description: "Learn data manipulation with Pandas.",
        duration: "10 Days",
        difficulty: "Easy",
        status: "completed",
        progress: 15,
        total: 15,
        isPremium: false,
    },
    {
        id: 5,
        slug: "dynamic-programming",
        title: "Dynamic Programming Study Plan",
        description: "Master DP with this comprehensive guide.",
        duration: "21 Days",
        difficulty: "Hard",
        status: "not-started",
        progress: 0,
        total: 50,
        isPremium: true,
    },
];

export default function QuestsPage() {
    return (
        <div className={styles.container}>
            {/* Main Content: Quests List */}
            <div className={styles.mainContent}>

                {/* Filters */}
                <div className={styles.filters}>
                    <button className={`${styles.filterBtn} ${styles.active}`}>All Quests</button>
                    <button className={styles.filterBtn}>Study Plans</button>
                    <button className={styles.filterBtn}>Challenges</button>
                    <button className={styles.filterBtn}>Premium</button>
                </div>

                {/* Search */}
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search quests..."
                        className={styles.input}
                    />
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Quest</th>
                                <th className={styles.th}>Duration</th>
                                <th className={styles.th}>Progress</th>
                                <th className={styles.th}>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quests.map((quest) => (
                                <tr key={quest.id} className={styles.row}>
                                    {/* Status */}
                                    <td className={styles.td}>
                                        {quest.status === "completed" ? (
                                            <CheckCircle2 size={18} color="var(--success)" />
                                        ) : quest.status === "in-progress" ? (
                                            <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--warning)' }} />
                                        ) : (
                                            <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)' }} />
                                        )}
                                    </td>

                                    {/* Title & Description */}
                                    <td className={styles.td}>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            {quest.isPremium ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <span style={{ opacity: 0.6 }}>{quest.title}</span>
                                                    <Lock size={14} color="var(--warning)" />
                                                </div>
                                            ) : (
                                                <Link href={`/quests/${quest.slug}`} className={styles.titleLink}>
                                                    {quest.title}
                                                </Link>
                                            )}
                                            <span style={{ fontSize: "0.8rem", color: "#a1a1aa" }}>{quest.description}</span>
                                        </div>
                                    </td>

                                    {/* Duration */}
                                    <td className={styles.td}>{quest.duration}</td>

                                    {/* Progress */}
                                    <td className={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.8rem' }}>
                                                {Math.round((quest.progress / quest.total) * 100)}%
                                            </span>
                                            <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                                <div style={{
                                                    width: `${(quest.progress / quest.total) * 100}%`,
                                                    height: '100%',
                                                    background: 'var(--success)',
                                                    borderRadius: '2px'
                                                }} />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Difficulty */}
                                    <td className={styles.td}>
                                        <span
                                            className={
                                                quest.difficulty === "Easy"
                                                    ? styles.difficultyEasy
                                                    : quest.difficulty === "Medium"
                                                        ? styles.difficultyMedium
                                                        : styles.difficultyHard
                                            }
                                        >
                                            {quest.difficulty}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.widget}>
                    <div className={styles.widgetTitle}>Featured Quest</div>
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <Trophy size={48} color="#fbbf24" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Summer Challenge 2026</h3>
                        <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '1rem' }}>
                            Win exclusive badges and prizes!
                        </p>
                        <button className={styles.solveBtn}>Join Now</button>
                    </div>
                </div>

                <div className={styles.widget}>
                    <div className={styles.widgetTitle}>Your Progress</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span>Easy</span>
                            <span>12 / 50</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span>Medium</span>
                            <span>5 / 80</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span>Hard</span>
                            <span>1 / 20</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
