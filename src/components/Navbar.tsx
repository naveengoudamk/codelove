import Link from 'next/link';
import styles from './Navbar.module.css';
import { Code2 } from 'lucide-react';

const Navbar = () => {
    return (
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

            <div className={styles.authButtons}>
                <button className={styles.signInBtn}>Sign In</button>
                <button className={styles.premiumBtn}>Premium</button>
            </div>
        </nav>
    );
};

export default Navbar;
