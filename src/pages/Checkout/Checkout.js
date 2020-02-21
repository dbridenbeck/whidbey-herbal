import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";
import StyledH1 from "../../SharedComponents/StyledH1";
import { device } from "../../utils/devices";

import { client } from "../../plugins/shopify.js";
import * as CartActionCreators from '../../state/actions/cart';
import LineItems from './LineItems';
import LineItemHeaders from './LineItemHeaders';
import SubtotalSection from './SubtotalSection';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';
import Footer from "../../SharedComponents/Footer";

const CheckoutContainer = styled.div`
  display: block;
  position: relative;
`;

const RemoveWrapper = styled.div`
  display: block;
  box-sizing: border-box;
  width: 8.37%;
  button {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    padding: 0;
    height: 100%;
    width: 100%;
    max-width: 25px;
    font-size: 1rem;
    color: #e34267;
    border: 1px solid #787878;
    border-radius: 50%;
    background: none;
    :focus {
      outline-width: 0;
    }
    :hover {
      background: #e34267;
      color: white;
      border: 1px solid #e34267;
    }
    @media ${device.tablet} {
      height: 35px;
      max-width: 35px;
    }
  }
`;

const CheckoutButton = styled.button`
  display: block;
  height: 40px;
  min-width: 222px;
  margin: 20px 0;
  font-size: 1.125em;
  background: none;
  color: #e3be42;
  border: 1px solid #e3be42;
  border-radius: 10px;
  :focus {
    outline-width: 0;
  }
  :hover {
    color: white;
    background-color: #E3BE42;
  }
`;

const StyledH2 = styled.h2`
  color: #787878;
  font-weight: normal;
`;

const Checkout = ({lineItems, removeLineItem, updateCheckoutId }) => {

  const createRemoveButton = (id, index) => {
    const remove = () => removeLineItem(id, index);
    return (  
      <RemoveWrapper>
        <button
          className="remove"
          onClick={remove}
        >
        x
        </button>
      </RemoveWrapper>
    );
  }
  
  const createCheckout = (lineItemsToAdd) => async () => {
    try {
      const checkout = await client.checkout.create();
      await updateCheckoutId(checkout.id);
      await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      window.location.assign(`${checkout.webUrl}`)
    } catch (error) {
      console.log("Error creating checkout: ", error);
    }
  }
  
  const createCheckoutButton = () => {
    const createLineItemObject = item => ({
      variantId: item.variants.edges[0].node.id,
      quantity: item.quantity
    });
    const lineItemsToAdd = lineItems.map(createLineItemObject);
    const checkout = createCheckout(lineItemsToAdd);
    
    return (
      <CheckoutButton className="checkout" onClick={checkout}>
        Proceed to Checkout
      </CheckoutButton>
    );
  }
  
  const createCheckoutContainer = () => {
    const hasItems = (lineItems.length && lineItems.length > 0);
    const calculatedCartSubtotal = 
      lineItems.map(lineItem => lineItem.quantity * lineItem.variants.edges[0].node.price)
        .filter(Boolean)
        .reduce((cartSubtotal, currentItemSubtotal) => (currentItemSubtotal + cartSubtotal), 0)
        .toFixed(2);
    
    return (
      hasItems ? 
      (
        <CheckoutContainer>
          <LineItemHeaders />
          <LineItems
            items={lineItems}
            createRemoveButton={createRemoveButton}
          />
          <SubtotalSection
            calculatedCartSubtotal={calculatedCartSubtotal}
            createCheckoutButton={createCheckoutButton}
          />
          <FeaturedProducts title={"Continue Shopping"} />
        </CheckoutContainer>
      ) : (
        <CheckoutContainer>
          <StyledH2>Your Shopping Cart is empty.</StyledH2>
          <FeaturedProducts title={"Explore the Shop"} />
        </CheckoutContainer>
      )
    )
  }

    return (
      <>
        <StyledH1 colorIsGrey={false} centered={false}>
          Checkout
        </StyledH1>
        {createCheckoutContainer()}
        <Footer />
      </>
    );
};

Checkout.propTypes = {
  lineItems: PropTypes.array,
  checkoutId: PropTypes.string,
  removeLineItem: PropTypes.func,
  updateCheckoutId: PropTypes.func,
  updateItemQuantity: PropTypes.func,
}

const mapStateToProps = ( {checkout: {lineItems, checkoutId}} ) => ({
  lineItems,
  checkoutId
});

const mapDispatchToProps = dispatch => ({
  removeLineItem: (id, index) =>
    dispatch(CartActionCreators.removeLineItem(id, index)),
  updateCheckoutId: id => dispatch(CartActionCreators.updateCheckoutId(id)),
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, shouldAddQuantities, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);