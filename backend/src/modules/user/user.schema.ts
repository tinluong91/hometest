import { gql } from '../../shared/graphql/gql'

export const typeDefs = gql`
    type User {
        "The user's ID"
        id: ID!
        "The user's name"
        name: String!
        "The user's email"
        email: String!
    }
    "Page info: should be used for pagination and cursor-based pagination"
    type PageInfo {
        "The total number of users"
        hasNextPage: Boolean!
        "The total number of users"
        total: Int!
    }

    type UserExtended {
        "The user's ID"
        id: ID!
        "The user's name"
        name: String!
        "The user's email"
        email: String!
        "The user's post count"
        postCount: Int!
    }

    type UsersWithPostCount {
        "The users"
        users: [UserExtended!]!
        "The page info"
        pageInfo: PageInfo!
    }

    input CreateUserInput {
        "The user's name"
        name: String!
        "The user's email"
        email: String!
    }

    input UpdateUserInput {
        "The user's name"
        name: String!
    }

    extend type Query {
        "Get user by id"
        getUser(id: ID!): User
        "Get all users"
        users: [User!]!
        "Get all users with count of posts for each user"
        getUsersWithPostCount(skip: Int!, take: Int!): UsersWithPostCount!
    }

    extend type Mutation {
        "Create a new user"
        createUser(input: CreateUserInput!): User!
        "Update a user"
        updateUser(id: ID!, input: UpdateUserInput!): User!
        "Delete a user"
        deleteUser(id: ID!): User!
    }
`
