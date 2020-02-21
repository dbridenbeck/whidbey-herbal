import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as CartActionCreators from "../../state/actions/cart";
import ExceededMaxQuantityWarning from "../../SharedComponents/ExceededMaxQuantityWarning";

const BuyButtonWrapper = styled.div`
  position: relative;
  overflow: visible;
  align-self: flex-start;
  `;

const BuyButtonContainer = styled.button`
  align-self: flex-start;
  display: block;
  box-sizing: border-box;
  width: 150px;
  padding: 5px;
  margin: 1% 0 5px 0;
  color: ${props => (props.isEnabled ? "#e3be42" : "#e34267")};
  text-align: center;
  font-size: 1em;
  font-weight: normal;
  text-decoration: none;
  border: ${props =>
    props.isEnabled ? "3px solid #e3be42" : "3px solid #787878"};
  border-radius: 10px;
  background-color: white;
  transition: opacity 1s ease-in-out;
  &:hover {
    color: ${props => (props.isEnabled ? "white" : "#e34267")};
    background-color: ${props => (props.isEnabled ? "#e3be42" : "white")};
  }
  :focus {
    outline-width: 0;
  }
`;

const BuyButton = ({
  addLineItem,
  updateItemQuantity,
  doesItemExist,
  lineItems,
  maxQuantity,
  selectedProduct,
  quantity
}) => {

  const [buyButtonClicked, setBuyButtonClicked] = useState(false);

  // create buy button
  const createBuyButton = () => {
    const createAddtoCartTransition = () => {
      setBuyButtonClicked(true);
      // reset state so that animation can happen again
      setTimeout( () => setBuyButtonClicked(false), 1000);
    };

    // onClick, button will either addItem or updateQuantity
    const addItem = () => {
      addLineItem(selectedProduct, quantity);
      createAddtoCartTransition();
    };
    const updateQuantity = () => {
      updateItemQuantity(quantity, "add", selectedProduct);
      createAddtoCartTransition();
    };

    const calculateLineItemQuantity = () => {
      if (lineItems.length > 0) {
        return lineItems
          .filter(lineItem => lineItem.handle === selectedProduct.handle)
          .reduce((total, lineItem) => lineItem.quantity, 0);
      } else {
        return 0;
      }
    };

    const lineItemPlusQuantityButton =
      parseInt(quantity, 10) + parseInt(calculateLineItemQuantity(), 10);
    const quantityAllowed =
      maxQuantity - parseInt(calculateLineItemQuantity(), 10);
    const exceededMaxQuantity = lineItemPlusQuantityButton > maxQuantity;

    if (exceededMaxQuantity) {
      return (
        <BuyButtonWrapper>
          <BuyButtonContainer isEnabled={false}>
            Met Item Limit
          </BuyButtonContainer>
          <ExceededMaxQuantityWarning
            buttonQuantity={lineItemPlusQuantityButton}
            maxQuantity={maxQuantity}
          >
            {quantityAllowed
              ? `You may only add ${quantityAllowed} more to cart. If you wish to order more than ${maxQuantity}, Please email hello@whidbeyherbal.com`
              : `Your cart currently has ${maxQuantity} of this item, which is the limit. If you wish to order more than ${maxQuantity}, Please email hello@whidbeyherbal.com`}
          </ExceededMaxQuantityWarning>
        </BuyButtonWrapper>
      );
    } else {
      return (
        <BuyButtonContainer
          className="buyButton"
          isEnabled={true}
          buyButtonClicked={buyButtonClicked}
          onClick={doesItemExist ? updateQuantity : addItem}
        >
          {buyButtonClicked ? `Added to Cart` : `Add to Cart`}
        </BuyButtonContainer>
      );
    }
  };

  // BuyButton component render
  return <div>{createBuyButton()}</div>;
};

BuyButton.propTypes = {
  updateItemQuantity: PropTypes.func,
  addLineItem: PropTypes.func,
  selectedProduct: PropTypes.object,
  doesItemExist: PropTypes.bool,
  quantity: PropTypes.number
}

const mapStateToProps = ({checkout: {lineItems}}) => ({
  lineItems
});

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, shouldAddQuantities, product)),
  addLineItem: (product, quantity) =>
    dispatch(CartActionCreators.addLineItem(product, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton);