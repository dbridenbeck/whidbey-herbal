import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import SamCaitlin from "./images/sam-caitlin-500.jpg";
import ClippingPhoto from "./images/clipping-photo-500.jpg";
import { device } from '../../utils/devices';

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* width 120% and negative margin-left keep photos to edge of screen */
  width: 125%;
  margin-left: -12.5%;
  @media ${device.tablet} {
    width: 115%;
    max-height: 785px;
    margin-left: -7.5%;
  }
`;

const Photo = styled.img`
  display: block;
  width: 49%;
`;

const PhotoSection = () => {
  return (
    <ComponentWrapper id="photo-section">
      <PhotoContainer>
        <Photo src={ClippingPhoto} />
        <Photo src={SamCaitlin} />
      </PhotoContainer>
    </ComponentWrapper>
  );
}

export default PhotoSection;