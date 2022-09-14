import styled from 'styled-components';
import PageWrapper from '../../SharedComponents/PageWrapper';
import ShopProduct from './ShopProduct';
import StyledH1 from '../../SharedComponents/StyledH1';
import Footer from '../../SharedComponents/Footer';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  margin: 70px 0;
`;

const Shop = ({ products, heading }) => {
  return (
    <PageWrapper>
      <StyledH1>{heading}</StyledH1>
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
