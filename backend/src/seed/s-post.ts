import { CreatePostInput } from '@shared/graphql/generated'

import { seedComments } from './s-comment'

import { PostDataSource } from '../modules/post/post.datasource'

/**
 * Seed posts for each user
 * @param userIds Array of user IDs
 */
export async function seedPosts(userId: string) {
    const postDataSource = new PostDataSource()
    try {
        for (let i = 1; i <= 3; i++) {
            const newPost: CreatePostInput = {
                authorId: userId,
                title: `Post ${i} by User ${userId}`,
                content: `This is post ${i} by User ${userId}`,
            }

            const postResponse = await postDataSource.create(newPost)
            console.log(`Post ${i} seeded successfully for User ${userId}.`)
            const { id } = postResponse
            // seed 5 Comments per Post
            await seedComments(id, userId)
        }

        console.log('Post seeding completed.')
    } catch (error) {
        console.error('Error seeding posts:', error)
    } finally {
        await postDataSource.disconnect()
    }
}
