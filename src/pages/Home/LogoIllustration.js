import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-no-lines.jpg";
import circleLogo from "./images/circle-logo.png";
import { fluidText } from "../../utils/responsiveSCSS";

const WelcomeWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 50px auto 0px auto;
  @media ${device.largeScreen} {
    max-width: 1000px;
  }
`;

const FarmWithLogo = styled.div`
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

const TextBlock = styled.div`
  display: block;
  position: relative;
  margin-top: -5%;
`;

const WhidbeyHeader = styled.h1`
  display: inline-block;
  margin: 0;
  color: #e3be42;
  font-size: min(max(26px, 5vw), 54px);
  font-weight: normal;
`;

const IllustrationText = styled.p`
  /* fluid typography to control line height and text size see utils/responsiveSCSS.js for details */
  ${fluidText}
  margin-top: -5px;
  font-style: normal;
  font-weight: normal;
  color: #787878;
`;

const LogoIllustration = () => {

  return (
    <WelcomeWrapper>
      <FarmWithLogo>
        <Logo
          src={`${circleLogo}`}
          width="800"
          height="800"
          alt="Whidbey Island Logo"
        />
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
    </WelcomeWrapper>
  );
}

export default LogoIllustration;