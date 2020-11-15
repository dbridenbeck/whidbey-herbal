import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import Root from "./root"

const rootElement = document.getElementById('root');

// config Apollo
const httpLink = createHttpLink({
  uri: "https://whidbey-herbal.myshopify.com/api/2020-07/graphql.json",
});

const middlewareLink = setContext(() => ({
  headers: {
    "X-Shopify-Storefront-Access-Token": "837432f0b8059e443da74da036f73f70",
  },
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  rootElement
);