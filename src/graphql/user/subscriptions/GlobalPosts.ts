import { gql } from "apollo-boost";

export const GLOBAL_POSTS = gql`
  subscription GlobalPosts {
    globalPosts {
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
