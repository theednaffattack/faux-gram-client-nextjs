import { gql } from "apollo-boost";

export const MY_FOLLOWING_POSTS = gql`
  query MyFollowingPosts {
    myFollowingPosts {
      id
      title
      text
      created_at
      currently_liked
      likes_count
      comments {
        id
        content
        created_at
      }
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
