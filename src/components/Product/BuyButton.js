import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as CartActionCreators from '../../state/actions/cart';
import ExceededMaxQuantityWarning from '../../SharedComponents/ExceededMaxQuantityWarning';

const BuyButtonWrapper = styled.div`
  position: relative;
  overflow: visible;
  align-self: flex-start;
  .addedToCartAlert {
    display: block;
    position: absolute;
    width: 150px;
    top: ${(props) => (props.buyButtonClicked ? '-25px' : '-15px')};
    left: 50%;
    z-index: 1;
    margin: 0 0 0 -75px;
    padding: 2px 0;
    color: #2e2e2e;
    font-size: 0.725rem;
    text-align: center;
    background-color: rgba(277, 190, 66, 0.33);
    border-radius: 10px;
    opacity: ${(props) => (props.buyButtonClicked ? '1' : '0')};
    transition: all 0.75s ease-in-out;
  }
`;

const BuyButtonContainer = styled.button`
  align-self: flex-start;
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 150px;
  padding: 5px;
  margin: 1% 0 5px 0;
  color: ${(props) => (props.exceededMaxQuantity ? '#e3be42' : '#e34267')};
  text-align: center;
  font-size: 1em;
  font-weight: normal;
  text-decoration: none;
  border: ${(props) =>
    props.exceededMaxQuantity ? '3px solid #e3be42' : '3px solid #787878'};
  border-radius: 10px;
  background-color: white;
  z-index: 5;
  &:hover {
    color: ${(props) => (props.exceededMaxQuantity ? 'white' : '#e34267')};
    background-color: ${(props) =>
      props.exceededMaxQuantity ? '#e3be42' : 'white'};
  }
  :focus {
    outline: none;
  }
  :focus-visible {
    outline-width: 5px solid red;
  }
`;

const BuyButton = ({
  addLineItem,
  updateItemQuantity,
  doesItemExist,
  maxQuantity,
  selectedProduct,
  quantity,
  quantityAllowed,
  lineItemPlusQuantityButton,
}) => {
  const [buyButtonClicked, setBuyButtonClicked] = useState(false);

  // create buy button
  const createBuyButton = () => {
    const createAddtoCartTransition = () => {
      setBuyButtonClicked(true);
      // reset state so that animation can happen again
      setTimeout(() => setBuyButtonClicked(false), 750);
    };

    // onClick, button will either addItem or updateQuantity
    const addItem = () => {
      addLineItem(selectedProduct, quantity);
      createAddtoCartTransition();
    };
    const updateQuantity = () => {
      updateItemQuantity(quantity, 'add', selectedProduct);
      createAddtoCartTransition();
    };

    const exceededMaxQuantity = lineItemPlusQuantityButton > maxQuantity;

    if (exceededMaxQuantity) {
      return (
        <BuyButtonWrapper buyButtonClicked={buyButtonClicked}>
          <span className="addedToCartAlert">Added!</span>
          <BuyButtonContainer
            exceededMaxQuantity={!exceededMaxQuantity}
            disabled={true}
          >
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
        <BuyButtonWrapper buyButtonClicked={buyButtonClicked}>
          <span className="addedToCartAlert">Added!</span>
          <BuyButtonContainer
            className="buyButton"
            exceededMaxQuantity={!exceededMaxQuantity}
            buyButtonClicked={buyButtonClicked}
            onClick={doesItemExist ? updateQuantity : addItem}
          >
            Add to Cart
          </BuyButtonContainer>
        </BuyButtonWrapper>
      );
    }
  };

  // BuyButton component render
  return <div>{createBuyButton()}</div>;
};

BuyButton.propTypes = {
  addLineItem: PropTypes.func,
  updateItemQuantity: PropTypes.func,
  doesItemExist: PropTypes.bool,
  maxQuantity: PropTypes.number,
  selectedProduct: PropTypes.object,
  quantity: PropTypes.number,
  quantityAllowed: PropTypes.number,
  lineItemPlusQuantityButton: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(
      CartActionCreators.updateItemQuantity(
        quantityToUpdate,
        shouldAddQuantities,
        product
      )
    ),
  addLineItem: (product, quantity) =>
    dispatch(CartActionCreators.addLineItem(product, quantity)),
});

export default connect(null, mapDispatchToProps)(BuyButton);
