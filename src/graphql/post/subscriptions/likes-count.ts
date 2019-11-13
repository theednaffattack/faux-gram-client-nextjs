import { gql } from "apollo-boost";

export const LIKES_COUNT = gql`
  subscription LikesCount($input: LikesCountArgs!) {
    likesCount(input: $input) {
      count
      postId
    }
  }
`;
