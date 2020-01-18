import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import Reviews from '../components/Reviews';
import QuantityButton from '../components/QuantityButton';
import BuyButton from '../components/BuyButton';
import ProductInfo from '../components/ProductInfo';

import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";


// Begin Styled Components
const ProductWrapper = styled.div`
  display: block;
  height: auto;
  width: 100%;
  margin: 90px auto 0 auto;
`;

// begin component
const Product = ({
  products,
  match,
  checkout,
}) => {
  const { handle } = match.params;

  // select the current product
  const selectProduct = products.filter(product => handle === product.handle);
  const selectedProduct = selectProduct[0];

  // check if item exists in checkout already
  const doesItemExist = checkout.lineItems.filter(
    lineItem => lineItem.id === selectedProduct.id
  );

  // begin component's return
  return (
    <ProductWrapper>
      <ProductInfo 
        selectedProduct={selectedProduct}
        doesItemExist={doesItemExist}
      />
      <Reviews />
      <Products title={"More Products"} />
    </ProductWrapper>
  );
};

Product.propTypes = {
  products: PropTypes.array,
  checkout: PropTypes.object,
  heroImg: PropTypes.string,
  heroImgHandle: PropTypes.string,
  handleHeroImg: PropTypes.func
};

const mapStateToProps = ({products, checkout, heroImgSrc, heroImgId, quantityButtonAmount}) => ({
  products,
  checkout,
  heroImgSrc,
  heroImgId,
  quantityButtonAmount
});

const mapDispatchToProps = dispatch => ({
  handleHeroImg: (imageSrc, imageId) =>
    dispatch(CartActionCreators.handleHeroImg(imageSrc, imageId)),
  updateQuantityButton: (quantity) =>
    dispatch(CartActionCreators.updateQuantityButton(quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
