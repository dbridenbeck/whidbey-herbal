import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-with-lines.jpg";

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 837px;
  margin: -60px auto 0px auto;
  @media ${device.largeScreen} {
    max-width: 1000px;
  }
  h1 {
    position: relative;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin: -20% -50vw 0 -46vw;
    color: black;
    font-size: 3rem;
    font-weight: bold;
    @media ${device.tablet} {
      font-size: 4rem;
    }
    @media ${device.laptop} {
      font-size: 5rem;
    }
  }
  img {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
`;

const WelcomeSection = () => {
  return (
    <WelcomeWrapper>
      <img src={`${farm}`} />
      <h1>
        {" "}
        Small batch handcrafted. <br/> Seed-to-bottle.
      </h1>
    </WelcomeWrapper>
  );
};

export default WelcomeSection;