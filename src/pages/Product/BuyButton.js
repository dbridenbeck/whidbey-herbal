import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as CartActionCreators from "../../state/actions/cart";
import ExceededMaxQuantityWarning from "../../SharedComponents/ExceededMaxQuantityWarning";

const BuyButtonWrapper = styled.div`
  position: relative;
  overflow: visible;
  `;

const BuyButtonContainer = styled.button`
  display: block;
  box-sizing: border-box;
  width: 150px;
  padding: 5px;
  margin-bottom: 5px;
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

export class BuyButton extends Component {
  // component state used to handle animation when button is clicked
  constructor(props) {
    super(props);
    this.state = {
      buyButtonClicked: false
    }
  }

// create buy button
  createBuyButton = (product, quantity, props ) => {
    const { addLineItem, updateItemQuantity, doesItemExist, lineItems, maxQuantity } = props;
    const createAddtoCartTransition = () => {
      this.setState({
        buyButtonClicked: true
      })
      // reset state so that animation can happen again
      setTimeout(() => this.setState({
        buyButtonClicked: false
      }), 1000)}

    // onClick, button will either addItem or updateQuantity
    const addItem = () => {
      addLineItem(product, quantity);
      createAddtoCartTransition();
    }
    const updateQuantity = () => {
      updateItemQuantity(quantity, "add", product);
      createAddtoCartTransition();
    }

    const calculateLineItemQuantity = () => {      
      if (lineItems.length > 0) {
        return  lineItems
                  .filter(lineItem => lineItem.handle === product.handle)
                  .reduce((total, lineItem) => lineItem.quantity, 0)
      } else {
        return 0;
      }
    }

    console.log("what is calculateLineItemQuantity", calculateLineItemQuantity());
    
    const lineItemPlusQuantityButton = (parseInt(quantity, 10) + parseInt(calculateLineItemQuantity(), 10));
    const quantityAllowed = maxQuantity - parseInt(calculateLineItemQuantity(), 10);

    const exceededMaxQuantity = lineItemPlusQuantityButton > maxQuantity;
    console.log("what is quantityAllowed", quantityAllowed);

    if (exceededMaxQuantity) {
      return (
        <BuyButtonWrapper>
          <BuyButtonContainer isEnabled={false}>
            Met Item Limit
          </BuyButtonContainer>
          <ExceededMaxQuantityWarning
            buttonQuantity={lineItemPlusQuantityButton}
            maxQuantity={20}
          >
            You may only add {quantityAllowed} more to cart.
          </ExceededMaxQuantityWarning>
        </BuyButtonWrapper>
      );
    } else {
      return (
        <BuyButtonContainer
          className="buyButton"
          isEnabled={true}
          buyButtonClicked={this.state.buyButtonClicked}
          onClick={doesItemExist ? updateQuantity : addItem}
        >
          {this.state.buyButtonClicked ? `Added to Cart` : `Add to Cart`}
        </BuyButtonContainer>
      );
    };
  }


  render() {
    const {selectedProduct, quantity} = this.props;
    return (
      <div>
        {this.createBuyButton(selectedProduct, quantity, this.props)}
      </div>
    )
  }
}

BuyButton.propTypes = {
  updateItemQuantity: PropTypes.func,
  addLineItem: PropTypes.func,
  selectedProduct: PropTypes.object,
  doesItemExist: PropTypes.bool,
  quantity: PropTypes.string
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