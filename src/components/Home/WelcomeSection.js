import React from 'react';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import Image from 'next/image';
import farm from '../../../public/farm-with-lines.jpg';

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 837px;
  margin: 60px auto 100px;
  /* Media screen keeps img 100% height on bigger screens */
  @media ${device.laptop} {
    height: calc(100vh - 60px);
    max-width: 100vw;
  }
`;

const StyledPicture = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: auto;
  margin: 0 auto;
  /* Media screen keeps img 100% height on bigger screens */
  @media ${device.laptop} {
    object-fit: contain;
  }
`;

const Tagline = styled.div`
  display: block;
  position: absolute;
  width: 96%;
  left: 50%;
  right: 50%;
  bottom: 0;
  margin: -27% -46vw 0 -46vw;
  color: black;
  h1 {
    display: inline-block;
    position: relative;
    padding: 0 0 10px 0;
    margin: 0;
    font-size: 1.625rem;
    font-weight: bold;
    z-index: 5;
    @media ${device.tablet} {
      font-size: 3rem;
    }
    @media ${device.laptop} {
      font-size: 4.5rem;
    }
  }
  .highlight {
    position: absolute;
    background-color: #e6c564;
    top: 20%;
    left: 163px;
    height: 1.225rem;
    width: 167px;
    @media ${device.tablet} {
      left: 300px;
      height: 2.15rem;
      width: 308px;
    }
    @media ${device.laptop} {
      left: 452px;
      height: 3.25rem;
      width: 460px;
    }
  }
`;

const WelcomeSection = () => {
  return (
    <WelcomeWrapper>
      <StyledPicture>
        <Image
          src={farm}
          alt="A watercolor of Whidbey Herbal farms showing a barn, a house, lavender fields, a dog in a pasture, and a forest in the background"
          layout="responsive"
          priority
        />
      </StyledPicture>
      <Tagline>
        <h1>
          Small batch. Handcrafted. <br /> Potions made from plants.
        </h1>
        <div className="highlight" />
      </Tagline>
    </WelcomeWrapper>
  );
};

export default WelcomeSection;
