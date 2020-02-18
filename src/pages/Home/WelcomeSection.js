import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-no-lines.jpg";
import CircleLogo from "./images/circle-logo.png";
import Dock from "./images/dock.jpg";
import HoneyAndBottles from "./images/honey-and-bottles.jpg";
import WaveSVG from './images/photosectionsvg.svg';

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 650px;
  margin: -50px auto 0px auto;
  @media ${device.largeScreen} {
    max-width: 1000px;
  }
  h1 {
    display: inline-block;
    margin: 0;
    color: #e3be42;
    font-size: 1.625em;
    font-weight: normal;
  }
  p {
    font-size: 0.875em;
    line-height: 1.5em;
    margin-top: -5px;
    font-style: normal;
    font-weight: normal;
    color: #787878;
  }
`;

const FeaturedPhotos = styled.div`
  display: block;
  position: relative;
  background-image: url(${WaveSVG});
  background-position: center;
  margin: 0 -999rem 50% -999rem;
  padding: 0 999rem;
  @media ${device.tablet} {
  /* create full-width bar effect on non-mobile screens */
  margin: 0 -9999rem;
  padding: 0 9999rem;
  }
`;
  
const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-height: 225px;
  /* width, left, right, and margins keep PhotoContainer full-width */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  img {
    width: 45%;
    /* push images closer to p */
    margin-top: -13%;
  }
  .circle-photo {
    align-self: flex-end;
    width: 55%;
    border-radius: 50%;
    padding: 0 6.4%;
  }
  p {
    width: 42%;
    /* 6.4% left and right margins ensures this is centered above circle-photo */
    margin: 10% 6.4% 0 6.4%;
    font-size: .725rem;
    font-weight: 300;
    @media ${device.tablet} {
      font-size: 1.375rem;
    }
  }
`;


const FarmAndLogoContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 900px;
  margin: 0 auto;
`;

const Logo = styled.img`
  display: block;
  position: absolute;
  width: 20%;
  max-width: 400px;
  height: auto;
`;

const FarmIllustration = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
`;

const WelcomeSection = () => {
  return (
    <WelcomeWrapper>
      <FarmAndLogoContainer>
        <Logo
          src={`${CircleLogo}`}
          width="800"
          height="800"
          alt="Whidbey Island Logo"
        />
        <FarmIllustration src={`${farm}`} />
      </FarmAndLogoContainer>
      <h1>Whidbey Herbal</h1>
      <p>
        {" "}
        Small-batch, handcrafted, seed to bottle. <br />
        Grown from the Heart of Whidbey Island.
      </p>
      <FeaturedPhotos>
        <PhotoContainer>
        <p>
          We’re a family farm that grows and distills each of our essential
          oils, fresh from the heart of beautiful Whidbey Island in the Salish
          Sea.
        </p> 
          <img class="circle-photo" src={HoneyAndBottles} />
          <img class="right-rect-photo" src={Dock} />
        </PhotoContainer>
      </FeaturedPhotos>
    </WelcomeWrapper>
  );
};

export default WelcomeSection;