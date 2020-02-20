import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-with-lines.jpg";

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 837px;
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
  img {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
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
      <img src={`${farm}`} />
      <h1>Whidbey Herbal</h1>
      <p>
        {" "}
        Small-batch, handcrafted, seed to bottle. <br />
        Grown from the Heart of Whidbey Island.
      </p>
    </WelcomeWrapper>
  );
};

export default WelcomeSection;