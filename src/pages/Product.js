import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";

const Product = ( { checkout, products, updateItemQuantity, addLineItem, match } ) => {
  const { handle } = match.params;

  const selectProduct = products.filter( product => handle === product.handle );
  const selectedProduct = selectProduct[0];

  const doesItemExist = checkout.lineItems.filter(
    lineItem => lineItem.id === selectedProduct.id
  );

  const createBuyButton = (product, quantity, buttonText) => {
    const addItem = () => addLineItem(product, quantity);
    const updateQuantity = () => updateItemQuantity(product, quantity);
    
    return (
      <button
        className="buyButton"
        onClick={doesItemExist.length ? updateQuantity : addItem}
      >
        {buttonText}
      </button>
    );
  }

  return (
    <div>
      <h1>{selectedProduct.title}</h1>
      <div>{selectedProduct.description}</div>
      {/* if the item exists update lineItem quantity, otherwise add new lineItem */}
      {createBuyButton(selectedProduct, 1, `$${selectedProduct.variants[0].price}`)}  
    </div>
  );
};

Product.propTypes = {
  checkout: PropTypes.object,
  products: PropTypes.array,
  updateItemQuantity: PropTypes.func,
  addLineItem: PropTypes.func,
};

const mapStateToProps = ({checkout, products}) => ({
  checkout,
  products
});

const mapDispatchToProps = dispatch => ({
  updateItemQuantity: (product, quantityToUpdate) =>
    dispatch(CartActionCreators.updateItemQuantity(product, quantityToUpdate)),
  addLineItem: (product, quantity) =>
    dispatch(CartActionCreators.addLineItem(product, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
