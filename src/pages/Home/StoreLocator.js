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
    text-align: center;
  }
  @media ${device.laptop} {
    text-align: left;
    padding-left: 1rem;
  }
`;

export const stores = [
  //  {
  //    storeName: "Worn Path",
  //    address: `4007 N. Mississippi Ave. \nPortland, OR 97227`,
  //    lat: 45.552305,
  //    lng: -122.675666,
  //    website: "https://www.worn-path.com/",
  //    googleMapUrl:
  //      "https://www.google.com/maps/place/Worn+Path/@45.5522862,-122.6778633,17z/data=!3m1!4b1!4m5!3m4!1s0x5495a76b07f44829:0xc963c7d7e7732679!8m2!3d45.5522862!4d-122.6756693"
  //  },
  {
    storeName: '3 Sisters Market',
    address: '779 Holbrook Road \nCoupeville, WA 98239',
    lat: 48.237278,
    lng: -122.719937,
    website: 'https://www.3sistersmarket.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/3+Sisters+Market/@48.237249,-122.722152,17z/data=!3m1!4b1!4m5!3m4!1s0x548f8c86bc348f65:0x2ea75e0b77df1645!8m2!3d48.237249!4d-122.719958',
  },
  // {
  //   storeName: 'Wish by the Sea',
  //   address: '208 1st \nSt. Langley, WA 98260',
  //   lat: 48.040886,
  //   lng: -122.408415,
  //   website: 'https://www.facebook.com/wishsisters/',
  //   googleMapUrl:
  //     'https://www.google.com/maps/place/Wish+by+the+Sea/@48.0408497,-122.4106087,17z/data=!3m1!4b1!4m5!3m4!1s0x548ff9375096a79f:0xd36c343435ee70eb!8m2!3d48.0408497!4d-122.4084147',
  // },
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
  console.log('CONSOLE', window.innerWidth);
  return (
    <ComponentWrapper id='findstore' backgroundColor={'#FFF3D1'}>
      <StyledH2>Store Locator</StyledH2>
      <LocationsWrapper id='locations-wrapper'>
        <GoogleMapWrapper id='googlemap-wrapper' />
        <StoreList id='store-list'>
          {stores.map((store) => (
            <StoreBlock store={store} key={store.storeName} />
          ))}
        </StoreList>
      </LocationsWrapper>
    </ComponentWrapper>
  );
};

export default StoreLocator;
