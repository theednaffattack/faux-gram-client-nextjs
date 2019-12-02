import { gql } from "apollo-boost";

export const GET_GLOBAL_POSTS = gql`
  query GetGlobalPosts {
    getGlobalPosts {
      id
      title
      text
      created_at
      currently_liked
      likes_count
      comments_count
      isCtxUserIdAFollowerOfPostUser
      images {
        id
        uri
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
