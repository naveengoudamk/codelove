"use client";

import { useUser } from "@clerk/nextjs";
import ProfileView from "@/components/ProfileView";

export default function ProfilePage() {
    const { user, isLoaded, isSignedIn } = useUser();

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
        publicMetadata: user.unsafeMetadata // Use unsafeMetadata for instant updates on client
    };

    return (
        <ProfileView profileUser={profileUser} isOwner={true} />
    );
}
