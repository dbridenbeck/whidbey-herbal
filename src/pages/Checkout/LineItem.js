import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { device } from "../../utils/devices";
import { createCurrencyFormat } from "../../utils/createCurrencyFormat";
import * as CartActionCreators from "../../state/actions/cart";

import QuantityButton from '../../SharedComponents/QuantityButton';

const LineItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 65px;
  width: 100%;
  color: #787878;
  font-size: 0.875em;
  border-top: 1px solid #C0C0C0;
  .twelvethColumn {
    display: block;
    width: 8.37%;
  }
  .sixthColumn {
    display: block;
    max-height: 21px;
    margin: 0;
    padding: 0;
    width: 16.67%;
  }
  :last-child {
    border-bottom: 2px solid #e3be42;
  }
  @media ${device.tablet} {
    height: 70px;
  }
`;

const ProductImg = styled.img`
  display: block;
  width: 100%;
  max-width: 47px;
  max-height: 47px;
  margin: 0 auto;
`;

const ProductTitleLink = styled(Link)`
  width: 33%;
  font-weight: normal;
  color: #e3be42;
  text-decoration: none;
  line-height: 1.125em;
  padding: 0 5px;
  :hover {
    color: #787878;
  }
`;

const LineItem = ({
  lineItem,
  index,
  createRemoveButton,
  updateItemQuantity,
  clearHeroImg
}) => {

  const roughTotal = lineItem.quantity
    ? (lineItem.quantity * lineItem.variants.edges[0].node.priceV2.amount)
    : "0.00";

  const currencyTotal = createCurrencyFormat(roughTotal);
  const lineItemCurrency = createCurrencyFormat(
    lineItem.variants.edges[0].node.priceV2.amount
  );

  return (
    <LineItemWrapper key={lineItem.id}>
      {createRemoveButton(lineItem.id, index)}
      <div className="twelvethColumn">
        <ProductImg src={lineItem.images.edges[0].node.transformedSrc} />
      </div>
      <ProductTitleLink
        to={`/product/${lineItem.handle}`}
        onClick={clearHeroImg}
      >
        {lineItem.title}
      </ProductTitleLink>
      <span className="sixthColumn">{lineItemCurrency}</span>
      <div className="sixthColumn">
        <QuantityButton
          selectedProduct={lineItem}
          quantity={lineItem.quantity}
          shouldAddQuantities={false}
          onChangeFunction={updateItemQuantity}
          maxQuantity={lineItem.totalInventory}
        />
      </div>
      <span className="sixthColumn">{currencyTotal}</span>
    </LineItemWrapper>
  );
};

LineItem.propTypes = {
  lineItem: PropTypes.object,
  index: PropTypes.number,
  createRemoveButton: PropTypes.func,
  removeLineItem: PropTypes.func,
}

const mapDispatchtoProps = dispatch => ({
  updateItemQuantity: (quantityToUpdate, shouldAddQuantities, product) =>
    dispatch(
      CartActionCreators.updateItemQuantity(
        quantityToUpdate,
        shouldAddQuantities,
        product
      )
    ),
  clearHeroImg: () => dispatch(CartActionCreators.clearHeroImg())
});

export default connect(null, mapDispatchtoProps)(LineItem);