import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as CartActionCreators from "../state/actions/cart";

const BuyButtonContainer = styled.button`
  display: block;
  box-sizing: border-box;
  width: 150px;
  height: 40%;
  padding: 5px;
  color: ${props =>
    (props.buyButtonClicked ? "white" : "#e3be42")};
  text-align: center;
  font-size: 1em;
  font-weight: normal;
  text-decoration: none;
  border: 3px solid #e3be42;
  border-radius: 10px;
  background-color: ${props => 
    (props.buyButtonClicked ? "#42E2BD" : "white")};
  transition: opacity 1s ease-in-out;
  &:hover {
    color: white;
    background-color: ${props =>
      (props.buyButtonClicked ? "#42E2BD" : "#e3be42")};
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
    const { addLineItem, updateItemQuantity, doesItemExist } = props
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

    return (
      <BuyButtonContainer
        className="buyButton"
        buyButtonClicked={this.state.buyButtonClicked}
        onClick={doesItemExist ? updateQuantity : addItem}
      >
        {this.state.buyButtonClicked ? `Added to Cart` : `Add to Cart`}
      </BuyButtonContainer>
    );
  };

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

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, shouldAddQuantities, product)),
  addLineItem: (product, quantity) =>
    dispatch(CartActionCreators.addLineItem(product, quantity))
});

export default connect(null, mapDispatchToProps)(BuyButton);