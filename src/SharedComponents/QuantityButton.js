import React from 'react';
import styled from "styled-components";

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
 const ExceededMaxQuantity = styled.span`
    display: block;
    opacity: ${props => props.quantity >= "20" ? "1" : "0"};
    height: 10px;
    min-width: 100px;
    color: red;
    font-style: italic;
    font-size: 0.75em;
    /* opacity: ${props => props.quantity > 20 ? "1" : "0"}; */
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
              onChangeFunction( maxInputToTwenty(event), shouldAddQuantities, selectedProduct );
            }}
          />
        </label>
      </Quantity>
      <ExceededMaxQuantity quantity={quantity}>Limit 20 per order</ExceededMaxQuantity>
    </div>
  );
};

export default QuantityButton;