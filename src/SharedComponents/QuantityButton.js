import React from 'react';
import styled from "styled-components";
import ExceededMaxQuantityWarning from './ExceededMaxQuantityWarning';

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

const QuantityButton = ({quantity, selectedProduct, shouldAddQuantities, labelTitle, onChangeFunction}) => {
  return (
    <div>
      <Quantity>
        <label>
          {labelTitle}
          <StyledInput
            type="number"
            value={quantity}
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
      <ExceededMaxQuantityWarning buttonQuantity={quantity} maxQuantity={20} />
    </div>
  );
};

export default QuantityButton;