import {
    CreateCommentInput,
    ResolversTypes,
    UpdateCommentInput,
} from '@shared/graphql/generated'
import { PrismaDataSource } from '@shared/prisma/PrismaDatasource'

import { COMMENT_SELECT } from './comment.sql'

export class CommentDataSource extends PrismaDataSource {
    private db = this.prisma.comment
    /**
     * Create a new comment
     * @param data
     * @returns
     */
    public async createComment(data: CreateCommentInput) {
        return this.db.create({
            data: data,
            select: COMMENT_SELECT,
        })
    }
    /**
     * Get comment by post Id
     * @param postId
     * @returns
     */
    public async getCommentByPostId(
        skip: number,
        take: number,
        postId?: string,
    ) {
        // get total comments
        const totalComments = await (postId
            ? this.db.count({ where: { postId: postId } })
            : this.db.count())
        // get comments with pagination
        let comments = []
        comments = await (!postId
            ? this.db.findMany({
                  select: COMMENT_SELECT,
                  orderBy: { id: 'asc' },
                  skip: skip,
                  take: take,
              })
            : this.db.findMany({
                  where: { postId: postId },
                  select: COMMENT_SELECT,
                  orderBy: { id: 'asc' },
                  skip: skip,
                  take: take,
              }))
        // get total comments for each post
        return {
            comments: comments,
            pageInfo: {
                hasNextPage: skip + take < totalComments,
                total: totalComments,
            },
        }
    }
    /**
     * Get comment by id
     * @param id
     * @returns
     */
    public async getCommentById(
        id: string,
    ): Promise<ResolversTypes['Comment']> {
        return this.db.findUnique({ where: { id: id }, select: COMMENT_SELECT })
    }

    /**
     * Update comment
     * @param id
     * @param content
     * @returns
     */
    public async updateComment(id: string, input: UpdateCommentInput) {
        const { content } = input
        try {
            return await this.db.update({
                where: { id: id },
                data: { content: content },
                select: COMMENT_SELECT,
            })
        } catch {
            throw new Error('Comment not found')
        }
    }
}
