import { gql } from '../../shared/graphql/gql'

export const typeDefs = gql`
    type Post {
        "The post's ID"
        id: ID!
        "The post's title"
        title: String!
        "The post's content"
        content: String!
        "The post's author"
        authorId: String!
    }

    type PostExtended {
        "The post's ID"
        id: ID!
        "The post's title"
        title: String!
        "The post's content"
        content: String!
        "The post's author"
        authorId: String!
        "The post's comment count"
        commentCount: Int!
    }
    "Create post input"
    input CreatePostInput {
        "The post's title"
        title: String!
        "The post's content"
        content: String!
        "The post's author id"
        authorId: ID!
    }

    type PostsWithCommentCount {
        "The posts"
        posts: [PostExtended!]!
        "The page info"
        pageInfo: PageInfo!
    }

    extend type Query {
        "Get post by id"
        getPostById(id: ID!): Post
        "Get post by author id"
        getPostByUserId(userId: ID!): [Post!]!
        "Get all posts with count of comments for each post"
        posts: [Post!]!
        "Get all posts with count of comments for each post"
        getPostsWithCommentCount(
            "The number of items to skip, for pagination"
            skip: Int!
            "The number of items to take, for pagination"
            take: Int!
            "The post's id"
            id: ID
        ): PostsWithCommentCount!
    }

    extend type Mutation {
        "Create a new post"
        createPost(input: CreatePostInput!): Post!
    }
`
