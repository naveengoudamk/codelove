"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { Mail, Phone, Lock } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (err: any) {
            console.error("OAuth Error:", err);
            setError("Google Sign In failed.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError("");

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                // Sync user logic is now in Layout via UserSyncer, but we can double check or just redirect
                router.push("/");
            } else {
                console.error(JSON.stringify(result, null, 2));
                setError("Login failed. Please check your credentials.");
            }
        } catch (err: any) {
            console.error("Login Error:", err);
            setError(err.errors?.[0]?.message || "Invalid email or password.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome to CodeLove</h1>
                    <p className={styles.subtitle}>Sign in to access premium coding problems.</p>
                </div>

                <div className={styles.authButtons}>
                    <button className={styles.socialBtn} onClick={handleGoogleSignIn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>
                    {/* LinkedIn button removed or kept as is? User didn't ask to remove, but didn't ask to fix. I'll keep it as placeholder or remove functionality. Sticking to User request to add password. I'll keep the button but it won't do anything yet as I don't have linkedIn logic prepared. */}
                    <button className={`${styles.socialBtn} ${styles.linkedinBtn}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        Continue with LinkedIn
                    </button>
                </div>

                <div className={styles.divider}>or</div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>
                            {error}
                        </p>
                    )}

                    <button className={styles.continueBtn} disabled={!isLoaded}>
                        Sign In
                    </button>
                </form>

                <p className={styles.footer}>
                    Don't have an account? <Link href="/register" className={styles.link}>Sign up</Link>
                </p>
            </div>
        </div>
    );
}
