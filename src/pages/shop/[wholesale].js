import apolloClient from '../../apolloClient';
import { GET_SHOP_PRODUCTS } from '../../queries';
import ShopLayout from '../../components/Shop/ShopLayout';
import Error from 'next/error';

const Shop = ({ products, isErroredUrl }) => {
  if (isErroredUrl) {
    return <Error statusCode={404} title="Page Not Found" />;
  }
  return <ShopLayout products={products} heading={'Wholesale'} />;
};

export default Shop;
export async function getServerSideProps({ res, resolvedUrl, params }) {
  // isErroredUrl is so we can show a 404 on any page other than /shop/wholesale
  const isErroredUrl = params.wholesale !== 'wholesale';
  if (isErroredUrl) {
    res.statusCode = 404;
  }
  const { data } = await apolloClient.query({
    query: GET_SHOP_PRODUCTS,
    variables: { collectionName: 'Wholesale Products' },
  });
  return {
    // TODO, handle error from apollo query
    props: {
      products: data.collections.edges[0].node.products.edges,
      resolvedUrl,
      isErroredUrl,
    },
  };
}
