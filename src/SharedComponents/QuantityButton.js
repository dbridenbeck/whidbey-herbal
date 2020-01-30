import React from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ExceededMaxQuantityWarning from './ExceededMaxQuantityWarning';

const QuantityWrapper = styled.div`
  align-self: flex-start;
  padding-bottom: 5px;
  /* border: 1px solid red; */
`;

const Quantity = styled.form`
  font-size: 1em;
  flex: 1;
  margin-top: 10px;
  color: #787878;
`;

const StyledInput = styled.input`
  margin: 0 auto;
  border: 1px solid #787878;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
  color: rgba(120, 120, 120, .8);
  :focus {
    outline-width: 0;
  }
  `;

const maxInputToTwenty = (event) => event.target.value > 20 ? 20 : event.target.value

const QuantityButton = 
({
  lineItems,
  quantity, 
  selectedProduct, 
  shouldAddQuantities, 
  labelTitle, 
  onChangeFunction,
}) => {

  return (
    <QuantityWrapper>
      <Quantity>
        <label>
          {labelTitle}
          <StyledInput
            type="number"
            value={parseInt(quantity)}
            min="1"
            max="20"
            onChange={event => {
              onChangeFunction(
                maxInputToTwenty(event),
                shouldAddQuantities,
                selectedProduct
              );
            }}
          />
        </label>
      </Quantity>
      <ExceededMaxQuantityWarning
        buttonQuantity={quantity}
        maxQuantity={20}
      >
        Limit 20 per order
      </ExceededMaxQuantityWarning>
    </QuantityWrapper>
  );
};

const mapStatetoProps = ({checkout: {lineItems}}) => ({
  lineItems
})

export default connect(mapStatetoProps, null)(withRouter(QuantityButton));