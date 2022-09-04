import apolloClient from '../../apolloClient';
import { GET_SHOP_PRODUCTS } from '../../queries';
import ShopLayout from './ShopLayout';

const Shop = ({ products }) => {
  return <ShopLayout products={products} heading={'Shop'} />;
};

export default Shop;
export async function getServerSideProps({ resolvedUrl }) {
  const { data } = await apolloClient.query({
    query: GET_SHOP_PRODUCTS,
    variables: { collectionName: 'Online Store' },
  });
  return {
    // TODO, handle error from apollo query
    props: {
      products: data.collections.edges[0].node.products.edges,
      resolvedUrl,
    },
  };
}
