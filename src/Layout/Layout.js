import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import {
  fetchShopifyArticlesAction,
  fetchProductCollectionAction,
  handleDispatchingProducts,
  handleUpdatingProducts,
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
  fetchOnlineStoreCollection,
  fetchShopifyArticles,
  fetchFeaturedProducts,
  updateOnlineStoreCollection,
  updateFeaturedProducts,
  updateShopifyArticles,
  updateShopifyFetchTimestamp,
  lastShopifyFetchTimestamp,
  checkoutId,
  onlineStore,
  articles,
  featuredProducts,
}) => {
  const clearCheckoutIfCompleted = () => {
    checkoutId
      ? client.checkout.fetch(checkoutId).then((checkout) => {
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
  if (!onlineStore.length) {
    console.log("fetching stuff");
    // populate state with products and articles from shopify
    fetchOnlineStoreCollection();
    fetchFeaturedProducts();
    fetchShopifyArticles();
  }

  // if 5 minutes passed and it's not the initial page load,
  // check for updates on products, articles, featured products collection, and update timestamp
  if (
    Date.now() > lastShopifyFetchTimestamp + 300000 &&
    lastShopifyFetchTimestamp !== 0
  ) {
      console.log("trying to update!");
      updateOnlineStoreCollection(onlineStore);
      updateFeaturedProducts(featuredProducts);
      updateShopifyArticles(articles);
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
  onlineStore,
  articles,
  featuredProducts,
  checkout: { checkoutId },
  lastShopifyFetchTimestamp
}) => ({
  checkoutId,
  onlineStore,
  featuredProducts,
  articles,
  lastShopifyFetchTimestamp
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchOnlineStoreCollection: () =>
    dispatch(
      fetchProductCollectionAction("online-store", 7, handleDispatchingProducts)
    ),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction()),
  fetchFeaturedProducts: () =>
    dispatch(
      fetchProductCollectionAction(
        "featured-products",
        5,
        handleDispatchingProducts
      )
    ),
  updateShopifyFetchTimestamp: () =>
    dispatch(CartActionCreators.updateShopifyFetchTimestamp()),
  updateOnlineStoreCollection: (onlineStore) =>
    dispatch(
      fetchProductCollectionAction(
        "online-store",
        7,
        handleUpdatingProducts,
        onlineStore
      )
    ),
  updateFeaturedProducts: (featuredProductsFromRedux) =>
    dispatch(
      fetchProductCollectionAction(
        "featured-products",
        5,
        handleUpdatingProducts,
        featuredProductsFromRedux
      )
    ),
  updateShopifyArticles: (articlesFromRedux) =>
    dispatch(updateShopifyArticlesAction(articlesFromRedux)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
