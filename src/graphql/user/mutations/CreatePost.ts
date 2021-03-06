import { gql } from "apollo-boost";

export const CREATE_POST = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
      text
      images {
        id
        uri
      }
    }
  }
`;
