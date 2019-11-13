import { gql } from "apollo-boost";

export const GET_GLOBAL_POSTS = gql`
  query GetGlobalPosts {
    getGlobalPosts {
      id
      title
      text
      created_at
      likes_count
      comments_count
      images {
        id
        uri
      }
      isCtxUserIdAFollowerOfPostUser
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
