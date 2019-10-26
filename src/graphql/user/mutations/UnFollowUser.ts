import { gql } from "apollo-boost";

export const UNFOLLOW_USER = gql`
  mutation UnFollowUser($data: UnFollowUserInput!) {
    unFollowUser(data: $data)
  }
`;
