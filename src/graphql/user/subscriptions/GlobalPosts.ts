import { gql } from "apollo-boost";

export const GLOBAL_POSTS = gql`
  subscription GlobalPosts {
    globalPosts {
      id
      title
      text
      created_at
      currently_liked
      comments_count
      likes_count
      isCtxUserIdAFollowerOfPostUser
      comments {
        id
        content
        created_at
      }
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
