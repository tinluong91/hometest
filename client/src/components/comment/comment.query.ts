import { gql } from "apollo-boost";
/**
 * @description get all comment by post id
 */
const GET_COMMENT_BY_POSTID = gql`
  query GetCommentByPostId($skip: Int!, $take: Int!, $id: ID) {
    getCommentByPostId(skip: $skip, take: $take, postId: $id) {
      comments {
        id
        postId
        content
      }
      pageInfo {
        hasNextPage
        total
      }
    }
  }
`;

export { GET_COMMENT_BY_POSTID };
