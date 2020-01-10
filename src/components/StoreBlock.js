import React from 'react';
import styled from "styled-components";
import { device } from "../utils/devices";
import { fluidH2 } from "../utils/responsiveSCSS";

const StoreBlock = ({store}) => {

  const StoreName = styled.h2`
    margin-bottom: 5px;
    padding: 0;
    font-weight: normal;
    ${fluidH2}
    letter-spacing: 0.01em;
    color: #787878;
    @media ${device.tablet} {
      height: 35px;
    }
    `;

  const StoreContainer = styled.div`
      position: relative;
      width: 40%;
      height: 75px;
      flex-grow: 1;
      margin: 0 20px 20px 0;
      &:hover ${StoreName} {
        color: #e3be42;
      }
      @media ${device.tablet} {
        width: 100%;
      }
      @media ${device.laptop} {
        width: 100%;
      }
    `;
  
  const StoreAddress = styled.p`
    height: 20px;
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: min(max(12px, 2vw), 18px);
    line-height: min(max(16px, 2vw), 24px);
    letter-spacing: 0.01em;
    color: #787878;
  `;

  return (
    <StoreContainer>
      <StoreName>{store.storeName}</StoreName>
      <StoreAddress>{store.address}</StoreAddress>
    </StoreContainer>
  );
}

export default StoreBlock;