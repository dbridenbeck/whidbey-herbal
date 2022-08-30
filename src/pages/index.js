import React from 'react';
import Home from '../components/Home/Home';
import apolloClient from '../apolloClient';
import { GET_FEATURED_PRODUCTS_AND_ARTICLES } from '../queries';

const App = ({ articles, products }) => {
  return <Home articles={articles} products={products} />;
};

export default App;

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GET_FEATURED_PRODUCTS_AND_ARTICLES,
  });
  return {
    // TODO, handle error from apollo query
    props: {
      articles: data?.articles?.edges,
      products: data?.collections?.edges,
    },
  };
}
