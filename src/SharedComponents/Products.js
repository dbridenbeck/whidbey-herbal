import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from "prop-types";
import ComponentWrapper from "./ComponentWrapper";
import StyledH2 from "./StyledH2";

import Product from './Product';
import { connect } from "react-redux";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
`;


const ExploreShopLink = styled(Link)`
  display: block;
  width: 40%;
  min-width: 145px;
  max-width: 300px;
  margin: 30px auto 0 auto;
  padding: 10px 5px;
  color: #e3be42;
  border: 2px solid #e3be42;
  border-radius: 10px;
  text-align: center;
  font-size: 1.225em;
  font-weight: 300;
  text-decoration: none;
  &:hover {
    background-color: #e3be42;
    color: white;
  }
`;

const Products = ({products, title, hasTopBottomBorders}) => {

  return (
    <ComponentWrapper hasTopBottomBorders={hasTopBottomBorders}>
      <StyledH2> {title} </StyledH2>
      <ProductsContainer>
        {products
          .filter(product => product.collections.edges[0].node.handle === "featured-products")
          .map(product => (
            <Product key={product.id} product={product} />
          ))}
      </ProductsContainer>
      <ExploreShopLink to="/shop">Explore the Shop</ExploreShopLink>
    </ComponentWrapper>
  );
};

const mapStateToProps = ( {products} ) => ({
  products
});

Products.propTypes = {
  products: PropTypes.array,
  title: PropTypes.string
}

export default connect(mapStateToProps)(Products);