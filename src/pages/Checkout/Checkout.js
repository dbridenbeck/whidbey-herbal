import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";
import Wrapper from "../../SharedComponents/Wrapper";
import StyledH1 from "../../SharedComponents/StyledH1";

import { client } from "../../plugins/shopify.js";
import * as CartActionCreators from '../../state/actions/cart';
import LineItems from './LineItems';
import LineItemHeaders from './LineItemHeaders';
import SubtotalSection from './SubtotalSection';
import Products from '../../SharedComponents/Products';

const CheckoutContainer = styled.div`
  display: block;
  position: relative;
`;

const RemoveWrapper = styled.div`
  width: 8.37%;
  button {
    display: block;
    margin: 0 auto;
    height: 35px;
    width: 35px;
    font-size: 1rem;
    color: #e34267;
    border-radius: 50%;
    :focus {
      outline-width: 0;
    }
    :hover {
      background: #e34267;
      color: white;
      border: 1px solid #e34267;
    }
  }
`;

const CheckoutButton = styled.button`
  display: block;
  height: 40px;
  width: 222px;
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

export class Checkout extends Component {
  componentDidMount() {
    const { checkout, updateCheckoutId } = this.props;
     // create the checkout if it doesn't already exist
    if (!checkout.checkoutId) {
      client.checkout.create().then(checkout => {
        updateCheckoutId(checkout.id)
      });
    }
  }

  removeItem = (id, index) => {
    const { removeLineItem } = this.props;
    removeLineItem(id, index);
  }

  createRemoveButton = (id, index) => {
    const { removeLineItem } = this.props;
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
  
  createCheckoutButton = () => {
    const { checkout } = this.props;
    const checkoutId = checkout.checkoutId;
    const lineItemsToAdd = checkout.lineItems.map(
      item => (
        {
          variantId: item.variants.edges[0].node.id,
          quantity: item.quantity
        }
      )
    );

    const goToShopifyCheckout = () => {
      client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(checkout => {
          window.location.href = checkout.webUrl
      })
    }
    
    return (
      <CheckoutButton className="checkout" onClick={(goToShopifyCheckout)}>
        Proceed to Checkout
      </CheckoutButton>
    );
  }

  render() {
    const { checkout, removeLineItem } = this.props;
    const hasItems = (checkout.lineItems.length && checkout.lineItems.length > 0);
    const calculateCartSubtotal = checkout.lineItems.map(lineItem => lineItem.quantity * lineItem.variants.edges[0].node.price)
                          .reduce((cartSubtotal, currentItemSubtotal) => (currentItemSubtotal + cartSubtotal), 0)
                          .toFixed(2);

    const visibleCartSubtotal =
      isNaN(calculateCartSubtotal) ? "0.00" : calculateCartSubtotal;

    return (
      <Wrapper maxWidth={""}>
        <StyledH1 colorIsGrey={false} centered={false}>Checkout</StyledH1>
        {hasItems ? (
          <CheckoutContainer>
            <LineItemHeaders />
            <LineItems
              checkout={checkout}
              createRemoveButton={this.createRemoveButton}
              removeLineItem={removeLineItem}
            />
            <SubtotalSection visibleCartSubtotal={visibleCartSubtotal} createCheckoutButton={this.createCheckoutButton} />
            <Products title="Continue Shopping" />
          </CheckoutContainer>
        ) : (
          <CheckoutContainer>
            <StyledH2>Your Shopping Cart is empty.</StyledH2>
            <Products title="Explore the Shop" />
          </CheckoutContainer>
        )}
      </Wrapper>
    );
  }
};

Checkout.propTypes = {
  checkout: PropTypes.object,
  removeLineItem: PropTypes.func,
  updateCheckoutId: PropTypes.func,
  updateItemQuantity: PropTypes.func,
}

const mapStateToProps = ( {checkout} ) => ({
  checkout
});

const mapDispatchToProps = dispatch => ({
  removeLineItem: (id, index) =>
    dispatch(CartActionCreators.removeLineItem(id, index)),
  updateCheckoutId: id => dispatch(CartActionCreators.updateCheckoutId(id)),
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, shouldAddQuantities, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);