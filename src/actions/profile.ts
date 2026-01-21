'use server'

import { db } from '@/lib/db'

export async function getUserSubmissions(username: string) {
    const user = await db.user.findUnique({
        where: { username },
        include: {
            submissions: {
                where: {
                    createdAt: {
                        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) // Last 1 year
                    }
                },
                select: {
                    createdAt: true,
                    status: true
                }
            }
        }
    })

    return user?.submissions || []
}
