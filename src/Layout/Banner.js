import React, { useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const BannerSection = styled.div`
  position: fixed;
  top: 4rem;
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
`;

const Button = styled.button`
  margin: 1rem;
  border: 2px solid #e6c564;
  border-radius: 1px;
  background-color: #e6c564;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
    transition: 2s ease-out cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

const Banner = () => {
  let closeRef = useRef(null);

  const handleClick = () => {
    gsap.fromTo(
      closeRef,
      { opacity: 1, y: 0 },
      { ease: 'power4.out', opacity: 0, y: -10, duration: 0.2 }
    );
  };

  return (
    <>
      <BannerSection ref={(el) => (closeRef = el)}>
        <BannerText>Free shipping on all orders $25+</BannerText>
        <Button type='button' onClick={handleClick}>
          Close
        </Button>
      </BannerSection>
    </>
  );
};

export default Banner;
