import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ComponentWrapper from './ComponentWrapper';
import StyledH2 from './StyledH2';
import Product from './Product';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
`;

const ExploreShopLink = styled.span`
  cursor: pointer;
  display: block;
  width: 40%;
  min-width: 200px;
  max-width: 300px;
  margin: 30px auto 0px auto;
  padding: 10px 5px;
  border: 2px solid #e3be42;
  border-radius: 10px;
  text-align: center;
  font-size: 1.225em;
  font-weight: 300;
  color: #e3be42;
  &:hover {
    background-color: #e3be42;
    color: white;
    :active {
      color: #e3be42;
      background-color: white;
    }
  }
`;

const Products = ({ products, title, bottomPadding }) => {
  const { pathname } = useRouter();
  const queriedProducts = pathname.includes('wholesale')
    ? products.find(
        (collection) => collection.node.title === 'Wholesale Products'
      )
    : products.find(
        (collection) => collection.node.title === 'Featured Products'
      );
  const finalProducts = queriedProducts.node.products.edges;

  return (
    <ComponentWrapper bottomPadding={bottomPadding}>
      <StyledH2> {title} </StyledH2>
      <ProductsContainer>
        {finalProducts.map((product) => (
          <Product key={product.node.handle} product={product.node} />
        ))}
      </ProductsContainer>
      <Link href="/shop">
        <ExploreShopLink>Explore the Shop</ExploreShopLink>
      </Link>
    </ComponentWrapper>
  );
};

Products.propTypes = {
  title: PropTypes.string,
};

export default Products;
