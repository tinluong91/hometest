import { gql } from "apollo-boost";
/**
 * @description get all posts with comment count
 */
const GET_POSTS_BY_USERID = gql`
  query GetPostsWithCommentCount($skip: Int!, $take: Int!, $id: ID) {
    getPostsWithCommentCount(skip: $skip, take: $take, id: $id) {
      posts {
        id
        authorId
        title
        content
        commentCount
      }
      pageInfo {
        hasNextPage
        total
      }
    }
  }
`;

export { GET_POSTS_BY_USERID };
