import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import Reviews from '../components/Reviews';
import { client } from "../plugins/shopify.js";
import ProductInfo from '../components/ProductInfo';
import { initialState } from '../state/App';
import {
  fetchShopifyProductsAction,
  fetchShopifyArticlesAction
} from "../state/fetchShopifyData";

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
  clearCheckoutInState,
  fetchShopifyProducts,
  fetchShopifyArticles
}) => {
  // if shopify saiys the checkout happened successfully, clear checkout in state
  const clearCheckoutIfCompleted = () => {
    checkout.checkoutId
      ? client.checkout.fetch(checkout.checkoutId).then(checkout => {
          if (checkout.completedAt) {
            clearCheckoutInState();
          }
        })
      : console.log("checkout doesn't exist");
  };

  useEffect(() => {
    if (checkout === initialState) {
      // if checkout has been completed, clear checkout in state
      clearCheckoutIfCompleted();
      // populate state with products from shopify
      fetchShopifyProducts();
      // populate state with articles from shopify
      fetchShopifyArticles();
    }
  }, []);

  const { handle } = match.params;

  // select the current product
  const selectProduct = products.filter(
    product => handle === product.handle
  );
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
  updateQuantityButton: quantity =>
    dispatch(CartActionCreators.updateQuantityButton(quantity)),
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchShopifyProducts: () => dispatch(fetchShopifyProductsAction()),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
