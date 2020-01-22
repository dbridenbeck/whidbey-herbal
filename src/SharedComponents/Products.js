import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from "prop-types";

import Product from './Product';
import { connect } from "react-redux";
import { device } from "../utils/devices";

const ProductsWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 1000px;
  margin: 70px auto 0 auto;
`;

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
  max-width: 300px;
  margin: 30px auto 0 auto;
  padding: 5px;
  color: #e3be42;
  border: 1px solid #e3be42;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
  font-weight: normal;
  text-decoration: none;
  &:hover {
    background-color: #e3be42;
    color: white;
  }
`;

const ProductsTitle = styled.h2`
  margin: 0 0 5px 0px;
  font-weight: normal;
  font-size: 1.75em;
  text-align: left;
  color: #787878;
  @media ${device.tablet} {
    margin: 0 0 5px 50px;
  }
`;

const Products = ({products, title}) => {

  return (
    <ProductsWrapper>
      <ProductsTitle> {title} </ProductsTitle>
      <ProductsContainer>
        {products
          .filter(product => product.availableForSale)
          .map(product => (
            <Product key={product.id} product={product} />
          ))}
      </ProductsContainer>
      <ExploreShopLink to="/">Explore the Shop</ExploreShopLink>
    </ProductsWrapper>
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