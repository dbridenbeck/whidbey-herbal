import apolloClient from '../../apolloClient';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import PageWrapper from '../../SharedComponents/PageWrapper';
import ShopProduct from './ShopProduct';
import StyledH1 from '../../SharedComponents/StyledH1';
import Footer from '../../SharedComponents/Footer';
import { GET_SHOP_PRODUCTS } from '../../queries';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  margin: 70px 0;
`;

const Shop = ({ products, pathname }) => {
  return (
    <PageWrapper>
      <StyledH1>{pathname === '/shop' ? 'Shop' : 'Wholesale Shop'}</StyledH1>
      <ProductsContainer>
        {products.map((product) => (
          <ShopProduct key={product.node.id} product={product.node} />
        ))}
      </ProductsContainer>
      <Footer />
    </PageWrapper>
  );
};

export default Shop;
export async function getServerSideProps(context) {
  const pathname = context.req.url;
  const collectionToQuery =
    context.res.url === '/shop' ? 'Online Store' : 'Wholesale Products';

  const { data } = await apolloClient.query({
    query: GET_SHOP_PRODUCTS,
    variables: { collectionName: collectionToQuery },
  });
  return {
    // TODO, handle error from apollo query
    props: {
      products: data.collections.edges[0].node.products.edges,
      pathname,
    },
  };
}
