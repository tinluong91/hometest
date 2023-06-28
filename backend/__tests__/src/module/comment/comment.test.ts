import { resolvers } from '@modules/comment/comment.resolvers'
import { ResolversTypes } from '@shared/graphql/generated'

// Mock the comment data source
const commentDataSourceMock = {
    createComment: jest.fn(),
    getCommentByPostId: jest.fn(),
    getCommentById: jest.fn(),
}

// Mock the context object
const contextMock = {
    dataSources: {
        comment: commentDataSourceMock,
    },
}

describe('Comment resolvers', () => {
    describe('Query', () => {
        describe('getCommentById', () => {
            it('should return a comment by id', async () => {
                // Mock the data source method
                const comment = { id: '1', text: 'Sample comment' }
                commentDataSourceMock.getCommentById.mockResolvedValue(comment)

                // Invoke the resolver function
                /// @ts-expect-error // only some fields are required
                const result = (await resolvers.Query.getCommentById(
                    null,
                    { id: '1' },
                    contextMock,
                )) as Promise<ResolversTypes['Comment']>

                // Assertion
                expect(result).toEqual(comment)
                expect(
                    commentDataSourceMock.getCommentById,
                ).toHaveBeenCalledWith('1')
            })
        })

        describe('getCommentByPostId', () => {
            it('should return comments by post id', async () => {
                // Mock the data source method
                const comments = [
                    { id: '1', text: 'Comment 1' },
                    { id: '2', text: 'Comment 2' },
                ]
                commentDataSourceMock.getCommentByPostId.mockResolvedValue(
                    comments,
                )

                // Invoke the resolver function
                /// @ts-expect-error // only some fields are required
                const result = (await resolvers.Query.getCommentByPostId(
                    null,
                    { skip: 0, take: 5, postId: 1 },
                    contextMock,
                )) as Promise<ResolversTypes['Comment']>

                // Assertion
                expect(result).toEqual(comments)
                expect(
                    commentDataSourceMock.getCommentByPostId,
                ).toHaveBeenCalledWith(0, 5, 1)
            })
        })
    })

    describe('Mutation', () => {
        describe('createComment', () => {
            it('should create a new comment', async () => {
                // Mock the data source method
                const createdComment = { id: '1', text: 'New comment' }
                commentDataSourceMock.createComment.mockResolvedValue(
                    createdComment,
                )

                // Invoke the resolver function
                /// @ts-expect-error // only some fields are required
                const result = (await resolvers.Mutation.createComment(
                    null,
                    { input: { text: 'New comment' } },
                    contextMock,
                )) as Promise<ResolversTypes['Comment']>

                // Assertion
                expect(result).toEqual(createdComment)
                expect(
                    commentDataSourceMock.createComment,
                ).toHaveBeenCalledWith({
                    text: 'New comment',
                })
            })
        })
    })
})
