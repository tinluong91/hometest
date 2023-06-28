import { CreatePostInput } from '@shared/graphql/generated'
import { PrismaDataSource } from '@shared/prisma/PrismaDatasource'

import { POST_SELECT } from './post.sql'

export class PostDataSource extends PrismaDataSource {
    private db = this.prisma.post
    /**
     * Create a new post
     * @param data: CreatePostInput
     */
    public async create(data: CreatePostInput) {
        return this.db.create({
            data: data,
            select: POST_SELECT,
        })
    }
    /**
     * Get post by authorId
     * @param authorId
     * @returns Post[]
     */
    public async getPostByUserId(authorId: string) {
        return this.db.findMany({
            where: { authorId: authorId },
            select: POST_SELECT,
        })
    }
    /**
     * Get post by id
     * @param id
     * @returns Post
     */
    public async getPostById(id: string) {
        return this.db.findUnique({ where: { id: id }, select: POST_SELECT })
    }

    /**
     * Get all posts with count of comments for each post
     * @returns
     */
    public async getPostsWithCommentCount(
        skip: number,
        take: number,
        id?: string,
    ) {
        // get total posts
        const totalPosts = await (id
            ? this.db.count({ where: { authorId: id } })
            : this.db.count())
        // if id null get all posts
        let posts = []
        // get posts with pagination
        posts = await (!id
            ? this.db.findMany({
                  select: POST_SELECT,
                  orderBy: { id: 'asc' },
                  skip: skip,
                  take: take,
              })
            : this.db.findMany({
                  where: { authorId: id },
                  select: POST_SELECT,
                  skip: skip,
                  take: take,
              }))
        // get comment count for each post
        const getPostsWithCommentCount = await Promise.all(
            posts.map(async (post) => {
                const commentCount = await this.prisma.comment.count({
                    where: { postId: post.id },
                })
                return { ...post, commentCount: commentCount }
            }),
        )
        return {
            posts: getPostsWithCommentCount,
            pageInfo: {
                hasNextPage: skip + take < totalPosts,
                total: totalPosts,
            },
        }
    }
}
