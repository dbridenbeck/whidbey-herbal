import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import SamCaitlin from "./images/sam-caitlin-500.jpg";
import ClippingPhoto from "./images/clipping-photo-500.jpg";
import { device } from '../../utils/devices';

const PhotoContainer = styled.div`
  display: block;
  /* width 120% and negative margin-left keep photos to edge of screen */
  width: 125%;
  margin-left: -12.5%;
  img {
    position: relative;
    display: inline-block;
    width: 48%;
    height: auto;
    margin: 0 1%;
  }
  @media ${device.tablet} {
    width: 115%;
    margin-left: -7.5%;
  }
`;

const PhotoSection = () => {
  return (
    <ComponentWrapper id="photo-section">
      <PhotoContainer>
        <img src={ClippingPhoto} />
        <img src={SamCaitlin} />
      </PhotoContainer>
    </ComponentWrapper>
  );
}

export default PhotoSection;