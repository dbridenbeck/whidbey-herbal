import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from "../state/actions/cart";
import { fetchShopifyProductsAction, fetchShopifyArticlesAction } from '../state/fetchShopifyData';
import ComponentWrapper from '../SharedComponents/ComponentWrapper';
import Footer from '../SharedComponents/Footer';
import styled from "styled-components";
import Header from "./Header"

const MasterWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: ${props => props.height};
  max-width: 1200px;
  margin: 0px auto 120px auto;
  padding: 0px 20px 0 20px;
`;

const Layout = ({
  children,
  clearCheckoutInState,
  fetchShopifyProducts,
  fetchShopifyArticles,
  checkoutId,
  products
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

  // if products haven't been fetched, fetch them
  if (!products.length) {
    // if checkout has been completed, clear checkout in state
    clearCheckoutIfCompleted();
    // populate state with products and articles from shopify
    fetchShopifyProducts();
    fetchShopifyArticles();
  }

  // calculate document height to keep footer at bottom of page
  const height = document.documentElement.scrollHeight;

  return (
    <>
      <MasterWrapper id='MasterWrapper' height={height}>
        <Header />
        <ComponentWrapper id="home" maxWidth={"1200px"}>{children}</ComponentWrapper>
      </MasterWrapper>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkoutId: PropTypes.string,
  clearCheckoutInState: PropTypes.func,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = ( {products, checkout: {checkoutId}} ) => ({
  checkoutId,
  products
});

const mapDispatchToProps = dispatch => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchShopifyProducts: () => dispatch(fetchShopifyProductsAction()),
  fetchShopifyArticles: () => dispatch(fetchShopifyArticlesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));