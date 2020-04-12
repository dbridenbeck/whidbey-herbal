import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import {
  fetchShopifyProductsAction,
  fetchShopifyArticlesAction,
  fetchProductCollectionAction,
  handleDispatchingFeaturedProducts,
  queryCollection,
  updateShopifyProductsAction,
  updateFeaturedProductsAction,
  updateShopifyArticlesAction,
} from "../state/fetchShopifyData";
import styled from "styled-components";
import Header from "./Header";

const MasterWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto 0px auto;
  overflow: hidden;
  /* Media screen keeps WelcomeSection's img 100% height on bigger screens */
  @media ${device.laptop} {
    max-width: 100vw;
  }
`;

const Layout = ({
  children,
  clearCheckoutInState,
  fetchShopifyProducts,
  fetchShopifyArticles,
  fetchFeaturedProducts,
  updateShopifyProducts,
  updateFeaturedProducts,
  updateShopifyArticles,
  updateShopifyFetchTimestamp,
  lastShopifyFetchTimestamp,
  checkoutId,
  products,
  articles,
  featuredProducts
}) => {
  const clearCheckoutIfCompleted = () => {
    checkoutId
      ? client.checkout.fetch(checkoutId).then(checkout => {
          if (checkout.completedAt) {
            clearCheckoutInState();
          }
        })
      : console.log("checkout doesn't exist");
  };

  // if checkout exists, clear checkout in state if checkout was completed
  if (checkoutId) {
    clearCheckoutIfCompleted();
  }

  // if products haven't been fetched, fetch them
  if (!products.length) {
    // populate state with products and articles from shopify
    fetchShopifyProducts();
    fetchFeaturedProducts();
    fetchShopifyArticles();
  }

  // if 5 minutes passed and it's not the initial page load,
  // check for updates on products, articles, featured products collection, and update timestamp
  if ((Date.now() > lastShopifyFetchTimestamp + 300000) && (lastShopifyFetchTimestamp !== 0)) {
    updateShopifyProducts(products);
    updateShopifyArticles(articles);
    updateFeaturedProducts(featuredProducts);
    updateShopifyFetchTimestamp();
  }

  return (
    <>
      <MasterWrapper id="MasterWrapper">
        <Header />
        {children}
      </MasterWrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkoutId: PropTypes.string,
  clearCheckoutInState: PropTypes.func,
  fetchProducts: PropTypes.func
};

const mapStateToProps = ({
  products,
  articles,
  featuredProducts,
  checkout: { checkoutId },
  lastShopifyFetchTimestamp
}) => ({
  checkoutId,
  products,
  featuredProducts,
  articles,
  lastShopifyFetchTimestamp
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchShopifyProducts: () => dispatch(fetchShopifyProductsAction()),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction()),
  fetchFeaturedProducts: () =>
    dispatch(
      fetchProductCollectionAction(
        queryCollection,
        "featured-products",
        handleDispatchingFeaturedProducts
      )
    ),
  updateShopifyFetchTimestamp: () =>
    dispatch(CartActionCreators.updateShopifyFetchTimestamp()),
  updateShopifyProducts: (productsFromRedux) =>
    dispatch(updateShopifyProductsAction(productsFromRedux)),
  updateFeaturedProducts: (featuredProductsFromRedux) =>
    dispatch(updateFeaturedProductsAction(featuredProductsFromRedux)),
  updateShopifyArticles: (articlesFromRedux) =>
    dispatch(updateShopifyArticlesAction(articlesFromRedux)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
