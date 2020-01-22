import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from "../state/actions/cart";
import { fetchShopifyProductsAction, fetchShopifyArticlesAction } from '../state/fetchShopifyData';
import Wrapper from '../SharedComponents/Wrapper';
import Header from "./Header"
import Footer from "./Footer"

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
    console.log("useEffect fired from layout!")
    // if checkout has been completed, clear checkout in state
    clearCheckoutIfCompleted();
    // populate state with products and articles from shopify
    fetchShopifyProducts();
    fetchShopifyArticles();
  }, []);

  return (
    <div>
      <Header />
      <Wrapper maxWidth={"1200px"} id="home">{children}</Wrapper>
      <Footer />
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