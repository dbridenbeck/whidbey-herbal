import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloLink } from 'apollo-boost';

import 'cross-fetch/polyfill';
// config Apollo
const httpLink = createHttpLink({
  uri: 'https://whidbey-herbal.myshopify.com/api/2022-10/graphql.json',
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-Shopify-Storefront-Access-Token': 'c5ef76df32b442653976987149c26f32',
    },
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
