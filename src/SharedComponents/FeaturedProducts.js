import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ComponentWrapper from './ComponentWrapper';
import StyledH2 from './StyledH2';
import { GET_FEATURED_PRODUCTS } from '../queries';
import Product from './Product';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
`;

const ExploreShopLink = styled.span`
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
  &:hover {
    background-color: #e3be42;
    a {
      color: white;
    }
  }
  a {
    text-decoration: none;
    color: #e3be42;
  }
`;

const Products = ({ title, bottomPadding }) => {
  const { pathname } = useRouter();
  const { loading, error, data } = useQuery(GET_FEATURED_PRODUCTS);
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const queriedProducts = pathname.includes('wholesale')
    ? data.collections.edges.find(
        (collection) => collection.node.title === 'Wholesale Products'
      )
    : data.collections.edges.find(
        (collection) => collection.node.title === 'Featured Products'
      );
  const products = queriedProducts.node.products.edges;

  return (
    <ComponentWrapper bottomPadding={bottomPadding}>
      <StyledH2> {title} </StyledH2>
      <ProductsContainer>
        {products.map((product) => (
          <Product key={product.node.handle} product={product.node} />
        ))}
      </ProductsContainer>
      <ExploreShopLink>
        <Link href="/shop">Explore the Shop </Link>
      </ExploreShopLink>
    </ComponentWrapper>
  );
};

Products.propTypes = {
  title: PropTypes.string,
};

export default Products;
