import { gql } from "apollo-boost";

export const MY_FOLLOWING_POSTS = gql`
  query MyFollowingPosts {
    myFollowingPosts {
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
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
