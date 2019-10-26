import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher
} from "apollo-boost";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { onError } from "apollo-link-error";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import Router from "next/router";

import introspectionQueryResultData from "../components/generated/fragmentTypes";

import { isBrowser } from "./isBrowser";

const nodeEnv = process.env.NODE_ENV;

const envIsDev = nodeEnv !== "production";

const myIpAddress = "192.168.1.24"; // internalIp.v4.sync();

const port = process.env.GRAPHQL_PORT;

const myLanInfo: string = `${myIpAddress}:${port}`;

const prodDomain: string = `fauxgramapi.eddienaff.dev`;

const domain: string = envIsDev ? myLanInfo : prodDomain;

const prefix: string = envIsDev ? "http://" : "https://";

const wsPrefix: string = envIsDev ? "ws://" : "wss://";

const prodGraphqlUrl: string = `${prefix}${domain}/graphql`;

const prodWebsocketsUrl: string = `${wsPrefix}${domain}/subscriptions`;

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function create(
  initialState: any,
  { getToken }: Options
): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: prodGraphqlUrl, // Server URL (must be absolute)
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
    fetch
  });

  // Create a WebSocket link:
  const wsLink = isBrowser
    ? new WebSocketLink({
        uri: prodWebsocketsUrl,
        options: {
          reconnect: true
          // connectionParams: {
          //   authToken: authToken ? `mfg=${authToken}` : ""
          // }
        }
      })
    : null;

  const splitLink = isBrowser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink!,
        httpLink
      )
    : httpLink;

  const errorLink = onError(({ graphQLErrors }) => {
    // console.log({
    //   operation,
    //   response,
    //   forward
    // });
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
            null,
            2
          )}, Path: ${path}`
        );
        if (isBrowser && message.includes("Not authenticated")) {
          // Router.replace("/login");
          Router.replace({
            pathname: "/login",
            query: { message: "You are not authenticated" }
          });
        }
      });
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `mfg=${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(splitLink)),
    cache: new InMemoryCache({
      addTypename: true,
      fragmentMatcher
    }).restore(initialState || {})
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
