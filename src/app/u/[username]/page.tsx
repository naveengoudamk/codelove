import { clerkClient } from "@clerk/nextjs/server";
import ProfileView from "@/components/ProfileView";
import { notFound } from "next/navigation";

// Define Page Props as a Promise for 'params' per Next.js 15+ convention for async pages
interface PageProps {
    params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
    const { username } = await params; // Await the params object

    // Fetch user from Clerk Backend API
    // Note: clerkClient is an async object in newer versions, check version
    const client = await clerkClient();
    const headersList = await client.users.getUserList({
        username: [username],
        limit: 1
    });

    const user = headersList.data[0];

    if (!user) {
        notFound();
    }

    const profileUser = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
        publicMetadata: user.unsafeMetadata // Read from unsafeMetadata for consistency with client updates
    };

    return (
        <ProfileView profileUser={profileUser} isOwner={false} />
    );
}
