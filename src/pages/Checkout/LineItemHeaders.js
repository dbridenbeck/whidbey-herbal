import React from 'react';
import styled from "styled-components";

const LineItemHeadersWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  font-size: 1em;
  font-weight: bold;
  color: #787878;
  border-bottom: 1px solid #c0c0c0;
  .product {
    width: 33.33%;  
    margin-left: 16.7%;
  }
  .sixthColumn {
    width: 16.7%;
  }
`;

const LineItemHeaders = () => 
  <LineItemHeadersWrapper>
    <span class="product">Product</span>
    <span class="sixthColumn">Price</span>
    <span class="sixthColumn">Quantity</span>
    <span class="sixthColumn">Total</span>
  </LineItemHeadersWrapper>;

export default LineItemHeaders;