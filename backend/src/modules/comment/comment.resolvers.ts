import { Context } from '@shared/context'
import { Resolvers, ResolversTypes } from '@shared/graphql/generated'

export const resolvers: Resolvers<Context> = {
    Query: {
        getCommentById: async (
            _,
            { id },
            context,
        ): Promise<ResolversTypes['Comment']> => {
            const {
                dataSources: { comment: commentDs },
            } = context
            return commentDs.getCommentById(id)
        },

        getCommentByPostId: async (_, { skip, take, postId }, context) => {
            const {
                dataSources: { comment: commentDs },
            } = context
            return commentDs.getCommentByPostId(skip, take, postId)
        },
    },

    Mutation: {
        createComment: async (_, { input }, context) => {
            const {
                dataSources: { comment: commentDs },
            } = context

            return commentDs.createComment(input)
        },
        // update comment
        updateComment: async (_, { id, input }, context) => {
            const {
                dataSources: { comment: commentDs },
            } = context

            return commentDs.updateComment(id, input)
        },
    },
}
