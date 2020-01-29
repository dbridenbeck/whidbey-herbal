import React from 'react';
import styled from "styled-components";
import * as CartActionCreators from "../../state/actions/cart";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { device } from "../../utils/devices";

const StoreContainer = styled.div`
      position: relative;
      flex-grow: 1;
      width: 40%;
      margin: 0 20px 20px 0;
      .storeTitle {
        margin-bottom: 5px;
        padding: 0;
        font-weight: bold;
        font-size: 1.125em;
        letter-spacing: 0.01em;
        color: #787878;
      }
      @media ${device.tablet} {
        height: 35px;
      }
      &:hover .storeTitle {
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

const StoreBlock = ({setGoogleMapInfoWindow, store: {storeName, address}}) => {

  return (
    <StoreContainer onClick={() => setGoogleMapInfoWindow(storeName)}>
      <h3 className="storeTitle">{storeName}</h3>
      <StoreAddress>{address}</StoreAddress>
    </StoreContainer>
  );
}

StoreBlock.propTypes = {
  storeName: PropTypes.string,
  address: PropTypes.string,
}

const mapDispatchtoProps = dispatch => ({
  setGoogleMapInfoWindow: (selectedStoreName) =>
    dispatch(CartActionCreators.setGoogleMapInfoWindow(selectedStoreName))
});

export default connect(null, mapDispatchtoProps)(StoreBlock);