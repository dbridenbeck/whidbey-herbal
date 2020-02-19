import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import Dock from "./images/dock.jpg";
import HoneyAndBottles from "./images/honey-and-bottles.jpg";
import WaveSVG from './images/photosectionsvg.svg';

const FullWidthSVG = styled.div`
  display: block;
  position: absolute;
  /* width, height and margin-left keep SVG positioned center */
  width: 200vw;
  height: 55%;
  margin-left: -6vw;
  background-image: url(${WaveSVG});
  /* adjust positioning and size of SVG for bigger screens */
  @media ${device.tablet} {
    height: 65%;
    margin-left: -5vw;
  }
  @media ${device.largeScreen} {
    height: 70%;
    margin-left: -20vw;
  }
`;
  
const PhotoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* width, left, right, and margins keep PhotoContainer full-width */
  width: 105vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding-top: 20%;
  img {
    width: 50%;
    /* push images closer to p */
    margin-top: -12.5%;
    @media ${device.laptop} {
      margin-top: -8%;
    }
    @media ${device.largeScreen} {
      margin-top: -12%;
    }
  }
  .circle-photo {
    align-self: flex-end;
    width: 50%;
    border-radius: 50%;
    padding: 0 3.2%;
  }
  p {
    /* width 100% ensures photos stay below p */
    width: 100%;
    /* padding right keeps p over */
    padding-right: 45%;
    /* 6.4% left and right margins ensures this is centered above circle-photo */
    margin: 0% 6.4% 0 3.2%;
    font-size: 0.825rem;
    line-height: 1.36em;
    font-weight: 300;
    @media ${device.tablet} {
      font-size: 1.5rem;
    }
    @media ${device.laptop} {
      font-size: 2.375rem;
    }
  }
`;

const FeaturedPhotos = () => {
  return (
    <ComponentWrapper>
      <FullWidthSVG />
      <PhotoContainer>
        <p>
          We’re a family farm that grows and distills each of our essential
          oils, fresh from the heart of beautiful Whidbey Island in the Salish
          Sea.
        </p> 
        <img class="circle-photo" src={HoneyAndBottles} />
        <img class="right-rect-photo" src={Dock} />
      </PhotoContainer>
    </ComponentWrapper>
  );
};

export default FeaturedPhotos;