"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Calendar, Clock, Trophy, Target, Zap, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContestPage() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // innovative logic to find the next saturday for the weekly challenge
    // if today is saturday, it shows next saturday
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const nextSaturday = new Date();
            nextSaturday.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
            nextSaturday.setHours(14, 0, 0, 0); // 2:00 PM

            // If it's already past 2PM on Saturday, add 7 days
            if (now.getTime() > nextSaturday.getTime()) {
                nextSaturday.setDate(nextSaturday.getDate() + 7);
            }

            const difference = nextSaturday.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);

    const handleRegister = () => {
        // Simulate an API call
        setTimeout(() => {
            setIsRegistered(true);
            alert("Successfully registered for the Weekly Challenge!");
        }, 500);
    };

    return (
        <main className={styles.container}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>Weekly Contests</h1>
                <p className={styles.subtitle}>
                    Compete with the best developers from around the world.
                    Showcase your skills and climb the global leaderboard.
                </p>
            </motion.div>

            <motion.div
                className={styles.grid}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                initial="hidden"
                animate="show"
            >
                {/* Weekly Challenge Card */}
                <motion.div
                    className={styles.card}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                    }}
                >
                    <div className={styles.cardHeader}>
                        <div>
                            <span className={styles.badge}>Weekly Challenge</span>
                            <h2 className={styles.contestTitle} style={{ marginTop: '1rem' }}>
                                Weekly Coding Battle #42
                            </h2>
                        </div>
                        <Trophy size={48} className="text-yellow-500" color="#eab308" />
                    </div>

                    <div className={styles.date}>
                        <Calendar size={18} />
                        <span>Next Competition: Saturday, 2:00 PM UTC</span>
                    </div>

                    <div className={styles.countdown}>
                        <span className={styles.timerTitle}>STARTS IN</span>
                        <div className={styles.timerGrid}>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeValue}>{timeLeft.days}</span>
                                <span className={styles.timeLabel}>Days</span>
                            </div>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeValue}>{timeLeft.hours}</span>
                                <span className={styles.timeLabel}>Hrs</span>
                            </div>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeValue}>{timeLeft.minutes}</span>
                                <span className={styles.timeLabel}>Mins</span>
                            </div>
                            <div className={styles.timeUnit}>
                                <span className={styles.timeValue}>{timeLeft.seconds}</span>
                                <span className={styles.timeLabel}>Secs</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.benefits}>
                        <h3 className={styles.benefitTitle}>How it helps you:</h3>
                        <ul className={styles.benefitList}>
                            <li className={styles.benefitItem}>
                                <Target size={20} color="var(--primary)" />
                                <span>Sharpen your problem-solving skills under time pressure.</span>
                            </li>
                            <li className={styles.benefitItem}>
                                <Zap size={20} color="var(--primary)" />
                                <span>Boost your global rating and ranking profile.</span>
                            </li>
                            <li className={styles.benefitItem}>
                                <Gift size={20} color="var(--primary)" />
                                <span>Win exclusive swags and premium badges.</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        className={styles.registerBtn}
                        onClick={handleRegister}
                        disabled={isRegistered}
                    >
                        {isRegistered ? 'Registered' : 'Register Now'}
                    </button>
                </motion.div>

                {/* Information Card */}
                <motion.div
                    className={styles.card}
                    style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                    }}
                >
                    <h3 className={styles.contestTitle} style={{ fontSize: '1.5rem' }}>About Weekly Contests</h3>
                    <p style={{ color: '#d4d4d4', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        Every week, CodeLove hosts a global competition for developers of all levels.
                        It consists of 4 algorithmic problems ranging from Easy to Hard.
                        The contest duration is 90 minutes.
                    </p>

                    <h3 className={styles.contestTitle} style={{ fontSize: '1.5rem' }}>Prizes</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <Trophy size={24} color="#eab308" />
                            <div>
                                <h4 style={{ fontWeight: 600, color: '#fff' }}>1st Place</h4>
                                <p style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>Mechanical Keyboard + Premium Year</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <Trophy size={24} color="#94a3b8" />
                            <div>
                                <h4 style={{ fontWeight: 600, color: '#fff' }}>2nd - 10th Place</h4>
                                <p style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>CodeLove Swag Pack + Premium Month</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
