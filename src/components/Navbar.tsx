"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';
import { Code2, Search } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import SearchModal from './SearchModal';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>
                    <Code2 size={24} color="var(--primary)" />
                    Code<span>Love</span>
                </Link>

                <div className={styles.navLinks}>
                    <Link href="/problems" className={styles.navLink}>Problems</Link>
                    <Link href="/contest" className={styles.navLink}>Contest</Link>
                    <Link href="/discuss" className={styles.navLink}>Discuss</Link>
                    <Link href="/interview" className={styles.navLink}>Interview</Link>
                </div>

                <div className={styles.authButtons} style={{ alignItems: 'center' }}>
                    <button
                        className={styles.searchTrigger}
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search"
                    >
                        <Search size={20} />
                        <span className={styles.searchShortcut}>⌘K</span>
                    </button>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className={styles.signInBtn}>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/profile" style={{ marginRight: '1rem', color: '#a3a3a3', fontSize: '0.9rem', fontWeight: 500 }}>
                            My Profile
                        </Link>
                        <UserButton />
                    </SignedIn>
                    <button className={styles.premiumBtn}>Premium</button>
                </div>
            </nav>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Navbar;
