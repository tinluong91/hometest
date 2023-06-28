import { Context } from '@shared/context'
import { Resolvers } from '@shared/graphql/generated'

export const resolvers: Resolvers<Context> = {
    Query: {
        users: async (_, __, context) => {
            const {
                dataSources: { user: userDs },
            } = context
            return userDs.getUsers()
        },
        getUser: async (_, { id }, context) => {
            const {
                dataSources: { user: userDs },
            } = context

            return userDs.getUserById(id)
        },
        getUsersWithPostCount: async (_, { skip, take }, context) => {
            const {
                dataSources: { user: userDs },
            } = context

            return userDs.getUsersWithPostCount(skip, take)
        },
    },

    Mutation: {
        createUser: async (_, { input }, context) => {
            const {
                dataSources: { user: userDs },
            } = context

            return userDs.create(input)
        },
        updateUser: async (_, { id, input }, context) => {
            const {
                dataSources: { user: userDs },
            } = context

            return userDs.update(id, input)
        },
        deleteUser: async (_, { id }, context) => {
            const {
                dataSources: { user: userDs },
            } = context

            return userDs.delete(id)
        },
    },
}
