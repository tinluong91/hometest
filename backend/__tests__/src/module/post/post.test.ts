import { resolvers } from '@modules/post/post.resolvers'
import { ResolversTypes } from '@shared/graphql/generated'

// Mock the post data source
const postDataSourceMock = {
    getPostById: jest.fn(),
    getPostByUserId: jest.fn(),
    create: jest.fn(),
}

// Mock the context object
const contextMock = {
    dataSources: {
        post: postDataSourceMock,
    },
}

describe('Post resolvers', () => {
    describe('Query', () => {
        describe('getPostById', () => {
            it('should return a post by id', async () => {
                // Mock the data source method
                const post = { id: '1', title: 'Sample Post' }
                postDataSourceMock.getPostById.mockResolvedValue(post)

                // Invoke the resolver function
                /// @ts-expect-error // only some fields are required
                const result = (await resolvers.Query.getPostById(
                    null,
                    { id: '1' },
                    contextMock,
                )) as Promise<ResolversTypes['Post']>

                // Assertion
                expect(result).toEqual(post)
                expect(postDataSourceMock.getPostById).toHaveBeenCalledWith('1')
            })
        })

        describe('getPostByUserId', () => {
            it('should return posts by user id', async () => {
                // Mock the data source method
                const posts = [
                    { id: '1', title: 'Post 1' },
                    { id: '2', title: 'Post 2' },
                ]
                postDataSourceMock.getPostByUserId.mockResolvedValue(posts)

                // Invoke the resolver function
                /// @ts-expect-error // only some fields are required
                const result = (await resolvers.Query.getPostByUserId(
                    null,
                    { userId: '1' },
                    contextMock,
                )) as Promise<ResolversTypes['Post']>

                // Assertion
                expect(result).toEqual(posts)
                expect(postDataSourceMock.getPostByUserId).toHaveBeenCalledWith(
                    '1',
                )
            })
        })
    })

    describe('Mutation', () => {
        describe('createPost', () => {
            it('should create a new post', async () => {
                // Mock the data source method
                const createdPost = { id: '1', title: 'New Post' }
                postDataSourceMock.create.mockResolvedValue(createdPost)

                // Invoke the resolver function
                /// @ts-expect-error // only some fields are required
                const result = (await resolvers.Mutation.createPost(
                    null,
                    { input: { title: 'New Post' } },
                    contextMock,
                )) as Promise<ResolversTypes['Post']>

                // Assertion
                expect(result).toEqual(createdPost)
                expect(postDataSourceMock.create).toHaveBeenCalledWith({
                    title: 'New Post',
                })
            })
        })
    })
})
