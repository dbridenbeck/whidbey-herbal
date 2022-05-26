import React from 'react';
import styled from 'styled-components';

const BannerSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  min-width: 100vw;
  background-color: #2e2e2e;
  z-index: 10;
`;

const BannerText = styled.h5`
  font-family: 'Domine', serif;
  font-size: 0.825rem;
  font-weight: 400;
  text-align: center;
  color: white;
  letter-spacing: 1px;
`;

const Banner = () => {
  return (
    <BannerSection>
      <BannerText>Free shipping on all orders $25+</BannerText>
    </BannerSection>
  );
};

export default Banner;
