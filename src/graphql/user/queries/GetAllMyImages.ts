import { gql } from "apollo-boost";

export const GET_ALL_MY_IMAGES = gql`
  query GetAllMyImages {
    GetAllMyImages {
      id
      uri
    }
  }
`;
