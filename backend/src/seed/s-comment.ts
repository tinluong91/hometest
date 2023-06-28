import { CreateCommentInput } from '@shared/graphql/generated'

import { CommentDataSource } from '../modules/comment/comment.datasource'

/**
 * Seed comments for each post
 * @param postIds Array of post IDs
 */
export async function seedComments(postId: string, authorId: string) {
    const commentDataSource = new CommentDataSource()

    try {
        for (let i = 1; i <= 5; i++) {
            const newComment: CreateCommentInput = {
                postId: postId,
                content: `Comment ${i} for Post ${postId} by User ${authorId}`,
                authorId: authorId,
            }

            await commentDataSource.createComment(newComment)
            console.log(
                `Comment ${i} seeded successfully for Post ${postId} by User ${authorId}.`,
            )
        }

        console.log('Comment seeding completed.')
    } catch (error) {
        console.error('Error seeding comments:', error)
    } finally {
        await commentDataSource.disconnect()
    }
}
