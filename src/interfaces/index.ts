import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { NextPageContext } from "next";

export type User = {
  id: number;
  name: string;
};

export interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
