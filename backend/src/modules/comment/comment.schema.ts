import { gql } from '../../shared/graphql/gql'

export const typeDefs = gql`
    type Comment {
        "The comment id"
        id: ID!
        "The comment content"
        content: String!
        "The comment post id"
        postId: ID
        "The comment author id"
        authorId: ID
    }

    input CreateCommentInput {
        "The comment content"
        content: String!
        "The comment post id"
        postId: ID!
        "The comment author id"
        authorId: ID!
    }
    input UpdateCommentInput {
        "The comment content"
        content: String!
    }

    type CommentPaging {
        "The comments"
        comments: [Comment!]!
        "The page info"
        pageInfo: PageInfo!
    }

    extend type Query {
        "Get comment by id"
        getCommentById(id: ID!): Comment
        "Get all comments with pagination"
        getCommentByPostId(skip: Int!, take: Int!, postId: ID): CommentPaging!
        "Get all comments with pagination"
        comments: [Comment!]!
    }

    extend type Mutation {
        "Create a new comment"
        createComment(input: CreateCommentInput!): Comment!
        "Delete a comment"
        updateComment(id: ID!, input: UpdateCommentInput!): Comment!
    }
`
