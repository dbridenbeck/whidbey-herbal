import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-no-lines.jpg";
import circleLogo from "./images/circle-logo.png";

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

const PhotoSection = styled.div`
  display: block;
  
  svg {
    /* make sure svg wave covers full width of screen */
    width: 125vw;
    margin-left: -15%;
    @media ${device.tablet} {
      margin-left: -30%;
    }
    @media ${device.laptop} {
      margin-left: -50%;
    }
  }
`;
  
const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 1200px;
  .circle-photo {
      border-radius: 50%;
    }
    .right-rect-photo {
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
          src={`${circleLogo}`}
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
      <PhotoSection>
        <svg
          viewBox="0 0 1279 854"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M640 42.9994C994 -53 1280 42.9994 1280 42.9994V184V670V811.001C1280 811.001 994 907 640 811.001C286 715.001 0 811.001 0 811.001V670V184V42.9994C0 42.9994 286 138.999 640 42.9994Z"
            fill="#FFF3D1"
          />
        </svg>
        <p></p>
        <PhotoContainer>
          {/* <img class="circle-photo" src={} />
          <img class="right-rect-photo" src={} /> */}
        </PhotoContainer>
      </PhotoSection>
    </WelcomeWrapper>
  );
};

export default WelcomeSection;