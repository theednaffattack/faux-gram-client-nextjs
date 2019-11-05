import { gql } from "apollo-boost";

export const NEW_COMMENT = gql`
  subscription NewComment($input: NewCommentsArgs!) {
    newComment(input: $input) {
      id
      postId
      content
      created_at
    }
  }
`;
