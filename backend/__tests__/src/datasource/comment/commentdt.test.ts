import { PrismaClient } from '@prisma/client'
import { CreateCommentInput } from '@shared/graphql/generated'
import { CommentDataSource } from '@modules/comment/comment.datasource'

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        comment: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    })),
}))

describe('CommentDataSource', () => {
    let commentDataSource: CommentDataSource
    let mockPrisma: PrismaClient

    beforeEach(() => {
        mockPrisma = new PrismaClient()
        commentDataSource = new CommentDataSource(mockPrisma)
    })

    afterEach(async () => {
        await commentDataSource.disconnect()
    })

    it('should call commentDataSource.createComment with the correct input and return the created comment', async () => {
        const input: CreateCommentInput = {
            postId: '789',
            content: 'New Comment',
            authorId: '123',
        }
        const mockComment = {
            id: '123',
            ...input,
        }
        const createSpy = jest
            .spyOn(mockPrisma.comment, 'create')
            .mockResolvedValue(mockComment)

        const result = await commentDataSource.createComment(input)

        expect(createSpy).toHaveBeenCalledWith({
            data: input,
            select: { id: true, content: true, postId: true, authorId: true },
        })
        expect(result).toEqual(mockComment)
    })

    it('should call commentDataSource.getCommentByPostId with the correct postId and return the comments', async () => {
        const postId = '456'
        const skip = 0
        const take = 5
        const mockComments = [
            { id: '1', content: 'Comment 1', postId: postId, authorId: '123' },
            { id: '2', content: 'Comment 2', postId: postId, authorId: '123' },
        ]
        const findManySpy = jest
            .spyOn(mockPrisma.comment, 'findMany')
            .mockResolvedValue(mockComments)

        const result = await commentDataSource.getCommentByPostId(skip,take, postId)

        expect(findManySpy).toHaveBeenCalledWith({
            where: { postId: postId },
            select: { id: true, content: true, postId: true, authorId: true },
        })
        expect(result).toEqual(mockComments)
    })
})
