import React from 'react';
import styled from "styled-components";

const Quantity = styled.form`
  font-size: 18px;
  color: #787878;
`;

const StyledInput = styled.input`
  width:  50px;
  height: 30px;
  margin: 0 auto;
  border: 1px solid #787878;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  color: rgba(120, 120, 120, .8);
  :focus {
    outline-width: 0;
  }
`;

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
              onChangeFunction(event.target.value, shouldAddQuantities, selectedProduct);
            }}
          />
        </label>
      </Quantity>
    </div>
  );
};

export default QuantityButton;