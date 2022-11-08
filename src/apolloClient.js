import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloLink } from 'apollo-boost';

import 'cross-fetch/polyfill';
// config Apollo
const httpLink = createHttpLink({
  uri: 'https://whidbey-herbal.myshopify.com/api/2020-07/graphql.json',
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-Shopify-Storefront-Access-Token': '837432f0b8059e443da74da036f73f70',
    },
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
