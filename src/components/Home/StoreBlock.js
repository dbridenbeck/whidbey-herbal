import styled from 'styled-components';
import StyledH3 from '../../SharedComponents/StyledH3';

import PropTypes from 'prop-types';
import { device } from '../../utils/devices';

const StoreContainer = styled.div`
  position: relative;
  align-self: flex-start;
  flex-grow: 1;
  width: 45%;
  margin: 0 10px 52px 0;
  a {
    display: block;
    font-size: 0.75em;
    font-style: italic;
    color: #787878;
    text-decoration: none;
    :hover {
      color: #e3be42;
    }
  }
  @media ${device.tablet} {
    width: 100%;
    margin-bottom: 25px;
    h3 {
      color: '#2e2e2e';
    }
  }
  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-content: center;
  }
`;

const StoreAddress = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 300;
  font-size: 0.825rem;
  line-height: 1.5em;
  letter-spacing: 0.01em;
  color: #2e2e2e;
  white-space: pre;
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.laptop} {
    font-size: 1.125rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 48px;
`;

const StoreBlock = ({
  store: { storeName, address, website, googleMapUrl },
}) => {
  return (
    <StoreContainer>
      <StyledH3>{storeName}</StyledH3>
      <StoreAddress>{address}</StoreAddress>
      <LinksContainer>
        <a href={website} target="_blank" rel="noopener noreferrer">
          View Website
        </a>
        <a href={googleMapUrl} target="_blank" rel="noopener noreferrer">
          Map
        </a>
      </LinksContainer>
    </StoreContainer>
  );
};

StoreBlock.propTypes = {
  storeName: PropTypes.string,
  address: PropTypes.string,
};

export default StoreBlock;
