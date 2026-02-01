"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { MapPin, Link as LinkIcon, Github, Edit2, X, Save, Camera, Linkedin, Twitter, Instagram, Code2, Settings, Trophy, Flame, Target } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import ContributionGraph from "./ContributionGraph";
import styles from "./ProfileView.module.css";

// Type definition for the profile user
interface ProfileUser {
    id: string;
    username?: string | null;
    fullName?: string | null;
    imageUrl: string;
    publicMetadata?: Record<string, unknown>;
}

interface ProfileViewProps {
    profileUser: ProfileUser;
    isOwner: boolean;
    submissions?: any[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1] as any // Cubic-bezier for smooth finish
        }
    }
};

const CircularProgress = ({ val, total, color }: { val: number; total: number; color: string }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (val / total);
    const offset = circumference - progress * circumference;

    return (
        <div className={styles.progressCircleWrapper}>
            <svg className={styles.progressCircleSvg} width="120" height="120" viewBox="0 0 120 120">
                <circle className={styles.progressCircleBg} cx="60" cy="60" r={radius} />
                <motion.circle
                    className={styles.progressCircleValue}
                    cx="60"
                    cy="60"
                    r={radius}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ strokeDasharray: circumference, stroke: color }}
                />
            </svg>
            <div className={styles.progressCircleText}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.solvedCount}
                >
                    {val}
                </motion.div>
                <div className={styles.solvedLabel}>Solved</div>
            </div>
        </div>
    );
};

export default function ProfileView({ profileUser, isOwner, submissions = [] }: ProfileViewProps) {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;
        try {
            await user.setProfileImage({ file });
        } catch (err) {
            console.error("Error updating profile image:", err);
        }
    };

    const initialMetadata = (profileUser.publicMetadata || {}) as Record<string, unknown>;

    const [editForm, setEditForm] = useState({
        skills: (initialMetadata.skills as string[]) || ["React", "TypeScript", "Node.js", "Next.js"],
        location: (initialMetadata.location as string) || "Global",
        github: (initialMetadata.github as string) || profileUser.username || "",
        website: (initialMetadata.website as string) || "",
        linkedin: (initialMetadata.linkedin as string) || "",
        leetcode: (initialMetadata.leetcode as string) || "",
        twitter: (initialMetadata.twitter as string) || "",
        instagram: (initialMetadata.instagram as string) || ""
    });

    const handleSave = async () => {
        if (!isOwner || !user) return;
        try {
            await user.update({
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    ...editForm
                }
            });
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    const meta = (profileUser.publicMetadata || {}) as Record<string, unknown>;
    const getMetaString = (key: string, backup: string) => (meta[key] as string) || backup;
    const getMetaArray = (key: string, backup: string[]) => (meta[key] as string[]) || backup;

    const skills = getMetaArray("skills", editForm.skills);
    const location = getMetaString("location", editForm.location);
    const github = getMetaString("github", editForm.github);
    const website = getMetaString("website", editForm.website);
    const linkedin = getMetaString("linkedin", editForm.linkedin);
    const leetcode = getMetaString("leetcode", editForm.leetcode);

    if (!mounted) return null;

    return (
        <motion.div
            className={styles.profileContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left Sidebar */}
            <motion.div className={styles.leftSidebar} variants={itemVariants}>
                <div className={styles.card}>
                    <div className={styles.profileHeader}>
                        <div
                            className={styles.avatarContainer}
                            onClick={() => isEditing && fileInputRef.current?.click()}
                            style={{ cursor: isEditing ? "pointer" : "default" }}
                        >
                            <Image
                                src={profileUser.imageUrl || "/file.svg"}
                                alt="Avatar"
                                width={80}
                                height={80}
                                className={styles.avatar}
                            />
                            {isEditing && (
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "rgba(0,0,0,0.5)",
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Camera size={20} color="white" />
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <h2 className={styles.username}>
                                {profileUser.fullName || profileUser.username || "User"}
                            </h2>
                            <p className={styles.handle}>@{profileUser.username || "user"}</p>
                        </div>
                    </div>

                    <div className={styles.statsRow}>
                        <span>Global Rank</span>
                        <span className={styles.rankValue}>#1,240</span>
                    </div>

                    {isOwner && (
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={styles.editButton}
                                style={{ background: isEditing ? "rgba(255,255,255,0.1)" : "var(--primary)" }}
                            >
                                {isEditing ? <><X size={16} /> Close</> : <><Edit2 size={16} /> Edit Profile</>}
                            </button>
                            <Link href="/settings" className={styles.settingsButton} title="Account Settings">
                                <Settings size={20} />
                            </Link>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.div
                                key="edit"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "1.25rem", overflow: 'hidden' }}
                            >
                                {[
                                    { label: "Location", key: "location" },
                                    { label: "Github", key: "github" },
                                    { label: "LinkedIn", key: "linkedin" },
                                    { label: "LeetCode", key: "leetcode" },
                                    { label: "Twitter", key: "twitter" },
                                    { label: "Instagram", key: "instagram" },
                                    { label: "Website", key: "website" }
                                ].map(field => (
                                    <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                        <label style={{ fontSize: "0.75rem", color: "#737373", textTransform: 'uppercase', fontWeight: 600 }}>{field.label}</label>
                                        <input
                                            value={(editForm as any)[field.key]}
                                            onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem", borderRadius: "8px", color: "white", fontSize: "0.85rem" }}
                                        />
                                    </div>
                                ))}
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                    <label style={{ fontSize: "0.75rem", color: "#737373", textTransform: 'uppercase', fontWeight: 600 }}>Skills (comma separated)</label>
                                    <input
                                        value={Array.isArray(editForm.skills) ? editForm.skills.join(", ") : editForm.skills}
                                        onChange={(e) => setEditForm({ ...editForm, skills: e.target.value.split(",").map(s => s.trim()) })}
                                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem", borderRadius: "8px", color: "white", fontSize: "0.85rem" }}
                                    />
                                </div>
                                <button onClick={handleSave} className={styles.editButton} style={{ background: "var(--success)", marginTop: "0.5rem" }}>
                                    <Save size={16} /> Save Changes
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1.25rem" }}
                            >
                                {location && (
                                    <div className={styles.socialLink}><MapPin size={16} color="var(--primary)" /> {location}</div>
                                )}
                                {github && (
                                    <a href={github.startsWith('http') ? github : `https://github.com/${github}`} target="_blank" rel="noreferrer" className={styles.socialLink}>
                                        <Github size={16} color="#fff" /> {github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                                    </a>
                                )}
                                {leetcode && (
                                    <a href={leetcode.startsWith('http') ? leetcode : `https://leetcode.com/${leetcode}`} target="_blank" rel="noreferrer" className={styles.socialLink}>
                                        <Code2 size={16} color="#ffa116" /> {leetcode.replace(/^https?:\/\/(www\.)?leetcode\.com\//, '')}
                                    </a>
                                )}
                                {website && (
                                    <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noreferrer" className={styles.socialLink}>
                                        <LinkIcon size={16} color="var(--secondary)" /> {website.replace(/^https?:\/\//, '')}
                                    </a>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.card}>
                    <h3 style={{ fontSize: "0.9rem", color: '#737373', textTransform: 'uppercase', marginBottom: "1rem", marginTop: 0 }}>Community Skills</h3>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {skills.map((skill: string, idx: number) => (
                            <motion.span
                                key={idx}
                                className={styles.skillBadge}
                                whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Right Content */}
            <div className={styles.rightContent}>
                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <motion.div className={`${styles.card} ${styles.solvedStatsCard}`} variants={itemVariants}>
                        <CircularProgress val={326} total={3878} color="var(--primary)" />
                        <div className={styles.difficultyList}>
                            {[
                                { l: "Easy", c: "var(--success)", v: 142, t: 992 },
                                { l: "Medium", c: "var(--warning)", v: 126, t: 1986 },
                                { l: "Hard", c: "var(--error)", v: 58, t: 900 }
                            ].map(item => (
                                <div key={item.l} className={styles.difficultyItem}>
                                    <span className={styles.difficultyLabel}>{item.l}</span>
                                    <div className={styles.progressBar}>
                                        <motion.div
                                            className={styles.progressBarFill}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.v / item.t) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            style={{ background: item.c }}
                                        />
                                    </div>
                                    <span className={styles.difficultyValue}>{item.v}<span style={{ color: '#525252', fontSize: '0.7rem' }}>/{item.t}</span></span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className={`${styles.card} ${styles.badgesCard}`} variants={itemVariants}>
                        <div className={styles.badgesHeader}>
                            <h3 style={{ fontSize: "1rem", margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Trophy size={18} color="var(--warning)" /> Achieved Badges
                            </h3>
                            <span style={{ color: "var(--primary)", fontSize: "0.8rem", fontWeight: 600, cursor: 'pointer' }}>View All</span>
                        </div>
                        <div className={styles.badgesGrid}>
                            {[
                                { icon: <Flame size={24} color="#f97316" />, label: "7 Day Streak" },
                                { icon: <Target size={24} color="#8b5cf6" />, label: "Problem Solver" },
                                { icon: <Trophy size={24} color="#eab308" />, label: "Top 100" },
                                { icon: <Code2 size={24} color="#06b6d4" />, label: "Newbie" }
                            ].map((badge, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.badgeItem}
                                    title={badge.label}
                                    whileHover={{ y: -10, scale: 1.1 }}
                                >
                                    <div className={styles.badgeInner}>
                                        {badge.icon}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Heatmap */}
                <motion.div className={styles.card} style={{ padding: '0.5rem' }} variants={itemVariants}>
                    <ContributionGraph
                        submissions={submissions}
                        totalSubmissions={submissions.length}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
