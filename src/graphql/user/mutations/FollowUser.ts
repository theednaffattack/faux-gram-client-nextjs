import { gql } from "apollo-boost";

export const FOLLOW_USER = gql`
  mutation FollowUser($data: FollowUserInput!) {
    followUser(data: $data)
  }
`;
