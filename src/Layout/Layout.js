import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from "../state/actions/cart";
import {
  fetchShopifyProductsAction,
  fetchShopifyArticlesAction,
  fetchFeaturedProductsAction,
  updateShopifyProductsAction,
  updateFeaturedProductsAction,
  updateShopifyArticlesAction
} from "../state/fetchShopifyData";
import styled from "styled-components";
import Header from "./Header"

const MasterWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 60px auto 0px auto;
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

  // every time Layout is rendered, check shopify to see if articles, collection, or products have changed
  // if so, update redux with the new information from shopify
  useEffect(() => {
    updateShopifyProducts(products);
    updateShopifyArticles(articles);
    updateFeaturedProducts(featuredProducts);
  }, [])

  return (
    <>
      <MasterWrapper id='MasterWrapper'>
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
  fetchProducts: PropTypes.func,
};

const mapStateToProps = ( {products, articles, featuredProducts, checkout: {checkoutId}} ) => ({
  checkoutId,
  products,
  featuredProducts,
  articles
});

const mapDispatchToProps = dispatch => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchShopifyProducts: () => dispatch(fetchShopifyProductsAction()),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction()),
  fetchFeaturedProducts: () => dispatch(fetchFeaturedProductsAction()),
  updateShopifyProducts: productsFromRedux =>
    dispatch(updateShopifyProductsAction(productsFromRedux)),
  updateFeaturedProducts: featuredProductsFromRedux =>
    dispatch(updateFeaturedProductsAction(featuredProductsFromRedux)),
  updateShopifyArticles: articlesFromRedux =>
    dispatch(updateShopifyArticlesAction(articlesFromRedux))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));