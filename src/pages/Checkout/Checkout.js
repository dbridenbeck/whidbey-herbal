import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../../utils/devices";
import Wrapper from "../../SharedComponents/Wrapper";
import StyledH1 from "../../SharedComponents/StyledH1";

import { client } from "../../plugins/shopify.js";
import * as CartActionCreators from '../../state/actions/cart';
import LineItems from './LineItems';
import Products from '../../SharedComponents/Products';

const CheckoutContainer = styled.div`
  display: block;
  position: relative;
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
  border-bottom: 1px solid #c0c0c0;
`;

const ProductHeader = styled.span`
  width: 33.33%;
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

const SubtotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const SubtotalSection = styled.div`
  display: block;
  margin: 40px 20px 0 0;
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
  width: 6%;
  height: 70%;
  margin: 1.19%;
  font-size: 24px;
  text-align: center;
  background: none;
  border: 1px solid #c0c0c0;
  border-radius: 50%;
  color: #787878;
  :focus {
    outline-width: 0;
  }
  :hover {
    background: #c0c0c0;
    color: white;
  }
  @media ${device.tablet} {
    height: 60%;
    width: 5%;
    margin: 1.69%;
  }
  @media ${device.laptop} {
    width: 4%;
    margin: 2.19%;
  }
`;

const CheckoutButton = styled.button`
  display: block;
  height: 40px;
  width: 222px;
  margin: 20px 0;
  font-size: 18px;
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
      <RemoveButton
        className="remove"
        onClick={remove}
      >
        x
      </RemoveButton>
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

    console.log("calculateCartSubtotal is: ", calculateCartSubtotal);

    const visibleCartSubtotal =
      isNaN(calculateCartSubtotal) ? "0.00" : calculateCartSubtotal;

    console.log("visibleCartSubtotal is: ", visibleCartSubtotal);

    return (
      <Wrapper maxWidth={""}>
        <StyledH1 colorIsGrey={false} centered={false}>Checkout</StyledH1>
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
            <SubtotalContainer>
              <SubtotalSection>
                <Subtotal>
                  <strong>Subtotal:</strong> ${visibleCartSubtotal}
                </Subtotal>
                <p className="shippingInfo">
                  Shipping & taxes calculated at checkout
                </p>
                {this.createCheckoutButton()}
              </SubtotalSection>
            </SubtotalContainer>
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