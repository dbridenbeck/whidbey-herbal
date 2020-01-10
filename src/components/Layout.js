import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../plugins/shopify.js";
import * as CartActionCreators from "../state/actions/cart";
import fetchProductsAction from '../state/fetchProducts';
import styled from "styled-components";
import Header from "./Header"
import Spinner from "./Spinner"
import Footer from "./Footer"

const MainWrapper = styled.div`
  margin: 0 20px;
  padding: 0;
  border: 0;
`;

const Layout = ({
  children,
  clearCheckoutInState,
  clearBurger,
  fetchProducts,
  Reducer1
}) => {
  const clearCheckoutIfCompleted = () => {
    Reducer1.checkout.checkoutId
      ? client.checkout.fetch(Reducer1.checkout.checkoutId).then(checkout => {
          if (checkout.completedAt) {
            clearCheckoutInState();
          }
        })
      : console.log("checkout doesn't exist");
  };

  useEffect(() => {
    // if checkoutId has been completed, clear localStorage
    clearCheckoutIfCompleted();
    // fetch products from shopify into
    fetchProducts();
    // clear burgerClickedOnce from redux, to avoid MobileNavPanel from animating on load
    clearBurger();
  }, []);

  if (Reducer1.pending) {
    return <Spinner />;
  } else {
    return (
      <div>
        {Reducer1.pending ? <Spinner /> : null}
          <Header />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
      </div>
    );
  }
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = ( Reducer1 ) => ({
  Reducer1
});

const mapDispatchToProps = dispatch => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
  fetchProducts: () => dispatch(fetchProductsAction()),
  clearBurger: () => dispatch(CartActionCreators.clearBurger()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);