import React from 'react';
import styled from "styled-components";
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

const maxInputToTwenty = (event, maxQuantity) => event.target.value > maxQuantity ? maxQuantity : event.target.value

const QuantityButton = 
({
  quantity, 
  selectedProduct, 
  shouldAddQuantities, 
  labelTitle, 
  onChangeFunction,
  maxQuantity
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
                maxInputToTwenty(event, maxQuantity),
                shouldAddQuantities,
                selectedProduct
              );
            }}
          />
        </label>
      </Quantity>
      <ExceededMaxQuantityWarning
        buttonQuantity={quantity}
        maxQuantity={maxQuantity}
      >
        Limit {maxQuantity} per order
      </ExceededMaxQuantityWarning>
    </QuantityWrapper>
  );
};


export default QuantityButton;