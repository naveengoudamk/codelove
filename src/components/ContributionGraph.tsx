"use client";

import { useState } from "react";

interface Submission {
    createdAt: Date;
    status: string;
}

interface ContributionGraphProps {
    submissions: Submission[];
    totalSubmissions: number;
}

export default function ContributionGraph({ submissions, totalSubmissions }: ContributionGraphProps) {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Generate array of days for the last year
    const days = [];
    let currentDate = new Date(oneYearAgo);

    // Align to the previous Sunday (or Monday) to start the grid cleanly
    // 0 = Sunday, 1 = Monday
    const startDay = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - startDay); // Start from Sunday

    while (currentDate <= today) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Map submissions to dates
    // Format: "YYYY-MM-DD" -> count
    const submissionMap = new Map<string, number>();
    submissions.forEach(sub => {
        const dateStr = new Date(sub.createdAt).toISOString().split('T')[0];
        submissionMap.set(dateStr, (submissionMap.get(dateStr) || 0) + 1);
    });

    const getColor = (count: number) => {
        if (count === 0) return "#262626"; // Empty/Background
        if (count <= 2) return "#0e4429"; // Low
        if (count <= 5) return "#006d32"; // Medium
        if (count <= 9) return "#26a641"; // High
        return "#39d353"; // Very High
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Group days by columns (weeks)
    // We assume 7 rows per column (Sun-Sat)
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    days.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === days.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    return (
        <div style={{ background: "#171717", borderRadius: "12px", padding: "1.5rem", border: "1px solid #262626" }}>
            <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
                {totalSubmissions} submissions in the last year
            </div>

            <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", gap: "3px" }}>
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                            {week.map((day, dIndex) => {
                                const dateStr = day.toISOString().split('T')[0];
                                const count = submissionMap.get(dateStr) || 0;
                                const monthName = months[day.getMonth()];
                                const dayName = day.getDate();

                                return (
                                    <div
                                        key={dateStr}
                                        style={{
                                            width: "11px",
                                            height: "11px",
                                            borderRadius: "2px",
                                            background: getColor(count),
                                            position: "relative"
                                        }}
                                        title={`${count} submissions on ${monthName} ${dayName}, ${day.getFullYear()}`}
                                        className="contribution-cell"
                                    >
                                        <style jsx>{`
                                            .contribution-cell:hover {
                                                border: 1px solid rgba(255,255,255,0.5);
                                                z-index: 10;
                                                cursor: pointer;
                                            }
                                        `}</style>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px", marginTop: "10px", fontSize: "0.8rem", color: "#a3a3a3" }}>
                <span>Less</span>
                <div style={{ width: "11px", height: "11px", borderRadius: "2px", background: "#262626" }}></div>
                <div style={{ width: "11px", height: "11px", borderRadius: "2px", background: "#0e4429" }}></div>
                <div style={{ width: "11px", height: "11px", borderRadius: "2px", background: "#006d32" }}></div>
                <div style={{ width: "11px", height: "11px", borderRadius: "2px", background: "#26a641" }}></div>
                <div style={{ width: "11px", height: "11px", borderRadius: "2px", background: "#39d353" }}></div>
                <span>More</span>
            </div>
        </div>
    );
}
