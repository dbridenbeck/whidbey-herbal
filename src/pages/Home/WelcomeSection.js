import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farm from "./images/farm-with-lines.jpg";

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 837px;
  margin: -60px auto 100px auto;
  img {
    position: relative;
    width: 100%;
    margin: 0 auto;
    /* Media screen keeps img 100% height on bigger screens */
    @media ${device.laptop} {
      height: 100%;
      object-fit: contain;
    }
  }
    /* Media screen keeps img 100% height on bigger screens */
  @media ${device.laptop} {
    height: calc(100vh - 60px);
    max-width: 100vw;
  }
  `;

const Tagline = styled.div`
  display: block;
  position: relative;
  width: 345px;
  left: 50%;
  right: 50%;
  margin: -27% -46vw 0 -46vw;
  color: black;
  @media ${device.tablet} {
    width: 783px;
  }
  @media ${device.laptop} {
    margin: -18% -46vw 0 -46vw;
    width: 1255px;
  }
  h1 {
    display: inline-block;
    position: relative;
    font-size: 1.75rem;
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
    background-color: #E6C564;
    top: 31%;
    right: 0.5%;
    height: 1.225rem;
    width: 175px;
    @media ${device.tablet} {
      top: 31%;
      right: 24.5%;
      height: 2.15rem;
      width: 305px;
    }
    @media ${device.laptop} {
      top: 31%;
      right: 372px;
      height: 3.25rem;
      width: 450px;
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