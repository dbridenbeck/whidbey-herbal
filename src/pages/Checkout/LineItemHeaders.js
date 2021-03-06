import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";

const LineItemHeadersWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  font-size: .625em;
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
  @media ${device.tablet} {
    font-size: 1em;
  }
`;

const LineItemHeaders = () => 
  <LineItemHeadersWrapper>
    <span className="product">Product</span>
    <span className="sixthColumn">Price</span>
    <span className="sixthColumn">Quantity</span>
    <span className="sixthColumn">Total</span>
  </LineItemHeadersWrapper>;

export default LineItemHeaders;