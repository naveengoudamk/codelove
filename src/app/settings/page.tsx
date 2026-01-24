
"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            minHeight: "100vh",
            gap: "2rem"
        }}>
            <div style={{ width: "100%", maxWidth: "880px", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#a1a1aa", transition: "color 0.2s" }} className="hover:text-white">
                    <ArrowLeft size={20} />
                    <span>Back to Profile</span>
                </Link>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, marginLeft: "auto", color: "var(--foreground)" }}>Account Settings</h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
                <UserProfile
                    path="/settings"
                    routing="path"
                    appearance={{
                        baseTheme: dark,
                        variables: {
                            colorPrimary: "#8b5cf6",
                            colorBackground: "#171717",
                            colorText: "#ededed",
                            colorInputText: "#ededed"
                        },
                        elements: {
                            card: {
                                boxShadow: "none",
                                border: "1px solid #262626",
                                width: "100%"
                            },
                            navbar: {
                                borderRight: "1px solid #262626"
                            },
                            scrollBox: {
                                borderRadius: "0 12px 12px 0"
                            }
                        }
                    }}
                />
            </motion.div>
        </div>
    );
}
