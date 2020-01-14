import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from "../state/actions/cart";
import fetchProductsAction from '../state/fetchProducts';
import styled from "styled-components";
import Header from "./Header"
import Footer from "./Footer"

const MainWrapper = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  display: block;
  width: 100%;
  max-width: 1000px;
`;

const Layout = ({
  children,
  clearCheckoutInState,
  fetchProducts,
  checkout
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
    // if checkout has been completed, clear checkout in state
    clearCheckoutIfCompleted();
    // populate state with products from shopify
    fetchProducts();
  }, []);

    return (
      <div>
          <Header />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
      </div>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkout: PropTypes.shape({
    lineItems: PropTypes.array,
    checkoutId: PropTypes.string
  }),
  clearCheckoutInState: PropTypes.func,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = ( {checkout} ) => ({
  checkout
});

const mapDispatchToProps = dispatch => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchProducts: () => dispatch(fetchProductsAction()),
  clearBurger: () => dispatch(CartActionCreators.clearBurger()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);