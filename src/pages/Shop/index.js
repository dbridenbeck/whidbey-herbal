import apolloClient from '../../apolloClient';
import { GET_SHOP_PRODUCTS } from '../../queries';
import ShopLayout from './ShopLayout';
import HeadTags from '../../SharedComponents/HeadTags';

const Shop = ({ products }) => {
  return (
    <>
      <HeadTags
        title={'Shop Whidbey Herbal'}
        ogUrl={'https://whidbeyherbal.com/shop'}
        ogDescription={'Small batch. Handcrafted. Potions made from plants.'}
        ogImage={'https://whidbeyherbal.com/logo512.png'}
      />
      <ShopLayout products={products} heading={'Shop'} />
    </>
  );
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
