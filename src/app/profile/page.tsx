"use client";

import { useUser } from "@clerk/nextjs";
import ProfileView from "@/components/ProfileView";
import { useEffect, useState } from "react";
import { getUserSubmissions } from "@/actions/profile";

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [submissions, setSubmissions] = useState<any[]>([]);

    useEffect(() => {
        if (user?.username) {
            getUserSubmissions(user.username).then(data => {
                setSubmissions(data);
            });
        }
    }, [user?.username]);

    if (!isLoaded) {
        return <div style={{ padding: "2rem", textAlign: "center" }}>Loading profile...</div>;
    }

    if (!isSignedIn) {
        return <div style={{ padding: "2rem", textAlign: "center" }}>Please sign in to view your profile.</div>;
    }

    // Map Clerk user to ProfileUser interface
    const profileUser = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
        publicMetadata: user.unsafeMetadata
    };

    return (
        <ProfileView
            profileUser={profileUser}
            isOwner={true}
            submissions={submissions}
        />
    );
}
