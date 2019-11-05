import { gql } from "apollo-boost";

export const GET_ONLY_THREADS = gql`
  mutation CreateOrUpdateLikes($input: UpdateLikesInput!) {
    createOrUpdateLikes(input: $input) {
      postId
      status
    }
  }
`;
