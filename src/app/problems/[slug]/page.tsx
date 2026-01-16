import styles from "./page.module.css";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

// Mock data
const problemsMap: Record<string, any> = {
    "two-sum": {
        title: "1. Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers* such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`
`,
        defaultCode: `function twoSum(nums, target) {
  // Write your code here
  
};`
    },
    "default": {
        title: "Problem Not Found",
        difficulty: "Unknown",
        description: "The problem you are looking for does not exist.",
        defaultCode: "// Problem not found"
    }
};

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const problem = problemsMap[slug] || problemsMap["default"];

    return (
        <div className={styles.workspace}>
            <div className={styles.leftPanel}>
                <div className={styles.panelHeader}>
                    <div className={styles.panelTitle}>
                        <span className={`${styles.tab} ${styles.active}`}>Description</span>
                        <span className={styles.tab}>Editorial</span>
                        <span className={styles.tab}>Solutions</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <h1 className={styles.problemTitle}>{problem.title}</h1>
                    <span className={styles.difficulty} style={{
                        color: problem.difficulty === 'Easy' ? 'var(--success)' :
                            problem.difficulty === 'Medium' ? 'var(--warning)' : 'var(--error)'
                    }}>
                        {problem.difficulty}
                    </span>
                    <div className={styles.description}>
                        <ReactMarkdown>{problem.description}</ReactMarkdown>
                    </div>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.panelHeader}>
                    <div className={styles.panelTitle}>
                        <span>JavaScript</span>
                    </div>
                </div>
                <div className={styles.editorContainer}>
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue={problem.defaultCode}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>
                <div className={styles.actionBar}>
                    <button className={styles.runBtn}>Run</button>
                    <button className={styles.submitBtn}>Submit</button>
                </div>
            </div>
        </div>
    );
}
