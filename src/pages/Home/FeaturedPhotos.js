import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import CaitlinBows from "./images/caitlin-bows.jpg";
import HandFlower from "./images/hand-flower.jpg";
import WaveSVG from './images/photosectionsvg.svg';

const FullWidthSVG = styled.div`
  display: block;
  position: absolute;
  /* width, height and margin-left keep SVG positioned center */
  width: 100vw;
  height: 100%;
  /* -200px margin offset's componentwrapper's margin */
  margin: -200px 0 0 -0vw;
  background-image: url(${WaveSVG});
  /* adjust positioning and size of SVG for bigger screens */
  @media ${device.tablet} {
    width: 200vw;
    height: 80%;
    margin-left: -5vw;
  }
  @media ${device.largeScreen} {
    margin-left: -20vw;
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  height: auto;
  left: 50%;
  right: 50%;
  /* negative margin compensates for componentwrapper's 200px top margin*/
  margin: -200px -50vw 0 -50vw;
  padding-top: 20%;
  img {
    display: inline-block;
    position: relative;
    width: 50%;
    height: auto;
  }
  .circle-photo {
    align-self: flex-end;
    border-radius: 50%;
    padding: 0 3.2%;
  }
`;

const FeaturedText = styled.p`
  display: block;
  position: absolute;
  top: 15%;
  left: 0;
  /* width 100% ensures photos stay below p */
  width: 50%;
  padding: 0 3.2%;
  margin: 0;
  font-size: 0.825rem;
  line-height: 1.36em;
  font-weight: 300;
  @media ${device.tablet} {
    font-size: 1.5rem;
  }
  @media ${device.laptop} {
    font-size: 2.375rem;
  }
`;

const FeaturedPhotos = () => {
  return (
    <ComponentWrapper>
      <FullWidthSVG />
      <PhotoContainer>
        <FeaturedText>
          We’re a family farm that grows and distills each of our essential
          oils, fresh from the heart of beautiful Whidbey Island in the Salish
          Sea.
        </FeaturedText> 
        <img className="circle-photo" src={HandFlower} alt="A flower in the palm of a hand with green and yellow flowers in the background" />
        <img className="right-rect-photo" src={CaitlinBows} alt="Caitlin smiling and holding fir bows" />
      </PhotoContainer>
    </ComponentWrapper>
  );
};

export default FeaturedPhotos;