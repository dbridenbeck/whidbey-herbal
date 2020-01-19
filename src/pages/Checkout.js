import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../utils/devices";

import { client } from "../plugins/shopify.js";
import * as CartActionCreators from '../state/actions/cart';
import LineItems from '../components/LineItems';
import Products from '../components/Products';
import Footer from '../components/Footer';

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  color: #e3be42;
  font-size: min(max(26px, 5vw), 54px);
  font-weight: normal;
  @media ${device.tablet} {
    margin-top: -4%;
  }
`;

const CheckoutWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  margin-top: 75px;
`;

const CheckoutContainer = styled.div`
  display: block;
  position: relative;
  margin-bottom: 200px;
`;

const LineItemHeaders = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #787878;
`;

const ProductHeader = styled.span`
  width: 33%;
  margin-left: 16.7%;
`;

const PriceHeader = styled.span`
  width: 16.7%;   
`;

const QuantityHeader = styled.span`
  width: 16.7%;
`;

const TotalHeader = styled.span`
  width: 16.7%;
`;

const SubtotalSection = styled.div`
  display: block;
  position: absolute;
  right: 0;
  width: 50%;
  margin: 40px 0;
  .shippingInfo {
    font-size: 12px;
    color: #787878;
    margin: 0;
    padding: 0;
  }
`;

const Subtotal = styled.p`
  height: 25px;
  margin: 0;
  padding: 0;
  color: #787878;
`;

const RemoveButton = styled.button`
  width: 8.37%;
  font-size: 36px;
  background: none;
  border: none;
  color: firebrick;
  :focus {
    outline-width: 0;
  }
`;

const CheckoutButton = styled.button`
  display: block;
  margin: 20px 0;
  font-size: 18px;
  background: none;
  color: #e3be42;
  border: 1px solid #E3BE42;
  border-radius: 10px;
  :focus {
    outline-width: 0;
  }
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
      <RemoveButton
        className="remove"
        onClick={remove}
      >
        x
      </RemoveButton>
    );
  }

  createUpdateItemButton = (product, quantityToUpdate, buttonText) => {
    const { updateItemQuantity } = this.props;
    const updateItem = () => updateItemQuantity(quantityToUpdate, "change", product);
    return (  
      <button
        className="update"
        onClick={updateItem}
      >
        {buttonText}
      </button>
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
    const cartSubtotalAmount = checkout.lineItems.map(lineItem => lineItem.quantity * lineItem.variants.edges[0].node.price)
                          .reduce((cartSubtotal, currentItemSubtotal) => (currentItemSubtotal + cartSubtotal) ,0)
                          .toFixed(2);
    return (
      <CheckoutWrapper>
        <Title>Checkout</Title>
        {hasItems ? (
          <CheckoutContainer>
            <LineItemHeaders>
              <ProductHeader>Product</ProductHeader>
              <PriceHeader>Price</PriceHeader>
              <QuantityHeader>Quantity</QuantityHeader>
              <TotalHeader>Total</TotalHeader>
            </LineItemHeaders>
            <LineItems
              checkout={checkout}
              createRemoveButton={this.createRemoveButton}
              removeLineItem={removeLineItem}
            />
            <SubtotalSection>
              <Subtotal>
                <strong>Subtotal:</strong> ${cartSubtotalAmount}
              </Subtotal>
              <p className="shippingInfo">Shipping & taxes calculated at checkout</p>
              {this.createCheckoutButton()}
            </SubtotalSection>
          </CheckoutContainer>
        ) : (
          <p>No Items Homes </p>
        )}
        <Products title="Continue Shopping" />
      </CheckoutWrapper>
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
  updateItemQuantity: (quantityToUpdate, updateType, product) =>
    dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, updateType, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);