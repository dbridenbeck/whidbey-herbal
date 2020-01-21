import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { device } from "../../utils/devices";

  const StoreName = styled.h2`
    margin-bottom: 5px;
    padding: 0;
    font-weight: bold;
    font-size: 1.125em;
    letter-spacing: 0.01em;
    color: #787878;
    @media ${device.tablet} {
      height: 35px;
    }
    `;

  const StoreContainer = styled.div`
      position: relative;
      flex-grow: 1;
      width: 40%;
      height: 75px;
      margin: 0 20px 20px 0;
      &:hover ${StoreName} {
        color: #e3be42;
      }
      @media ${device.tablet} {
        width: 100%;
      }
    `;
  
  const StoreAddress = styled.p`
    height: 20px;
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 0.875em;
    line-height: 1.5em;
    letter-spacing: 0.01em;
    color: #787878;
  `;

const StoreBlock = ({store}) => {

  return (
    <StoreContainer>
      <StoreName>{store.storeName}</StoreName>
      <StoreAddress>{store.address}</StoreAddress>
    </StoreContainer>
  );
}

StoreBlock.propTypes = {
  store: PropTypes.object
}

export default StoreBlock;