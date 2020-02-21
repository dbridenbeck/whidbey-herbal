import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-with-lines.jpg";

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 837px;
  margin: 0px auto;
  @media ${device.largeScreen} {
    max-width: 1000px;
  }
  img {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  `;

const Tagline = styled.div`
  display: block;
  position: relative;
  width: 365px;
  left: 50%;
  right: 50%;
  margin: -27% -46vw 0 -46vw;
  color: black;
  @media ${device.tablet} {
    width: 783px;
  }
  @media ${device.laptop} {
    width: 1255px;
  }
  h1 {
    display: inline-block;
    position: relative;
    font-size: 1.75rem;
    font-weight: bold;
    z-index: 5;
    @media ${device.tablet} {
      font-size: 3.45rem;
    }
    @media ${device.laptop} {
      font-size: 5rem;
    }
  }
  .highlight {
    position: absolute;
    background-color: #E6C564;
    top: 31%;
    right: 6%;
    height: 1.225rem;
    width: 175px;
    @media ${device.tablet} {
      top: 31%;
      right: 13%;
      height: 2.5rem;
      width: 350px;
    }
    @media ${device.laptop} {
      top: 31%;
      right: 21.5%;
      height: 3.75rem;
      width: 510px;
      }
    }

  `;

const WelcomeSection = () => {
  return (
    <WelcomeWrapper>
      <img src={`${farm}`} />
      <Tagline>
        <h1>
          Small batch handcrafted. <br/> Seed-to-bottle.
        </h1>
        <div className="highlight" />
      </Tagline>
    </WelcomeWrapper>
  );
};

export default WelcomeSection;