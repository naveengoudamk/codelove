'use server'

import { db } from '@/lib/db'
import { clerkClient } from "@clerk/nextjs/server";

export async function checkUsernameAvailability(username: string) {
    if (!username) return false

    try {
        // Check Local DB
        const existingUser = await db.user.findUnique({
            where: { username },
        })

        if (existingUser) return false

        // Check Clerk
        const client = await clerkClient();
        const clerkUsers = await client.users.getUserList({
            username: [username],
            limit: 1
        });

        if (clerkUsers.data.length > 0) return false;

        return true // Returns true if available (not found)
    } catch (error) {
        console.error("Error checking username availability:", error);
        return false; // Fail safe
    }
}

export async function registerUser(prevState: any, formData: FormData) {
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const fullName = formData.get('fullName') as string

    if (!username || !email) {
        return { message: 'Username and email are required', success: false }
    }

    try {
        // Check Local DB
        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        })

        if (existingUser) {
            if (existingUser.username === username) {
                return { message: 'Username already taken', success: false }
            }
            if (existingUser.email === email) {
                return { message: 'Email already registered', success: false }
            }
        }

        // Check Clerk for Username
        const client = await clerkClient();
        const clerkUsers = await client.users.getUserList({
            username: [username],
            limit: 1
        });

        if (clerkUsers.data.length > 0) {
            return { message: 'Username already taken (Clerk)', success: false }
        }

        // NOTE: This only creates the user in the local database.
        // For full authentication, the user must also be created in Clerk.
        // Ideally, this form should collect a password and create the Clerk user via API,
        // or use the Clerk SignUp component.

        await db.user.create({
            data: {
                username,
                email,
                fullName,
            },
        })

        return { message: 'User registered successfully!', success: true }
    } catch (error) {
        console.error('Registration error:', error)
        return { message: 'Failed to register user', success: false }
    }
}
