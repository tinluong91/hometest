import { Context } from '@shared/context'
import { Resolvers } from '@shared/graphql/generated'

export const resolvers: Resolvers<Context> = {
    Query: {
        getPostById: async (_, { id }, context) => {
            const {
                dataSources: { post: postDs },
            } = context
            return postDs.getPostById(id)
        },
        getPostByUserId: async (_, { userId }, context) => {
            const {
                dataSources: { post: postDs },
            } = context
            return postDs.getPostByUserId(userId)
        },
        getPostsWithCommentCount: async (_, { skip, take, id }, context) => {
            const {
                dataSources: { post: postDs },
            } = context
            return postDs.getPostsWithCommentCount(skip, take, id)
        },
    },

    Mutation: {
        createPost: async (_, { input }, context) => {
            const {
                dataSources: { post: postDs },
            } = context

            return postDs.create(input)
        },
    },
}
