import Link from "next/link";
import styles from "./page.module.css";
import { CheckCircle2 } from "lucide-react";

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
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Master the Art of <br /> <span>Algorithms</span>
        </h1>
        <p className={styles.subtitle}>
          Join the community of developers mastering data structures and algorithms.
          Practice with premium problems and land your dream job.
        </p>
        <button className={styles.ctaButton}>Start Coding Now</button>
      </section>

      <section className={styles.problemsSection}>
        <h2 className={styles.sectionTitle}>Popular Problems</h2>
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
                  ) : null}
                </td>
                <td>
                  <Link href={`/problems/${problem.slug}`} className="hover:text-primary transition-colors">
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
      </section>
    </main>
  );
}
