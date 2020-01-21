import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { device } from "../../utils/devices";
import * as CartActionCreators from "../../state/actions/cart";

import QuantityButton from '../../SharedComponents/QuantityButton';

const LineItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #787878;
  font-size: 16px;
  border-top: 1px solid #C0C0C0;
  :last-child {
    border-bottom: 2px solid #e3be42;
  }
  @media ${device.tablet} {
    height: 70px;
  }
`;

const ProductImgContainer = styled.div`
  width: 8.37%;
`;

const ProductImg = styled.img`
  display: block;
  width: 100%;
  max-width: 47px;
  max-height: 47px;
  margin: 0 auto;
`;

const ProductTitle = styled.h3`
  width: 33%;
  font-size: 18px;
  font-weight: normal;
  line-height: 22px;
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
  updateItemQuantity
}) => {

  const total = lineItem.quantity 
                ? (lineItem.quantity * lineItem.variants.edges[0].node.price).toFixed(2) 
                : "0.00";

  return (
    <LineItemWrapper key={lineItem.id}>
      {createRemoveButton(lineItem.id, index)}
      <ProductImgContainer>
        <ProductImg src={lineItem.images.edges[0].node.src}/>
      </ProductImgContainer>
      <ProductTitle>{lineItem.title}</ProductTitle>
      <ProductPrice>${lineItem.variants.edges[0].node.price}</ProductPrice>
      <QuantityButton 
        selectedProduct={lineItem} 
        quantity={lineItem.quantity} 
        shouldAddQuantities={false} 
        onChangeFunction={updateItemQuantity}
      />
      <ProductTotal>${total}</ProductTotal>
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
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) => dispatch(CartActionCreators.updateItemQuantity(quantityToUpdate, shouldAddQuantities, product))
})

export default connect(null, mapDispatchtoProps)(LineItem);