import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from "prop-types";

import Product from './Product';
import { connect } from "react-redux";
import { device } from "../utils/devices";
import { laptopMargins, tabletMargins } from "../utils/responsiveSCSS";

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 20px auto 0 auto;
  @media ${device.tablet} {
    ${tabletMargins};
  }
  @media ${device.laptop} {
    ${laptopMargins};
  }
`;

const ExploreShopLink = styled(Link)`
  display: block;
  width: 40%;
  max-width: 300px;
  margin: 30px auto 0 auto;
  padding: 5px;
  color: #e3be42;
  text-align: center;
  font-size: min(max(16px, 2vw), 18px);
  font-weight: normal;
  border: 1px solid #e3be42;
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    background-color: #e3be42;
    color: white;
  }
`;

const Products = ({products}) => {

  return (
    <div>
      <ProductsWrapper>
        {/* only display products that are availble for sale */}
        {products
          .filter(product => product.availableForSale)
          .map(product => (
            <Product key={product.id} product={product} />
          ))}
      </ProductsWrapper>
      <ExploreShopLink to="/">Explore the Shop</ExploreShopLink>
    </div>
  );
};

const mapStateToProps = ( {products} ) => ({
  products
});

Products.propTypes = {
  products: PropTypes.array
}

export default connect(mapStateToProps)(Products);