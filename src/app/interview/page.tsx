
"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { CheckCircle2, Lock, Clock, Building, Briefcase, PlayCircle } from "lucide-react";
import { useState } from "react";

// Mock Data for Interviews
const interviews = [
    {
        id: 1,
        type: "Online Assessment",
        company: "Google",
        title: "Google Online Assessment (Early Career)",
        duration: "90 mins",
        questions: 2,
        status: "pending",
        difficulty: "Medium",
    },
    {
        id: 2,
        type: "Assignment",
        company: "Amazon",
        title: "Amazon SDE 1 Coding Assignment",
        duration: "70 mins",
        questions: 2,
        status: "completed",
        difficulty: "Medium",
    },
    {
        id: 3,
        type: "Online Assessment",
        company: "Meta",
        title: "Meta Recruiting Screening",
        duration: "45 mins",
        questions: 15,
        status: "pending",
        difficulty: "Hard",
    },
    {
        id: 4,
        type: "Mock Interview",
        company: "Peer",
        title: "Mock Interview with Peer",
        duration: "60 mins",
        questions: 1,
        status: "upcoming",
        difficulty: "N/A",
    },
    {
        id: 5,
        type: "Assignment",
        company: "Netflix",
        title: "Netflix System Design Assignment",
        duration: "120 mins",
        questions: 1,
        status: "pending",
        difficulty: "Hard",
    },
    {
        id: 6,
        type: "Online Assessment",
        company: "Microsoft",
        title: "Microsoft Codility Test",
        duration: "60 mins",
        questions: 3,
        status: "pending",
        difficulty: "Easy",
    },
];

export default function InterviewPage() {
    const [activeTab, setActiveTab] = useState("All");

    const filteredInterviews = activeTab === "All"
        ? interviews
        : interviews.filter(i => i.type === activeTab || (activeTab === "Assessment" && i.type === "Online Assessment"));

    return (
        <div className={styles.container}>
            {/* Main Content */}
            <div className={styles.mainContent}>

                {/* Header */}
                <div style={{ marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Interview Preparation</h1>
                    <p style={{ color: '#a1a1aa' }}>Ace your upcoming online assessments and assignments.</p>
                </div>

                {/* Filters/Tabs */}
                <div className={styles.filters}>
                    {["All", "Online Assessment", "Assignment", "Mock Interview"].map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.filterBtn} ${activeTab === tab ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Title</th>
                                <th className={styles.th}>Company</th>
                                <th className={styles.th}>Type</th>
                                <th className={styles.th}>Time Limit</th>
                                <th className={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInterviews.map((interview) => (
                                <tr key={interview.id} className={styles.row}>
                                    {/* Status */}
                                    <td className={styles.td}>
                                        {interview.status === "completed" ? (
                                            <CheckCircle2 size={18} color="var(--success)" />
                                        ) : interview.status === "upcoming" ? (
                                            <Clock size={18} color="var(--warning)" />
                                        ) : (
                                            <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)' }} />
                                        )}
                                    </td>

                                    {/* Title */}
                                    <td className={styles.td}>
                                        <div style={{ fontWeight: 500 }}>{interview.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>
                                            {interview.questions} Question{interview.questions > 1 ? 's' : ''} • {interview.difficulty}
                                        </div>
                                    </td>

                                    {/* Company */}
                                    <td className={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Building size={14} color="#a1a1aa" />
                                            <span>{interview.company}</span>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className={styles.td}>
                                        <span
                                            style={{
                                                fontSize: '0.8rem',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '12px',
                                                background: interview.type === 'Online Assessment' ? 'rgba(59, 130, 246, 0.1)' : interview.type === 'Assignment' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                                color: interview.type === 'Online Assessment' ? '#60a5fa' : interview.type === 'Assignment' ? '#c084fc' : '#fde047'
                                            }}
                                        >
                                            {interview.type}
                                        </span>
                                    </td>

                                    {/* Duration */}
                                    <td className={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Clock size={14} />
                                            {interview.duration}
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td className={styles.td}>
                                        {interview.status === "completed" ? (
                                            <span style={{ color: "var(--success)" }}>Reviewed</span>
                                        ) : (
                                            <button className={styles.solveBtn} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: 'auto' }}>
                                                <PlayCircle size={16} /> Start
                                            </button>
                                        )}
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
                    <div className={styles.widgetTitle}>Mock Interview</div>
                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '1rem' }}>
                        Practice with peers or expert interviewers.
                    </p>
                    <button className={styles.solveBtn} style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                        Schedule Mock
                    </button>
                </div>

                <div className={styles.widget}>
                    <div className={styles.widgetTitle}>My Stats</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Assessments Passed</span>
                        <span style={{ color: 'var(--success)' }}>12</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Avg. Score</span>
                        <span>85%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
