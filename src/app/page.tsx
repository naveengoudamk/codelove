"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { CheckCircle2, Code2, Cpu, Globe, Terminal, ArrowRight, Play } from "lucide-react";

type Problem = {
  id: number;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  status: "Solved" | "Todo";
};

const problems: Problem[] = [
  { id: 1, title: "Two Sum", slug: "two-sum", difficulty: "Easy", acceptance: "48.2%", status: "Solved" },
  { id: 2, title: "Add Two Numbers", slug: "add-two-numbers", difficulty: "Medium", acceptance: "39.1%", status: "Todo" },
  { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring", difficulty: "Medium", acceptance: "33.5%", status: "Todo" },
  { id: 4, title: "Median of Two Sorted Arrays", slug: "median-of-arrays", difficulty: "Hard", acceptance: "34.2%", status: "Todo" },
  { id: 5, title: "Longest Palindromic Substring", slug: "longest-palindrome", difficulty: "Medium", acceptance: "32.1%", status: "Todo" },
];

export default function Home() {
  const [text, setText] = useState("");
  const fullText = 'print("Welcome to CodeLove")';
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Master the Art of <br /> <span>Algorithms</span>
          </h1>
          <p className={styles.subtitle}>
            Join the elite community of developers mastering data structures and algorithms.
            Practice with premium problems, visualize solutions, and land your dream job.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/problems">
              <button className={styles.ctaButton}>
                Start Coding <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline' }} />
              </button>
            </Link>
            <Link href="/register">
              <button className={styles.secondaryButton}>Create Account</button>
            </Link>
          </div>

          {/* Terminal / Code Box */}
          <div className={styles.terminalContainer}>
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.buttons}>
                  <div className={`${styles.dot} ${styles.red}`} />
                  <div className={`${styles.dot} ${styles.yellow}`} />
                  <div className={`${styles.dot} ${styles.green}`} />
                </div>
                <div className={styles.terminalTitle}>main.py</div>
              </div>
              <div className={styles.terminalBody}>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>def</span> <span className={styles.function}>main</span>():
                </div>
                <div className={styles.codeLine} style={{ paddingLeft: '1.5rem' }}>
                  <span className={styles.comment}># Your journey begins here</span>
                </div>
                <div className={styles.codeLine} style={{ paddingLeft: '1.5rem' }}>
                  {text}<span className={styles.cursor} />
                </div>

                {showOutput && (
                  <div className={styles.codeOutput}>
                    <span>&gt; Welcome to CodeLove! 🚀</span>
                    <br />
                    <span style={{ opacity: 0.7 }}>&gt; Ready to start solving?</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Code2 size={24} />
          </div>
          <h3 className={styles.featureTitle}>Premium Problems</h3>
          <p className={styles.featureDesc}>
            Curated collection of high-quality algorithmic problems targeting top tech company interviews.
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Terminal size={24} />
          </div>
          <h3 className={styles.featureTitle}>Integrated IDE</h3>
          <p className={styles.featureDesc}>
            Powerful Monaco-based code editor with support for multiple languages and themes.
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <Globe size={24} />
          </div>
          <h3 className={styles.featureTitle}>Global Community</h3>
          <p className={styles.featureDesc}>
            Connect with developers worldwide, share solutions, and compete on the leaderboard.
          </p>
        </div>
      </section>

      {/* Problems List */}
      <section className={styles.problemsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Problems</h2>
          <p className={styles.subtitle} style={{ margin: '0 auto', maxWidth: '500px' }}>
            Start with these hand-picked problems to warm up your coding skills.
          </p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem.id}>
                  <td>
                    {problem.status === "Solved" ? (
                      <CheckCircle2 size={18} className={styles.status} />
                    ) : (
                      <div style={{ width: 18, height: 18, border: '1px solid #444', borderRadius: '50%' }} />
                    )}
                  </td>
                  <td>
                    <Link href={`/problems/${problem.slug}`} className={styles.problemLink}>
                      {problem.id}. {problem.title}
                    </Link>
                  </td>
                  <td>
                    <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>{problem.acceptance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
