import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import SamCaitlinKneeling from "./images/sam-caitlin-kneeling.jpg";
import ClippingPhoto from "./images/clipping-photo.jpg";
import { device } from '../../utils/devices';

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 120%;
  max-height: 785px;
  margin-left: -10%;
  @media ${device.tablet} {
    width: 115%;
    max-height: 785px;
    margin-left: -7.5%;
  }
`;

const Photo = styled.img`
  display: block;
  width: 47%;
`;

const PhotoSection = () => {
  return (
    <ComponentWrapper id="photo-section">
      <PhotoContainer>
        <Photo src={ClippingPhoto} />
        <Photo src={SamCaitlinKneeling} />
      </PhotoContainer>
    </ComponentWrapper>
  );
}

export default PhotoSection;