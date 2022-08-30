import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
// config Apollo
const httpLink = createHttpLink({
  uri: 'https://whidbey-herbal.myshopify.com/api/2020-07/graphql.json',
});

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': '837432f0b8059e443da74da036f73f70',
  },
}));

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
