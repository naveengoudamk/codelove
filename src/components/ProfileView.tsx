"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Link as LinkIcon, Github, Edit2, X, Save, Camera } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Type definition for the profile user
interface ProfileUser {
    id: string;
    username?: string | null;
    fullName?: string | null;
    imageUrl: string;
    publicMetadata?: Record<string, unknown>; // For custom fields like skills, social links
}

import ContributionGraph from "./ContributionGraph";

interface ProfileViewProps {
    profileUser: ProfileUser;
    isOwner: boolean;
    submissions?: any[];
}

export default function ProfileView({ profileUser, isOwner, submissions = [] }: ProfileViewProps) {
    const { user } = useUser(); // Current logged in user (for updating)
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        try {
            await user.setProfileImage({ file });
        } catch (err) {
            console.error("Error updating profile image:", err);
            alert("Failed to update profile image");
        }
    };

    // Local state for editing form
    // Safe access to metadata with unknown type
    // Safe access to metadata with unknown type
    const initialMetadata = (profileUser.publicMetadata || {}) as Record<string, unknown>;

    const [editForm, setEditForm] = useState({
        skills: (initialMetadata.skills as string[]) || ["Java", "MySQL", "Dynamic Programming"],
        location: (initialMetadata.location as string) || "India",
        github: (initialMetadata.github as string) || profileUser.username || "",
        website: (initialMetadata.website as string) || ""
    });

    // Handle Save (Using unsafeMetadata for client-side simplicity, or server action ideally)
    const handleSave = async () => {
        if (!isOwner || !user) return;

        try {
            // We use unsafeMetadata because publicMetadata is read-only on client
            // In a real app, use a server action to update publicMetadata properly
            await user.update({
                unsafeMetadata: {
                    ...user.unsafeMetadata,
                    skills: editForm.skills,
                    location: editForm.location,
                    github: editForm.github,
                    website: editForm.website
                }
            });
            setIsEditing(false);
            // In a real app you might need to refresh/invalidate router to see changes 
            // but Clerk useUser triggers re-render automatically on metadata change.
        } catch (err) {
            console.error("Failed to update profile", err);
            alert("Failed to update profile changes");
        }
    };

    // Use display data from props, fallback to form state if just edited (optimistic-ish)
    // Actually Clerk updates might take a second, so relying on props (which come from useUser or server) is safer
    // But for "ProfileView" component that receives data, we trust the props unless we are the owner and have local overrides?
    // Let's stick to using the props for display, but for the "Owner" viewing their own profile, 
    // the props passed in SHOULD be the live clerk user object which updates reactively.

    // Helper to get metadata (handling both public and unsafe for compatibility)
    // We prioritize the component props, which usually come from fresh fetching
    const meta = (profileUser.publicMetadata || {}) as Record<string, unknown>;

    // Type casting helper
    const getMetaString = (key: string, backup: string) => (meta[key] as string) || backup;
    const getMetaArray = (key: string, backup: string[]) => (meta[key] as string[]) || backup;

    const skills = getMetaArray("skills", editForm.skills as unknown as string[]);
    const location = getMetaString("location", editForm.location);
    const github = getMetaString("github", editForm.github);
    const website = getMetaString("website", editForm.website);

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem"
        }}>
            {/* Left Sidebar */}
            <div style={{ flex: "0 0 300px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{
                    background: "#171717",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    border: "1px solid #262626",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div
                            style={{ position: "relative", cursor: isEditing ? "pointer" : "default" }}
                            onClick={() => isEditing && fileInputRef.current?.click()}
                        >
                            <Image
                                src={profileUser.imageUrl || "/file.svg"}
                                alt="Avatar"
                                width={80}
                                height={80}
                                style={{ borderRadius: "12px", background: "#333", objectFit: "cover" }}
                            />
                            {isEditing && (
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "rgba(0,0,0,0.5)",
                                    borderRadius: "12px",
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
                            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {profileUser.fullName || profileUser.username || "User"}
                            </h2>
                            <p style={{ color: "#a3a3a3", fontSize: "0.9rem", margin: 0 }}>@{profileUser.username || "user"}</p>
                        </div>
                    </div>

                    <div style={{ fontSize: "0.9rem", color: "#a3a3a3", display: "flex", justifyContent: "space-between" }}>
                        <span>Rank</span>
                        <span style={{ color: "#fff", fontWeight: 600 }}>375,155</span>
                    </div>

                    {isOwner && (
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                borderRadius: "8px",
                                border: "none",
                                background: isEditing ? "#262626" : "var(--primary)",
                                color: isEditing ? "#fff" : "#fff",
                                cursor: "pointer",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}
                        >
                            {isEditing ? <><X size={16} /> Cancel</> : <><Edit2 size={16} /> Edit Profile</>}
                        </button>
                    )}

                    {isEditing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "0.5rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <label style={{ fontSize: "0.8rem", color: "#a3a3a3" }}>Location</label>
                                <input
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                    style={{ background: "#262626", border: "1px solid #404040", padding: "0.4rem", borderRadius: "6px", color: "white", fontSize: "0.8rem" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <label style={{ fontSize: "0.8rem", color: "#a3a3a3" }}>Github Username</label>
                                <input
                                    value={editForm.github}
                                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                                    style={{ background: "#262626", border: "1px solid #404040", padding: "0.4rem", borderRadius: "6px", color: "white", fontSize: "0.8rem" }}
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <label style={{ fontSize: "0.8rem", color: "#a3a3a3" }}>Skills (comma joined)</label>
                                <input
                                    value={Array.isArray(editForm.skills) ? editForm.skills.join(", ") : editForm.skills}
                                    onChange={(e) => setEditForm({ ...editForm, skills: e.target.value.split(",").map(s => s.trim()) })}
                                    style={{ background: "#262626", border: "1px solid #404040", padding: "0.4rem", borderRadius: "6px", color: "white", fontSize: "0.8rem" }}
                                />
                            </div>
                            <button onClick={handleSave} style={{ background: "var(--success)", border: "none", borderRadius: "6px", padding: "0.5rem", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem", color: "#d4d4d4" }}>
                                <MapPin size={16} color="#737373" /> {location}
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem", color: "#d4d4d4" }}>
                                <Github size={16} color="#737373" /> {github}
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.9rem", color: "#d4d4d4" }}>
                                <LinkIcon size={16} color="#737373" /> {website || "No website"}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ background: "#171717", borderRadius: "12px", padding: "1.5rem", border: "1px solid #262626" }}>
                    <h3 style={{ fontSize: "1rem", marginBottom: "1rem", marginTop: 0 }}>Skills</h3>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {skills && skills.length > 0 ? skills.map((skill: string, idx: number) => (
                            <span key={idx} style={{ background: "#262626", padding: "2px 10px", borderRadius: "12px", fontSize: "0.8rem", color: "#d4d4d4", border: "1px solid #404040" }}>
                                {skill}
                            </span>
                        )) : (
                            <span style={{ color: "#525252", fontSize: "0.8rem", fontStyle: "italic" }}>No skills listed</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Solved Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {/* Circle Chart Card */}
                    <div style={{ background: "#171717", borderRadius: "12px", padding: "1.5rem", border: "1px solid #262626", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                        <div style={{ position: "relative", width: "100px", height: "100px", borderRadius: "50%", border: "8px solid #262626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>326</div>
                                <div style={{ fontSize: "0.8rem", color: "#737373" }}>Solved</div>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                            {[{ l: "Easy", c: "#22c55e", v: 84, t: 992 }, { l: "Medium", c: "#eab308", v: 185, t: 1986 }, { l: "Hard", c: "#ef4444", v: 58, t: 900 }].map(item => (
                                <div key={item.l} style={{ display: "flex", alignItems: "center", fontSize: "0.85rem" }}>
                                    <span style={{ width: "50px", color: "#a3a3a3" }}>{item.l}</span>
                                    <div style={{ flex: 1, height: "6px", background: "#262626", borderRadius: "3px", overflow: "hidden", margin: "0 0.8rem" }}>
                                        <div style={{ width: `${(item.v / item.t) * 100}%`, height: "100%", background: item.c }}></div>
                                    </div>
                                    <span style={{ color: "#d4d4d4", fontWeight: 500 }}>{item.v}/{item.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Badges Card */}
                    <div style={{ background: "#171717", borderRadius: "12px", padding: "1.5rem", border: "1px solid #262626" }}>
                        <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Badges <span style={{ color: "#737373", fontSize: "0.9rem", marginLeft: "0.5rem" }}>4</span></div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ width: 50, height: 50, background: "#333", borderRadius: "50%" }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Heatmap */}
                <ContributionGraph
                    submissions={submissions}
                    totalSubmissions={submissions.length}
                />
            </div>
        </div>
    );
}
