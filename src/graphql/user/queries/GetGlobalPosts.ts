import { gql } from "apollo-boost";

export const GET_GLOBAL_POSTS = gql`
  query GetGlobalPosts($cursor: String, $skip: Int, $take: Int) {
    getGlobalPosts(cursor: $cursor, skip: $skip, take: $take) {
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

// export const GET_GLOBAL_POSTS = gql`
//   query GetGlobalPosts {
//     getGlobalPosts {
//       id
//       title
//       text
//       created_at
//       currently_liked
//       comments_count
//       likes_count
//       isCtxUserIdAFollowerOfPostUser
//       comments {
//         id
//         content
//         created_at
//       }
//       images {
//         id
//         uri
//       }
//       user {
//         id
//         firstName
//         lastName
//       }
//     }
//   }
// `;
