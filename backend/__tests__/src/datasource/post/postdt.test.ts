import { PrismaClient } from '@prisma/client'
import { CreatePostInput } from '@shared/graphql/generated'
import { PostDataSource } from '@modules/post/post.datasource'

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        post: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    })),
}))

describe('PostDataSource', () => {
    let postDataSource: PostDataSource
    let mockPrisma: PrismaClient

    beforeEach(() => {
        mockPrisma = new PrismaClient()
        postDataSource = new PostDataSource(mockPrisma)
    })

    afterEach(async () => {
        await postDataSource.disconnect()
    })

    it('should call postDataSource.create with the correct input and return the created post', async () => {
        const input: CreatePostInput = {
            title: 'New Post',
            content: 'Post Content',
            authorId: '123',
        }
        const mockPost = { id: '456', ...input }
        const createSpy = jest
            .spyOn(mockPrisma.post, 'create')
            .mockResolvedValue(mockPost)

        const result = await postDataSource.create(input)

        expect(createSpy).toHaveBeenCalledWith({
            data: input,
            select: { id: true, title: true, content: true, authorId: true },
        })
        expect(result).toEqual(mockPost)
    })

    it('should call postDataSource.getPostByUserId with the correct authorId and return the posts', async () => {
        const authorId = '123'
        const mockPosts = [
            {
                id: '1',
                title: 'Post 1',
                content: 'Content 1',
                authorId: authorId,
            },
            {
                id: '2',
                title: 'Post 2',
                content: 'Content 2',
                authorId: authorId,
            },
        ]
        const findManySpy = jest
            .spyOn(mockPrisma.post, 'findMany')
            .mockResolvedValue(mockPosts)

        const result = await postDataSource.getPostByUserId(authorId)

        expect(findManySpy).toHaveBeenCalledWith({
            where: { authorId: authorId },
            select: { id: true, title: true, content: true, authorId: true },
        })
        expect(result).toEqual(mockPosts)
    })

    it('should call postDataSource.getPostById with the correct id and return the post', async () => {
        const id = '456'
        const mockPost = {
            id: id,
            title: 'Post 1',
            content: 'Content 1',
            authorId: '123',
        }
        const findUniqueSpy = jest
            .spyOn(mockPrisma.post, 'findUnique')
            .mockResolvedValue(mockPost)

        const result = await postDataSource.getPostById(id)

        expect(findUniqueSpy).toHaveBeenCalledWith({
            where: { id: id },
            select: { id: true, title: true, content: true, authorId: true },
        })
        expect(result).toEqual(mockPost)
    })
})
