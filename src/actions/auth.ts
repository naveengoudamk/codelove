'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function syncUser() {
    try {
        const clerkUser = await currentUser()
        if (!clerkUser) return { success: false, message: 'Not authenticated' }

        const email = clerkUser.emailAddresses[0]?.emailAddress
        const username = clerkUser.username || clerkUser.id // Fallback if no username
        const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || "User"

        if (!email) return { success: false, message: 'No email found' }

        // Check if user exists
        const existingUser = await db.user.findUnique({
            where: { email }, // Using email as the stable identifier for sync
        })

        if (!existingUser) {
            // Create New User
            // Note: If username is taken in DB but differs from Clerk (edge case), we might need logic.
            // But usually we assume unique username enforcement.

            // Check if username taken by another user
            const usernameTaken = await db.user.findUnique({ where: { username } })

            let finalUsername = username
            if (usernameTaken) {
                // If taken, append random numbers (Social Auth Edge Case)
                finalUsername = `${username}_${Math.floor(Math.random() * 1000)}`
            }

            await db.user.create({
                data: {
                    clerkId: clerkUser.id,
                    email,
                    username: finalUsername,
                    fullName,
                }
            })
            return { success: true, message: 'User created' }
        } else {
            // Update Clerk ID if missing (migration case)
            if (!existingUser.clerkId) {
                await db.user.update({
                    where: { id: existingUser.id },
                    data: { clerkId: clerkUser.id }
                })
            }
            return { success: true, message: 'User synced' }
        }

    } catch (error) {
        console.error("Sync Error:", error)
        return { success: false, message: 'Sync failed' }
    }
}
