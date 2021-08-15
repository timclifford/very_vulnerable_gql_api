import { ApolloClient, createHttpLink, ApolloLink, split } from '@apollo/client';
import { ApolloCache, InMemoryCache } from '@apollo/client/cache';
import { WebSocketLink } from "@apollo/client/link/ws";
import { RetryLink } from '@apollo/client/link/retry';
import { isReference, isInlineFragment, getMainDefinition } from '@apollo/client/utilities';

import fetch from "isomorphic-unfetch";
import config from "../config";

const endpoint = process.browser ? config.clientEndpoint : config.serverEndpoint;
const wsEndpoint = config.wsEndpoint;

export default function createApolloClient(initialState, headers) {
  const authLink = new ApolloLink((operation, forward) => {
    const token = process.browser ? localStorage.getItem("token") : headers?.cookie && headers?.cookie.substring(6);

    operation.setContext({
      fetchOptions: {
        credentials: "include",
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        cookie: headers && headers.cookie,
      },
    });
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: endpoint,
    fetch,
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: wsEndpoint,
        options: {
          reconnect: true,
          connectionParams: () => {
            const token = localStorage.getItem("token");
            if (token) {
              return { authToken: token };
            }
            return {};
          },
        },
      })
    : () => {
        console.log("SSR");
      };

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription" && process.browser;
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache().restore(initialState),
    ssrMode: !process.browser,
    connectToDevTools: true,
  });
}
