import React from 'react';
import styled from "styled-components";

 const ExceededMaxQuantity = styled.span`
    display: block;
    opacity: ${props => props.buttonQuantity >= props.maxQuantity ? "1" : "0"};
    min-width: 100px;
    max-width: 150px;
    height: 0px;
    /* margin-top: 5px; */
    color: red;
    font-style: italic;
    font-size: 0.75em;
    line-height: 1.1em;
`;

const ExceededMaxQuantityWarning = ({buttonQuantity, maxQuantity, children}) => {
  return (
      <ExceededMaxQuantity 
        buttonQuantity={buttonQuantity}
        maxQuantity={maxQuantity}
      >
      {children}
      </ExceededMaxQuantity>
  );
};

export default ExceededMaxQuantityWarning;