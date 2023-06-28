import { gql } from "apollo-boost";
/**
 * @description get all users
 */
const GET_USERS = gql`
  query GetUsersWithPostCount($skip: Int!, $take: Int!) {
    getUsersWithPostCount(skip: $skip, take: $take) {
      users {
        id
        email
        name
        postCount
      }
      pageInfo {
        hasNextPage
        total
      }
    }
  }
`;

/**
 * @description get user by id
 */
const GET_USER = gql`
  query User($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

/**
 * @description update user by id
 */
const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      id
    }
  }
`;

/**
 * @description delete user by id
 */
const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
export { DELETE_USER, GET_USER, GET_USERS, UPDATE_USER };

