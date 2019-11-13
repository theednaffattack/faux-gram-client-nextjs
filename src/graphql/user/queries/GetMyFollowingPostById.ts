import { gql } from "apollo-boost";

export const GET_MY_FOLLOWING_POST_BY_ID = gql`
  query GetMyFollowingPostById($getpostinput: GetMyFollowingPostByIdInput!) {
    getMyFollowingPostById(getpostinput: $getpostinput) {
      id
      title
      text
      comments_count
      likes_count
      isCtxUserIdAFollowerOfPostUser
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
