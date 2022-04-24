import React, { useState } from 'react';
import styled from 'styled-components';

const BannerSection = styled.div`
  position: fixed;
  top: 3.75rem;
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
  font-family: 'Domine', serif;
  font-size: 0.825rem;
  font-weight: 400;
  text-align: center;
  color: white;
  letter-spacing: 1px;
`;

const Button = styled.button`
  margin-left: 1.5rem;
  border: 2px solid #e6c564;
  background-color: #e6c564;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
    transition: 0.5s ease-out linear;
  }
`;

const Banner = () => {
  const [closeBanner, setCloseBanner] = useState(true);

  const handleCloseBanner = () => {
    setCloseBanner(!closeBanner);
  };

  return (
    <>
      {closeBanner && (
        <BannerSection>
          <BannerText>Free shipping on all orders $25+</BannerText>
          <Button type='button' onClick={handleCloseBanner}>
            Close
          </Button>
        </BannerSection>
      )}
    </>
  );
};

export default Banner;
