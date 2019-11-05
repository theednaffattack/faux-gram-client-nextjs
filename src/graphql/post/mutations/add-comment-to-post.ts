import { gql } from "apollo-boost";

export const NEW_COMMENT = gql`
  mutation AddCommentToPost($input: NewCommentsArgs!) {
    addCommentToPost(input: $input) {
      id
      postId
      content
      created_at
    }
  }
`;
