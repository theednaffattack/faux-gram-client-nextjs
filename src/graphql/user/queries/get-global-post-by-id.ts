import { gql } from "apollo-boost";

export const GET_GLOBAL_POST_BY_ID = gql`
  query GetGlobalPostById($getpostinput: GetGlobalPostByIdInput!) {
    getGlobalPostById(getpostinput: $getpostinput) {
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
      }
    }
  }
`;
