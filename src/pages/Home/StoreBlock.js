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
  margin-bottom: 40px;
  a {
    display: block;
    font-size: 0.75em;
    font-style: italic;
    color: #c0c0c0;
    text-decoration: none;
    :hover {
      color: #e3be42;
    }
  }
  @media ${device.tablet} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

 const StoreTitle = styled.div`
   margin: 0;
   padding: 0;
   font-weight: bold;
   font-size: 1.125em;
   letter-spacing: 0.01em;
   color: #787878;
   @media ${device.tablet} {
    color: ${props => (props.storeIsSelected ? "#42e0e3" : "#787878")};
     :hover {
       cursor: pointer;
       color: #e3be42;
     }
   }
 `;
  
const StoreAddress = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 0.875em;
  line-height: 1.5em;
  letter-spacing: 0.01em;
  color: #787878;
`;

const StoreBlock = ({setGoogleMapInfoWindow, selectedStoreName, store: {storeName, address, website}}) => {

  const storeIsSelected = storeName === selectedStoreName;

  // TODO: Make storeName stay highlighted when clicked, add more info to InfoWindow's message (address, link to go to see in google maps)
  return (
    <StoreContainer onClick={() => setGoogleMapInfoWindow(storeName)}>
      <StoreTitle storeIsSelected={storeIsSelected}>
        {storeName}
      </StoreTitle>
      <StoreAddress>{address}</StoreAddress>
      <a href={website} target="_blank">
        View Website
      </a>
    </StoreContainer>
  );
}

StoreBlock.propTypes = {
  storeName: PropTypes.string,
  address: PropTypes.string,
}

const mapStatetoProps = ({ googleMapInfoWindow: { selectedStoreName } }) => ({
  selectedStoreName
});

const mapDispatchtoProps = dispatch => ({
  setGoogleMapInfoWindow: (selectedStoreName) =>
    dispatch(CartActionCreators.setGoogleMapInfoWindow(selectedStoreName))
});

export default connect(mapStatetoProps, mapDispatchtoProps)(StoreBlock);