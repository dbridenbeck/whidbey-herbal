import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import farmWebp from "./images/farm-with-lines.webp";
import farm from "./images/farm-with-lines.jpg";

const WelcomeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 837px;
  margin: -60px auto 100px auto;
  /* Media screen keeps img 100% height on bigger screens */
  @media ${device.laptop} {
    height: calc(100vh - 60px);
    max-width: 100vw;
  }
`;

const StyledPicture = styled.picture`
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
`;

const Tagline = styled.div`
  display: block;
  position: absolute;
  width: 100%;
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
    background-color: #e6c564;
    top: 20%;
    left: 168px;
    height: 1.225rem;
    width: 175px;
    @media ${device.tablet} {
      left: 285px;
      height: 2.15rem;
      width: 305px;
    }
    @media ${device.laptop} {
      left: 432px;
      height: 3.25rem;
      width: 450px;
    }
  }
`;

const WelcomeSection = () => {
  return (
    <WelcomeWrapper>
      <StyledPicture>
        <source srcset={`${farmWebp}`} type="image/webp" />
        <source srcset={`${farm}`} type="image/jpeg" />
        <img src={`${farm}`} alt="A watercolor of Whidbey Herbal farms showing a barn, a house, lavender fields, a dog in a pasture, and a forest in the background"/>
      </StyledPicture>
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