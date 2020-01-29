import React from 'react';
import styled from "styled-components";

import Wrapper from "../../SharedComponents/ComponentWrapper";
import StyledH1 from "../../SharedComponents/StyledH1";
import StoreBlock from "./StoreBlock";
import GoogleMapWrapper from "./GoogleMapWrapper";

import { device } from "../../utils/devices";

const LocationsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  margin: 0 auto;
  @media ${device.tablet} {
    flex-direction: column;
    width: 40%;
  }
`;

export const stores = [
         {
           storeName: "Worn Path",
           address: "4007 N. Mississippi Ave. Portland, OR 97227",
           lat: 45.552305,
           lng: -122.675666
         },
         {
           storeName: "3 Sisters Market",
           address: "779 Holbrook Road Coupeville, WA 98239",
           lat: 48.237278,
           lng: -122.719937
         },
         {
           storeName: "Wish by the Sea",
           address: "208 1st St. Langley, WA 98260",
           lat: 48.040886,
           lng: -122.408415
         },
         {
           storeName: "Flying Bear Florist",
           address: "207 1st St. Langley, WA 98260",
           lat: 48.040654,
           lng: -122.408515
         },
         {
           storeName: "Madrona Supply Co.",
           address: "8754 Washington 525, Clinton, WA 98236",
           lat: 47.977944,
           lng: -122.354667
         }
       ];

const StoreLocator = () => {

  return (
    <Wrapper id="findstore" positionRelative={true}>
      <StyledH1 colorIsGrey={true} centered={true}>
        Store Locator
      </StyledH1>
      <LocationsWrapper>
        <StoreList>
          {stores.map(store => (
            <StoreBlock store={store} key={store.storeName} />
          ))}
        </StoreList>
        <GoogleMapWrapper />
      </LocationsWrapper>
    </Wrapper>
  );
}

export default StoreLocator;