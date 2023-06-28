/* eslint-disable unicorn/filename-case */
import { seedPosts } from './s-post'

import { UserDataSource } from '../modules/user/user.datasource'

/**
 * Seed users
 * Format user email: <user><number>@example.com
 */
export async function seed() {
    const userDataSource = new UserDataSource()

    try {
        const listUser = randomUserInfo()

        await Promise.all(
            listUser.map(async (user) => {
                const userResponse = await userDataSource.create(user)
                console.log(`User ${user.name} seeded successfully.`)
                const { id } = userResponse
                // seed 3 Posts per User
                await seedPosts(id)
            }),
        )

        console.log('User seeding completed.')
    } catch (error) {
        console.error('Error seeding users:', error)
    } finally {
        await userDataSource.disconnect()
    }
}

/**
 * Generate random user info as fixed name and email
 * @returns Array of user info objects
 */
export function randomUserInfo(): Array<{ email: string; name: string }> {
    const listUser = []
    for (let i = 1; i <= 10; i++) {
        const newUser = {
            email: `user${i}@example.com`,
            name: `User ${i}`,
        }
        listUser.push(newUser)
    }
    return listUser
}
