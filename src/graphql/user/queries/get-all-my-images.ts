import { gql } from "apollo-boost";

export const GET_ONLY_THREADS = gql`
  query GetAllMyImages {
    GetAllMyImages {
      id
      uri
    }
  }
`;
