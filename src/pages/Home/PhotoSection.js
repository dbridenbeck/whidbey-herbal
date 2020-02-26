import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import SamCaitlinLogs from "./images/sam-and-caitlin-logs.jpg";
import BottlesHoneyCloseup from "./images/bottles-honey-closeup.jpg";
import { device } from '../../utils/devices';

const PhotoContainer = styled.div`
  display: block;
  width: 100%;
  img {
    position: relative;
    display: inline-block;
    width: 49%;
    height: auto;
    :first-child {
      margin-right: 2%;
    }
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
        <img src={BottlesHoneyCloseup} alt="Three bottles of essential oils and a piece of honey comb sitting on a table" />
        <img src={SamCaitlinLogs} alt="Sam and Caitlin posing next to a log cabin"/>
      </PhotoContainer>
    </ComponentWrapper>
  );
}

export default PhotoSection;