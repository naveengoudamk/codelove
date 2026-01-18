"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { Play, Send, ChevronDown, CheckCircle2, XCircle, Terminal } from "lucide-react";
import styles from "@/app/problems/[slug]/page.module.css";

type Problem = {
    title: string;
    difficulty: string;
    description: string;
    defaultCode: Record<string, string>;
};

const languages = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
];

export default function Workspace({ problem }: { problem: Problem }) {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(problem.defaultCode["javascript"]);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<{ status: "idle" | "success" | "error"; message: string } | null>(null);
    const [activeTab, setActiveTab] = useState("description");

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        // In a real app, you might want to switch the code template too if it hasn't been modified
        setCode(problem.defaultCode[newLang] || "// Code here");
    };

    const handleRun = () => {
        setIsRunning(true);
        setOutput(null);

        // Simulate execution delay
        setTimeout(() => {
            setIsRunning(false);
            // Mock random success/failure
            const isSuccess = Math.random() > 0.3;
            if (isSuccess) {
                setOutput({
                    status: "success",
                    message: "Runtime: 56 ms\nMemory: 42.1 MB\n\nTest Cases: 3/3 Passed"
                });
            } else {
                setOutput({
                    status: "error",
                    message: "Runtime Error\n\nInput: [2, 7, 11, 15], 9\nExpected: [0, 1]\nOutput: undefined"
                });
            }
        }, 1500);
    };

    const handleSubmit = () => {
        setIsRunning(true);
        setOutput(null);

        setTimeout(() => {
            setIsRunning(false);
            setOutput({
                status: "success",
                message: "Accepted\n\nRuntime: 56 ms (Beats 82.14%)\nMemory: 42.1 MB (Beats 45.3%)"
            });
        }, 2000);
    };

    return (
        <div className={styles.workspace}>
            {/* Left Panel: Description */}
            <div className={styles.leftPanel}>
                <div className={styles.panelHeader}>
                    <div className={styles.panelTitle}>
                        <span
                            className={`${styles.tab} ${activeTab === "description" ? styles.active : ""}`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </span>
                        <span
                            className={`${styles.tab} ${activeTab === "editorial" ? styles.active : ""}`}
                            onClick={() => setActiveTab("editorial")}
                        >
                            Editorial
                        </span>
                        <span
                            className={`${styles.tab} ${activeTab === "solutions" ? styles.active : ""}`}
                            onClick={() => setActiveTab("solutions")}
                        >
                            Solutions
                        </span>
                    </div>
                </div>
                <div className={styles.content}>
                    {activeTab === "description" && (
                        <>
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
                        </>
                    )}
                    {activeTab !== "description" && (
                        <div style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
                            Content not available in this demo.
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Editor */}
            <div className={styles.rightPanel}>
                <div className={styles.panelHeader}>
                    <div className={styles.languageSelector}>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className={styles.select}
                        >
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className={styles.selectIcon} />
                    </div>
                </div>

                <div className={styles.editorContainer}>
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>

                {/* Output Console (if active) */}
                {output && (
                    <div className={`${styles.console} ${output.status === "error" ? styles.errorConsole : styles.successConsole}`}>
                        <div className={styles.consoleHeader}>
                            {output.status === "success" ? (
                                <span className={styles.successText}><CheckCircle2 size={16} /> Accepted</span>
                            ) : (
                                <span className={styles.errorText}><XCircle size={16} /> Error</span>
                            )}
                            <button onClick={() => setOutput(null)} className={styles.closeConsoleBtn}>×</button>
                        </div>
                        <pre className={styles.consoleOutput}>{output.message}</pre>
                    </div>
                )}

                <div className={styles.actionBar}>
                    {/* Console Button toggle could go here */}
                    <div style={{ flex: 1 }}>
                        <button className={styles.consoleToggle} onClick={() => setOutput(prev => prev ? null : { status: "idle", message: "Console ready..." })}>
                            <Terminal size={14} /> Console
                        </button>
                    </div>

                    <button className={styles.runBtn} onClick={handleRun} disabled={isRunning}>
                        <Play size={14} fill="currentColor" /> {isRunning ? "Running..." : "Run"}
                    </button>
                    <button className={styles.submitBtn} onClick={handleSubmit} disabled={isRunning}>
                        {isRunning ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
