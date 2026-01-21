"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './SearchModal.module.css';
import { Search, MapPin, User, FileText, Code2, Trophy, Hash, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
    id: string;
    type: 'problem' | 'contest' | 'user' | 'feed' | 'other';
    title: string;
    subtitle?: string;
    url: string;
}

const SAMPLE_RESULTS: SearchResult[] = [
    { id: '1', type: 'problem', title: 'Two Sum', subtitle: 'Easy • HashTable', url: '/problems/two-sum' },
    { id: '2', type: 'problem', title: 'Median of Two Sorted Arrays', subtitle: 'Hard • Binary Search', url: '/problems/median-of-two-sorted-arrays' },
    { id: '3', type: 'contest', title: 'Weekly Contest #42', subtitle: 'Starts in 2 days', url: '/contest' },
    { id: '4', type: 'user', title: 'naveen', subtitle: 'Rank 12,403', url: '/u/naveen' },
    { id: '5', type: 'feed', title: 'System Design Interview Guide', subtitle: 'Popular in Discuss', url: '/discuss/system-design' },
    { id: '6', type: 'other', title: 'Premium Subscription', subtitle: 'Unlock all features', url: '/premium' },
    { id: '7', type: 'problem', title: 'Add Two Numbers', subtitle: 'Medium • LinkedList', url: '/problems/add-two-numbers' },
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery(''); // Reset query on close? Optional.
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Filter results logic
    const filteredResults = SAMPLE_RESULTS.filter(item => {
        const matchesType = activeFilter === 'all' || item.type === activeFilter;
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()));
        return matchesType && matchesQuery;
    });

    const categories = ['all', 'problem', 'contest', 'user', 'feed', 'other'];

    if (!isOpen) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'problem': return <Code2 size={18} />;
            case 'contest': return <Trophy size={18} />;
            case 'user': return <User size={18} />;
            case 'feed': return <MessageSquare size={18} />;
            default: return <Hash size={18} />;
        }
    };

    return (
        <div className={styles.overlay} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className={styles.modal}>
                <div className={styles.searchHeader}>
                    <Search size={20} color="#737373" />
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search problems, users, contests..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <button onClick={() => setQuery('')}>
                            <X size={16} color="#737373" />
                        </button>
                    )}
                </div>

                <div className={styles.filters}>
                    {categories.map(cat => (
                        <div
                            key={cat}
                            className={`${styles.filter} ${activeFilter === cat ? styles.activeFilter : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </div>
                    ))}
                </div>

                <div className={styles.results}>
                    {filteredResults.length > 0 ? (
                        filteredResults.map(result => (
                            <Link href={result.url} key={result.id} onClick={onClose}>
                                <div className={styles.resultItem}>
                                    <div className={styles.resultIcon}>
                                        {getIcon(result.type)}
                                    </div>
                                    <div className={styles.resultContent}>
                                        <div className={styles.resultTitle}>{result.title}</div>
                                        {result.subtitle && <div className={styles.resultSubtitle}>{result.subtitle}</div>}
                                    </div>
                                    {activeFilter === 'all' && (
                                        <span style={{ fontSize: '0.7rem', color: '#555', textTransform: 'capitalize' }}>
                                            {result.type}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            No results found for "{query}"
                        </div>
                    )}
                </div>

                <div className={styles.closeHint}>
                    Press <span className={styles.shortcut}>ESC</span> to close
                </div>
            </div>
        </div>
    );
}
