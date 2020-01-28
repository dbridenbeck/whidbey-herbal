import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from "../state/actions/cart";
import { fetchShopifyProductsAction, fetchShopifyArticlesAction } from '../state/fetchShopifyData';
import styled from "styled-components";
import Header from "./Header"

const MasterWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto 120px auto;
  padding: 50px 20px 0 20px;
`;

const Layout = ({
  children,
  clearCheckoutInState,
  fetchShopifyProducts,
  fetchShopifyArticles,
  checkoutId
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

  useEffect(() => {
    // if checkout has been completed, clear checkout in state
    clearCheckoutIfCompleted();
    // populate state with products and articles from shopify
    fetchShopifyProducts();
    fetchShopifyArticles();
  }, []);

  return (
    <div>
      <Header />
      <MasterWrapper id="home">{children}</MasterWrapper>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkoutId: PropTypes.string,
  clearCheckoutInState: PropTypes.func,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = ( {checkout: {checkoutId}} ) => ({
  checkoutId
});

const mapDispatchToProps = dispatch => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchShopifyProducts: () => dispatch(fetchShopifyProductsAction()),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);