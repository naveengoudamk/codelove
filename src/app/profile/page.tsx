"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { MapPin, Link as LinkIcon, Github, Eye, CheckCircle2, MessageSquare, Star } from "lucide-react";

import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return <div className={styles.container}>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div className={styles.container}>Please sign in to view your profile.</div>;
    }

    return (
        <div className={styles.container}>
            {/* Left Sidebar */}
            <div className={styles.leftPanel}>
                <div className={styles.profileCard}>
                    <div className={styles.avatarContainer}>
                        <Image
                            src={user.imageUrl || "/file.svg"}
                            alt="Avatar"
                            width={100}
                            height={100}
                            className={styles.avatar}
                            style={{ background: '#333' }}
                        />
                    </div>

                    <div className={styles.userInfo}>
                        <h2>{user.fullName || user.username || "User"}</h2>
                        <p className={styles.username}>@{user.username || "user"}</p>
                        <p className={styles.rank}>Rank 375,155</p>
                    </div>

                    <button className={styles.editButton}>Edit Profile</button>

                    <div className={styles.statsList}>
                        <div className={styles.statItem}>
                            <MapPin size={16} /> India
                        </div>
                        <div className={styles.statItem}>
                            <Github size={16} /> naveengoudamk
                        </div>
                        <div className={styles.statItem}>
                            <LinkIcon size={16} /> https://in.linkedin.com/in/...
                        </div>
                    </div>

                    <div className={styles.statsList}>
                        <div className={styles.sectionTitle}>Community Stats</div>
                        <div className={styles.statItem}>
                            <Eye size={16} color="#3b82f6" /> Views <span style={{ marginLeft: 'auto' }}>0</span>
                        </div>
                        <div className={styles.statItem}>
                            <CheckCircle2 size={16} color="#22c55e" /> Solution <span style={{ marginLeft: 'auto' }}>0</span>
                        </div>
                        <div className={styles.statItem}>
                            <MessageSquare size={16} color="#eab308" /> Discuss <span style={{ marginLeft: 'auto' }}>0</span>
                        </div>
                        <div className={styles.statItem}>
                            <Star size={16} color="#a855f7" /> Reputation <span style={{ marginLeft: 'auto' }}>0</span>
                        </div>
                    </div>
                </div>

                <div className={styles.badgesSection}>
                    <div className={styles.sectionTitle}>Skills</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ background: '#262626', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>Java</span>
                        <span style={{ background: '#262626', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>MySQL</span>
                        <span style={{ background: '#262626', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>Dynamic Programming</span>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className={styles.rightPanel}>
                <div className={styles.gridStats}>
                    <div className={styles.solvedCard}>
                        <div className={styles.circleChart}>
                            <div className={styles.circleInner}>
                                <div className={styles.total}>326</div>
                                <div className={styles.label}>Solved</div>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.detailRow}>
                                <span className={styles.easy}>Easy</span>
                                <div style={{ flex: 1, margin: '0 1rem', height: 6, background: '#262626', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: '40%', height: '100%', background: 'var(--success)' }}></div>
                                </div>
                                <span className={styles.count}>84/992</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.medium}>Medium</span>
                                <div style={{ flex: 1, margin: '0 1rem', height: 6, background: '#262626', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: '60%', height: '100%', background: 'var(--warning)' }}></div>
                                </div>
                                <span className={styles.count}>185/1986</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.hard}>Hard</span>
                                <div style={{ flex: 1, margin: '0 1rem', height: 6, background: '#262626', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: '20%', height: '100%', background: 'var(--error)' }}></div>
                                </div>
                                <span className={styles.count}>58/900</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.badgeCard}>
                        <div className={styles.sectionTitle}>Badges <span>4</span></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: 50, height: 50, background: '#333', borderRadius: '50%' }}></div>
                            <div style={{ width: 50, height: 50, background: '#333', borderRadius: '50%' }}></div>
                            <div style={{ width: 50, height: 50, background: '#333', borderRadius: '50%' }}></div>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>Most Recent Badge</div>
                        <div style={{ fontSize: '0.8rem', color: '#a3a3a3' }}>Mathematical Insight Badge</div>
                    </div>
                </div>

                <div className={styles.heatmapSection}>
                    <div className={styles.heatmapTitle}>842 submissions in the past one year</div>
                    <div className={styles.heatmapGrid}>
                        {Array.from({ length: 364 }).map((_, i) => {
                            // Deterministic pseudo-random
                            const val = (i * 1337 + 42) % 100;
                            const isGreen = val > 70;
                            const opacity = ((val % 80) + 20) / 100;

                            return (
                                <div key={i} className={styles.heatBox} style={{
                                    background: isGreen ? `rgba(34, 197, 94, ${opacity})` : '#262626'
                                }}></div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.recentActivity}>
                    <div className={styles.activityHeader}>Recent Activity</div>
                    <div className={styles.activityList}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className={styles.activityItem}>
                                <div className={styles.activityDetails}>
                                    <span className={styles.problemName}>Maximum Square Area by Removing Fences From a Field</span>
                                    <span className={styles.timeAgo}>{item * 2} days ago</span>
                                </div>
                                <span className={styles.sectionTitle} style={{ fontSize: '0.9rem', fontWeight: 400 }}>Solved</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
