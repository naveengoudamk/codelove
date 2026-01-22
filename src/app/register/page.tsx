"use client";

import Link from "next/link";
import styles from "../login/page.module.css";
import registerStyles from "./register.module.css";
import { Mail, User, AtSign, Check, X, Loader2, Lock, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { checkUsernameAvailability } from "@/actions/user"; // Still useful for pre-check
import { syncUser } from "@/actions/auth";

export default function RegisterPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [error, setError] = useState("");

    // Check Username Availability (Local + Clerk API check via Server Action)
    useEffect(() => {
        const checkUsername = async () => {
            // Only check if it looks like a valid username
            if (form.username.length > 2) {
                setIsChecking(true);
                const available = await checkUsernameAvailability(form.username);
                setIsUsernameAvailable(available);
                setIsChecking(false);
            } else {
                setIsUsernameAvailable(null);
            }
        };

        const timer = setTimeout(checkUsername, 500);
        return () => clearTimeout(timer);
    }, [form.username]);

    // Handle Submit: Create User in Clerk
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isLoaded) return;
        if (isUsernameAvailable === false) return;

        try {
            await signUp.create({
                username: form.username,
                emailAddress: form.email,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
            });

            // If successful, send verification code
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerifying(true);
        } catch (err: any) {
            console.error("Sign Up Error:", err);
            setError(err.errors?.[0]?.message || "Failed to create account. Please check your inputs.");
        }
    };

    // Handle OTP Verify
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                // Sync with local DB
                await syncUser();
                router.push("/");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setError("Verification failed. Please try again.");
            }
        } catch (err: any) {
            console.error("Verification Error:", err);
            setError(err.errors?.[0]?.message || "Invalid verification code.");
        }
    };

    if (verifying) {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Verify Email</h1>
                        <p className={styles.subtitle}>Enter the code sent to {form.email}</p>
                    </div>

                    <form className={styles.form} onSubmit={handleVerify}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Verification Code</label>
                            <div className={styles.inputWrapper}>
                                <Key size={18} />
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="123456"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className={registerStyles.messageError}>{error}</p>}
                        <button type="submit" className={styles.continueBtn}>
                            Verify & Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Join CodeLove</h1>
                    <p className={styles.subtitle}>Create an account to start your journey.</p>
                </div>

                <div className={styles.authButtons}>
                    {/* Note: Connecting OAuth requires using signIn.create({ strategy: 'oauth_google' }) or similar, 
                         or using the <SignUp /> component. For custom forms, it involves a different flow. 
                         For now, focusing on Manual implementation. */}
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Full Name</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <div className={styles.inputWrapper}>
                                <User size={18} />
                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                    placeholder="First Name"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                    placeholder="Last Name"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                        <label className={styles.label}>Username (Unique ID)</label>
                        <div className={styles.inputWrapper}>
                            <AtSign size={18} />
                            <input
                                name="username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                placeholder="unique_id"
                                className={styles.input}
                                required
                                minLength={4}
                            />
                            {isChecking && <Loader2 size={16} className={`${registerStyles.statusIcon} ${registerStyles.spin} `} />}
                            {!isChecking && form.username.length > 2 && isUsernameAvailable === true && <Check size={16} className={`${registerStyles.statusIcon} ${registerStyles.success} `} />}
                            {!isChecking && form.username.length > 2 && isUsernameAvailable === false && <X size={16} className={`${registerStyles.statusIcon} ${registerStyles.error} `} />}
                        </div>
                        {!isChecking && form.username.length > 2 && isUsernameAvailable === false && (
                            <p className={registerStyles.errorMessage}>Username is already taken</p>
                        )}
                    </div>

                    <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                        <label className={styles.label}>Email</label>
                        <div className={styles.inputWrapper}>
                            <Mail size={18} />
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Create a strong password"
                                className={styles.input}
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className={registerStyles.messageError} style={{ marginTop: '1rem' }}>
                            {error}
                        </p>
                    )}

                    <button
                        className={styles.continueBtn}
                        style={{ marginTop: '1.5rem' }}
                        disabled={!isLoaded || isChecking || isUsernameAvailable === false}
                    >
                        Create Account
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link href="/login" className={styles.link}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

