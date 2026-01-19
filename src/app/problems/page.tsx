import Link from "next/link";
import styles from "./page.module.css";
import { CheckCircle2, Lock, FileText, Flame, Calendar, Gift, Zap } from "lucide-react";

// Mock Data for Problems
const problems = [
    {
        id: 1,
        slug: "two-sum",
        title: "1. Two Sum",
        difficulty: "Easy",
        acceptance: "52.8%",
        status: "solved",
        isPremium: false,
    },
    {
        id: 2,
        slug: "add-two-numbers",
        title: "2. Add Two Numbers",
        difficulty: "Medium",
        acceptance: "43.1%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 3,
        slug: "longest-substring",
        title: "3. Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        acceptance: "35.2%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 4,
        slug: "median-of-two-sorted-arrays",
        title: "4. Median of Two Sorted Arrays",
        difficulty: "Hard",
        acceptance: "41.5%",
        status: "unsolved",
        isPremium: true,
    },
    {
        id: 5,
        slug: "longest-palindromic-substring",
        title: "5. Longest Palindromic Substring",
        difficulty: "Medium",
        acceptance: "34.1%",
        status: "solved",
        isPremium: false,
    },
    {
        id: 6,
        slug: "zigzag-conversion",
        title: "6. Zigzag Conversion",
        difficulty: "Medium",
        acceptance: "48.2%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 7,
        slug: "reverse-integer",
        title: "7. Reverse Integer",
        difficulty: "Medium",
        acceptance: "28.9%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 11,
        slug: "container-with-most-water",
        title: "11. Container With Most Water",
        difficulty: "Medium",
        acceptance: "56.4%",
        status: "solved",
        isPremium: false,
    },
    {
        id: 42,
        slug: "trapping-rain-water",
        title: "42. Trapping Rain Water",
        difficulty: "Hard",
        acceptance: "62.1%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 20,
        slug: "valid-parentheses",
        title: "20. Valid Parentheses",
        difficulty: "Easy",
        acceptance: "40.3%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 21,
        slug: "merge-two-sorted-lists",
        title: "21. Merge Two Sorted Lists",
        difficulty: "Easy",
        acceptance: "61.8%",
        status: "solved",
        isPremium: false,
    },
    {
        id: 53,
        slug: "maximum-subarray",
        title: "53. Maximum Subarray",
        difficulty: "Medium",
        acceptance: "50.0%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 70,
        slug: "climbing-stairs",
        title: "70. Climbing Stairs",
        difficulty: "Easy",
        acceptance: "52.2%",
        status: "solved",
        isPremium: false,
    },
    {
        id: 121,
        slug: "best-time-to-buy-and-sell-stock",
        title: "121. Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        acceptance: "54.4%",
        status: "unsolved",
        isPremium: false,
    },
    {
        id: 206,
        slug: "reverse-linked-list",
        title: "206. Reverse Linked List",
        difficulty: "Easy",
        acceptance: "72.3%",
        status: "solved",
        isPremium: false,
    },
];

const trendingCompanies = [
    { name: "Google", count: 2192 },
    { name: "Meta", count: 1373 },
    { name: "Bloomberg", count: 1161 },
    { name: "Microsoft", count: 1327 },
    { name: "Amazon", count: 1911 },
];

export default function ProblemsPage() {
    return (
        <div className={styles.container}>
            {/* Main Content: Problems List */}
            <div className={styles.mainContent}>

                {/* Filters */}
                <div className={styles.filters}>
                    <button className={`${styles.filterBtn} ${styles.active}`}>All Topics</button>
                    <button className={styles.filterBtn}>Algorithms</button>
                    <button className={styles.filterBtn}>Database</button>
                    <button className={styles.filterBtn}>Shell</button>
                    <button className={styles.filterBtn}>Concurrency</button>
                    <button className={styles.filterBtn}>JavaScript</button>
                </div>

                {/* Search */}
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search questions"
                        className={styles.input}
                    />
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Title</th>
                                <th className={styles.th}>Solution</th>
                                <th className={styles.th}>Acceptance</th>
                                <th className={styles.th}>Difficulty</th>
                                <th className={styles.th}>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem) => (
                                <tr key={problem.id} className={styles.row}>
                                    {/* Status */}
                                    <td className={styles.td}>
                                        {problem.status === "solved" ? (
                                            <CheckCircle2 size={18} color="var(--success)" />
                                        ) : (
                                            <div style={{ width: 18, height: 18 }} /> // Spacer
                                        )}
                                    </td>

                                    {/* Title */}
                                    <td className={styles.td}>
                                        {problem.isPremium ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.6 }}>
                                                <span>{problem.title}</span>
                                                <Lock size={14} color="var(--warning)" />
                                            </div>
                                        ) : (
                                            <Link href={`/problems/${problem.slug}`} className={styles.titleLink}>
                                                {problem.title}
                                            </Link>
                                        )}
                                    </td>

                                    {/* Solution Icon */}
                                    <td className={styles.td}>
                                        <FileText size={16} color="var(--primary)" style={{ opacity: 0.7 }} />
                                    </td>

                                    {/* Acceptance */}
                                    <td className={styles.td}>{problem.acceptance}</td>

                                    {/* Difficulty */}
                                    <td className={styles.td}>
                                        <span
                                            className={
                                                problem.difficulty === "Easy"
                                                    ? styles.difficultyEasy
                                                    : problem.difficulty === "Medium"
                                                        ? styles.difficultyMedium
                                                        : styles.difficultyHard
                                            }
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </td>

                                    {/* Frequency (Locked) */}
                                    <td className={styles.td}>
                                        <Lock size={16} color="var(--border)" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className={styles.sidebar}>
                {/* Daily Streak Widget */}
                <div className={`${styles.widget} ${styles.streakWidget}`}>
                    <div className={styles.widgetTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24' }}>
                            <Flame size={20} fill="#fbbf24" />
                            <span>Daily Streak</span>
                        </div>
                    </div>
                    <div className={styles.streakContent}>
                        <div className={styles.streakCount}>18</div>
                        <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#a1a1aa' }}>
                            <div>Current Streak</div>
                            <div style={{ fontSize: '0.8rem' }}>Keep it up!</div>
                        </div>
                    </div>
                    <button className={styles.solveBtn}>
                        <Zap size={18} />
                        Solve Daily Problem
                    </button>
                </div>

                {/* Monthly Gift Widget */}
                <div className={`${styles.widget} ${styles.giftWidget}`}>
                    <div className={styles.giftHeader}>
                        <div className={styles.widgetTitle} style={{ margin: 0 }}>Monthly Goal</div>
                        <Gift size={20} color="var(--primary)" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        <span>18 / 30 Days</span>
                        <span style={{ color: 'var(--success)' }}>60%</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '60%' }} />
                    </div>
                    <div className={styles.giftFooter}>
                        <div className={`${styles.giftBox} ${false ? styles.active : ''}`} title="Complete 30 days to unlock!">
                            <Gift size={20} color={false ? 'white' : 'var(--foreground)'} />
                        </div>
                    </div>
                </div>

                {/* Calendar / Day placeholder */}
                <div className={styles.widget}>
                    <div className={styles.widgetTitle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>January 2026</span>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {/* Simple calendar visualization items */}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    background: i < 18 ? 'var(--success)' : i === 18 ? 'var(--warning)' : 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    color: i < 18 ? 'black' : 'inherit'
                                }}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}
