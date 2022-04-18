import React from 'react';
import styled from 'styled-components';
import { device } from '../utils/devices';

const BannerSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  min-width: 100vw;
  z-index: 10;
`;

const BannerText = styled.h5`
  margin-bottom: 5px;
  padding: 0;
  font-size: 0.825rem;
  font-weight: bold;
  color: #2e2e2e;
  text-align: center;
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.laptop} {
    font-size: 1.313rem;
  }
`;

const Banner = () => {
  return (
    <BannerSection>
      <BannerText>Free shipping on all orders $25+</BannerText>
    </BannerSection>
  );
};

export default Banner;
