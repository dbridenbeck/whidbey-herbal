import React from 'react';
import styled from "styled-components";

 const ExceededMaxQuantity = styled.span`
    display: block;
    opacity: ${props => props.buttonQuantity >= props.maxQuantity ? "1" : "0"};
    height: 10px;
    min-width: 100px;
    color: red;
    font-style: italic;
    font-size: 0.75em;
    /* opacity: ${props => (props.quantity > 20 ? "1" : "0")}; */
`;

const ExceededMaxQuantityWarning = ({buttonQuantity, maxQuantity}) => {
  return (
      <ExceededMaxQuantity 
        buttonQuantity={buttonQuantity}
        maxQuantity={maxQuantity}
      >
        Limit {maxQuantity} per order</ExceededMaxQuantity>
  );
};

export default ExceededMaxQuantityWarning;