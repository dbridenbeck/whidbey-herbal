import React from 'react';
import styled from 'styled-components';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';
import StoreBlock from './StoreBlock';
import GoogleMapWrapper from './GoogleMapWrapper';
import { device } from '../../utils/devices';

const LocationsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  /* max-width mirrors MasterWrapper's max-width (in Layout.js) */
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;

  @media ${device.mobile} {
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    margin: auto;
  }

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: center;
  }
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 450px;
  margin: auto;

  @media ${device.mobile} {
    text-align: center;
    align-content: center;
    margin: auto;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }

  @media ${device.laptop} {
    text-align: left;
    padding-left: 1rem;
  }
`;

export const stores = [
  {
    storeName: '3 Sisters Market',
    address: '779 Holbrook Road \nCoupeville, WA 98239',
    lat: 48.237278,
    lng: -122.719937,
    website: 'https://www.3sistersmarket.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/3+Sisters+Market/@48.237249,-122.722152,17z/data=!3m1!4b1!4m5!3m4!1s0x548f8c86bc348f65:0x2ea75e0b77df1645!8m2!3d48.237249!4d-122.719958',
  },
  {
    storeName: 'Flying Bear Florist',
    address: '207 1st \nSt. Langley, WA 98260',
    lat: 48.040654,
    lng: -122.408515,
    website: 'http://www.flyingbearfarm.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Flying+Bear/@48.0401524,-122.4131517,16z/data=!4m8!1m2!2m1!1sFlying+Bear+Florist!3m4!1s0x548ff9375a98113f:0xfe8fbf5dd6408a40!8m2!3d48.0406478!4d-122.4085255',
  },
  {
    storeName: 'Madrona Supply Co.',
    address: '8754 Washington 525 \nClinton, WA 98236',
    lat: 47.977944,
    lng: -122.354667,
    website: 'https://www.madronasupplyco.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Madrona+Supply+Co./@47.9779361,-122.3568657,17z/data=!3m1!4b1!4m5!3m4!1s0x548fff0b130a53fb:0x485e2654adba8037!8m2!3d47.9779361!4d-122.3546717',
  },
];

const StoreLocator = () => {
  return (
    <ComponentWrapper id="findstore" backgroundColor={'#FFF3D1'}>
      <StyledH2>Store Locator</StyledH2>
      <LocationsWrapper id="locations-wrapper">
        <StoreList id="store-list">
          {stores.map((store) => (
            <StoreBlock store={store} key={store.storeName} />
          ))}
        </StoreList>
      </LocationsWrapper>
    </ComponentWrapper>
  );
};

export default StoreLocator;
