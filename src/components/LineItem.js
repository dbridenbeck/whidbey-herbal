import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as CartActionCreators from "../state/actions/cart";

import QuantityButton from './QuantityButton';

const LineItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #787878;
  font-size: 16px;
  border-top: 1px solid #787878;
  :last-child {
    border-bottom: 2px solid #e3be42;
  }
`;

const ProductImg = styled.img`
  width: 8.37%;
  max-width: 50px;
  max-height: 50px;
`;

const ProductTitle = styled.h3`
  width: 33%;
  font-size: 18px;
  font-weight: normal;
  color: #e3be42;
`;

const ProductPrice = styled.span`
  width: 16.7%;
`;

const ProductTotal = styled.span`
  width: 16.7%;
  text-align: right;
`;

const LineItem = ({
  lineItem,
  index,
  createRemoveButton,
  removeLineItem,
  updateItemQuantity
}) => {

  return (
    <LineItemWrapper key={lineItem.id}>
      {createRemoveButton(lineItem.id, index)}
      <ProductImg src={lineItem.images.edges[0].node.src}/>
      <ProductTitle>{lineItem.title}</ProductTitle>
      <ProductPrice>${lineItem.variants.edges[0].node.price}</ProductPrice>
      <QuantityButton 
        selectedProduct={lineItem} 
        quantity={lineItem.quantity} 
        updateType={"change"} 
        onChangeFunction={updateItemQuantity}
      />
      <ProductTotal>${(lineItem.quantity * lineItem.variants.edges[0].node.price).toFixed(2)}</ProductTotal>
    </LineItemWrapper>
  );
};

LineItem.propTypes = {
  lineItem: PropTypes.object,
  index: PropTypes.number,
  createRemoveButton: PropTypes.func,
  removeLineItem: PropTypes.func,
}

const mapDispatchtoProps = (dispatch) => ({
  updateItemQuantity: (quantityToUpdate, updateType, product) => dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, updateType, product))
})

export default connect(null, mapDispatchtoProps)(LineItem);