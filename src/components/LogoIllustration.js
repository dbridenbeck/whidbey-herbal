import React from 'react';
import styled from "styled-components";
import farm from "../images/farm-no-lines.jpg";
import { fluidText } from "../utils/responsiveSCSS";
import circleLogo from "../images/circle-logo.png";
import { device } from "../utils/devices";

const WelcomeContainer = styled.div`
  margin: 50px auto 0px auto;
  width: 100%;
  max-width: 650px;
  @media ${device.largeScreen} {
    max-width: 1000px;
  }
`;

const FarmWithLogo = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-height: 900px;
`;

const Logo = styled.img`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  max-width: 400px;
  height: 20%;
  background-size: contain;
  background-repeat: no-repeat;
`;

const FarmIllustration = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
`;

const TextBlock = styled.div`
  position: relative;
  margin-top: -5%;
  display: block;
`;

const WhidbeyHeader = styled.h1`
  display: inline-block;
  margin: 0;
  color: #e3be42;
  font-size: min(max(26px, 5vw), 54px);
  font-weight: normal;
`;

const IllustrationText = styled.p`
  ${fluidText}
  margin-top: -5px;
  font-style: normal;
  font-weight: normal;
  color: #787878;
`;



const LogoIllustration = () => {
  return (
    <WelcomeContainer>
      <FarmWithLogo>
        <Logo src={`${circleLogo}`} />
        <FarmIllustration src={`${farm}`} />
      </FarmWithLogo>
      <TextBlock>
        <WhidbeyHeader>Whidbey Herbal</WhidbeyHeader>
        <IllustrationText>
          Small-batch, handcrafted, seed to bottle.
          <br />
          Grown from the Heart of Whidbey Island.
        </IllustrationText>
      </TextBlock>
    </WelcomeContainer>
  );
}

export default LogoIllustration;