import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../utils/devices';

const BannerSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  min-width: 100vw;
  background-color: #2e2e2e;
  z-index: 10;
`;

const BannerText = styled.h5`
  font-size: 0.825rem;
  font-weight: bold;
  text-align: center;
  color: white;

  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.laptop} {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  margin: 1rem;
  border: 0px solid white;
  border-radius: 1px;
  background-color: #e6c564;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
    transition: 2s ease-out cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

const Banner = () => {
  const [close, setClose] = useState(true);

  return (
    <>
      {close && (
        <>
          <BannerSection>
            <BannerText>Free shipping on all orders $25+</BannerText>
            <Button type='button' onClick={() => setClose(!close)}>
              Close
            </Button>
          </BannerSection>
        </>
      )}
    </>
  );
};

export default Banner;
