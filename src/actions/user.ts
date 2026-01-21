'use server'

import { db } from '@/lib/db'

export async function checkUsernameAvailability(username: string) {
    if (!username) return false

    const existingUser = await db.user.findUnique({
        where: { username },
    })
    return !existingUser // Returns true if available (not found)
}

export async function registerUser(prevState: any, formData: FormData) {
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const fullName = formData.get('fullName') as string

    if (!username || !email) {
        return { message: 'Username and email are required', success: false }
    }

    try {
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
