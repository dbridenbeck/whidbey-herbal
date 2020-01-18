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
  width: 100%;
  margin-top: 75px;
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
  flex: 1;
`;

const Subtotal = styled.p`
  flex: 1;
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
      <button className="checkout" onClick={(goToShopifyCheckout)}>
        Proceed to Checkout
      </button>
    );
  }

  render() {
    const { checkout, removeLineItem } = this.props;
    const hasItems = (checkout.lineItems.length && checkout.lineItems.length > 0);

    return (
      <CheckoutWrapper>
        <Title>Checkout</Title>
        {hasItems ? (
          <div>
            <LineItemHeaders>
              <ProductHeader>Product</ProductHeader>
              <PriceHeader>Price</PriceHeader>
              <QuantityHeader>Quantity</QuantityHeader>
              <TotalHeader>Total</TotalHeader>
            </LineItemHeaders>
            <LineItems
              checkout={checkout}
              createRemoveButton={this.createRemoveButton}
              createUpdateItemButton={this.createUpdateItemButton}
              removeLineItem={removeLineItem}
            />
            <SubtotalSection>
              <Subtotal></Subtotal>
              <p>Shipping & taxes calculated at checkout</p>
              {this.createCheckoutButton()}
            </SubtotalSection>
          </div>
        ) : (
          <p>No Items Homes </p>
        )}
        <Products title="Continue Shopping" />
        <Footer />
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