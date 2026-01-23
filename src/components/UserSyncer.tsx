'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { syncUser } from '@/actions/auth';

export function UserSyncer() {
    const { isSignedIn, user } = useUser();

    useEffect(() => {
        if (isSignedIn && user) {
            syncUser();
        }
    }, [isSignedIn, user]);

    return null;
}
