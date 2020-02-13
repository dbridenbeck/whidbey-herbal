import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";
import PageWrapper from "../../SharedComponents/PageWrapper";
import StyledH1 from "../../SharedComponents/StyledH1";
import { device } from "../../utils/devices";

import { client } from "../../plugins/shopify.js";
import * as CartActionCreators from '../../state/actions/cart';
import LineItems from './LineItems';
import LineItemHeaders from './LineItemHeaders';
import SubtotalSection from './SubtotalSection';
import FeaturedProducts from '../../SharedComponents/FeaturedProducts';

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

export class Checkout extends PureComponent {
  constructor(props) {
    super(props)
    this.createRemoveButton = this.createRemoveButton.bind(this);
    this.createCheckoutButton = this.createCheckoutButton.bind(this);
    this.createCheckoutContainer = this.createCheckoutContainer.bind(this);
  }

  componentDidMount() {
    const { checkoutId, updateCheckoutId } = this.props;
     // create the checkout if it doesn't already exist
    if (!checkoutId) {
      client.checkout.create().then(checkout => {
        updateCheckoutId(checkout.id)
      });
    }
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
    const { lineItems, checkoutId, updateCheckoutId } = this.props;
    const lineItemsToAdd = lineItems.map(
      item => (
        {
          variantId: item.variants.edges[0].node.id,
          quantity: item.quantity
        }
      )
    );

    const goToShopifyCheckout = () => {
      client.checkout
      // update checkoutId to ensure that a fresh checkout is used
      // this avoids the edge case where a user checks out but doesn't finish
      // and then returns to the store to update their cart and re-checkout
        .create().then(checkout => {
          updateCheckoutId(checkout.id)
        })
        .then(client.checkout.addLineItems(checkoutId, lineItemsToAdd)
        .then(checkout => {
          window.location.href = checkout.webUrl
      }))
    };  
    return (
      <CheckoutButton className="checkout" onClick={(goToShopifyCheckout)}>
        Proceed to Checkout
      </CheckoutButton>
    );
  }

  createCheckoutContainer = () => {
    const { lineItems } = this.props;
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
            createRemoveButton={this.createRemoveButton}
          />
          <SubtotalSection
            calculatedCartSubtotal={calculatedCartSubtotal}
            createCheckoutButton={this.createCheckoutButton}
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

  render() {
    return (
      <PageWrapper maxWidth={""}>
        <StyledH1 colorIsGrey={false} centered={false}>
          Checkout
        </StyledH1>
        {this.createCheckoutContainer()}
      </PageWrapper>
    );
  }
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