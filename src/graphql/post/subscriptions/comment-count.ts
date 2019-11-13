import { gql } from "apollo-boost";

export const COMMENT_COUNT = gql`
  subscription CommentCount($input: CommentCountArgs!) {
    commentCount(input: $input) {
      count
      postId
    }
  }
`;
