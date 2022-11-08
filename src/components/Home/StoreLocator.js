import styled from 'styled-components';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';
import StoreBlock from './StoreBlock';
import { device } from '../../utils/devices';

const LocationsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  /* max-width mirrors MasterWrapper's max-width (in Layout.js) */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 50px 10px;

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
    website: 'https://www.3sistersmarket.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/3+Sisters+Market/@48.237249,-122.722152,17z/data=!3m1!4b1!4m5!3m4!1s0x548f8c86bc348f65:0x2ea75e0b77df1645!8m2!3d48.237249!4d-122.719958',
  },
  {
    storeName: 'Flying Bear Florist',
    address: '207 1st \nSt. Langley, WA 98260',
    website: 'http://www.flyingbearfarm.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Flying+Bear/@48.0401524,-122.4131517,16z/data=!4m8!1m2!2m1!1sFlying+Bear+Florist!3m4!1s0x548ff9375a98113f:0xfe8fbf5dd6408a40!8m2!3d48.0406478!4d-122.4085255',
  },
  {
    storeName: 'Madrona Supply Co.',
    address: '8754 Washington 525 \nClinton, WA 98236',
    website: 'https://www.madronasupplyco.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Madrona+Supply+Co./@47.9779361,-122.3568657,17z/data=!3m1!4b1!4m5!3m4!1s0x548fff0b130a53fb:0x485e2654adba8037!8m2!3d47.9779361!4d-122.3546717',
  },
  {
    storeName: 'Bayview Gardens',
    address: '2780 Marshview Ave, Langley, WA 98260',
    website: 'https://www.bayviewgarden.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Bayview+Garden/@48.5156208,-123.1334811,9z/data=!4m9!1m2!2m1!1sbayview+gardens!3m5!1s0x548ffc71544c843b:0x621c4c73c3214caf!8m2!3d48.0071695!4d-122.4619127!15sCg9iYXl2aWV3IGdhcmRlbnNaESIPYmF5dmlldyBnYXJkZW5zkgENZ2FyZGVuX2NlbnRlcuABAA',
  },
  {
    storeName: 'Captain Whidbey Inn',
    address: '2072 W Capt Whidbey Inn Rd, Coupeville, WA 98239',
    website: 'https://www.captainwhidbey.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Captain+Whidbey/@48.2229211,-122.7304365,17z/data=!3m1!4b1!4m8!3m7!1s0x548f8ceca8f537b3:0x6b23b465757f063d!5m2!4m1!1i2!8m2!3d48.222944!4d-122.7282097',
  },
  {
    storeName: 'Hierophant Meadery',
    address: '5586 Double Bluff Rd, Freeland, WA 98249',
    website: 'https://www.hierophantmeadery.com/',
    googleMapUrl:
      'https://www.google.com/maps/place/Hierophant+Meadery/@48.0083112,-122.5094769,17z/data=!3m1!4b1!4m5!3m4!1s0x548ffbef1826f499:0xf22fbe4c73e7df5c!8m2!3d48.0083112!4d-122.5072882',
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
