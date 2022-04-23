import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  bannerClose,
  bannerEnter,
  buttonEnter,
} from './animations/bannerAnimations';

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
    transition: 2s ease-out linear;
  }
`;

const Banner = () => {
  let enterRef = useRef(null);
  let closeRef = useRef(null);

  useEffect(() => {
    bannerEnter(closeRef);
    buttonEnter(enterRef);
  }, []);

  const handleClose = () => {
    bannerClose(closeRef);
  };

  return (
    <BannerSection ref={(el) => (closeRef = el)}>
      <BannerText>Free shipping on all orders $25+</BannerText>
      <Button ref={(el) => (enterRef = el)} type='button' onClick={handleClose}>
        Close
      </Button>
    </BannerSection>
  );
};

export default Banner;
