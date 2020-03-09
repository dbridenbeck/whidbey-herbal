import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import SamCaitlinLogs from "./images/sam-and-caitlin-logs.jpg";
import BottlesHoneyCloseup from "./images/bottles-honey-closeup.jpg";
import SamCaitlinLogsWebp from "./images/sam-and-caitlin-logs.webp";
import BottlesHoneyCloseupWebp from "./images/bottles-honey-closeup.webp";
import { device } from '../../utils/devices';

const PhotoContainer = styled.div`
  display: block;
  width: 100%;
  @media ${device.tablet} {
    width: 115%;
    margin-left: -7.5%;
  }
`;

const StyledPicture = styled.picture`
  img {
    position: relative;
    display: inline-block;
    width: 49%;
    height: auto;
  }
  :first-child {
    margin-right: 2%;
  }
`;

const PhotoSection = () => {
  return (
    <ComponentWrapper id="photo-section">
      <PhotoContainer>
        <StyledPicture>
          <source srcSet={`${BottlesHoneyCloseupWebp}`} type="image/webp" />
          <source srcSet={`${BottlesHoneyCloseup}`} type="image/jpeg" />
          <img
            src={BottlesHoneyCloseup}
            alt="Three bottles of essential oils and a piece of honey comb sitting on a table"
          />
        </StyledPicture>
        <StyledPicture>
          <source srcSet={`${SamCaitlinLogsWebp}`} type="image/webp" />
          <source srcSet={`${SamCaitlinLogs}`} type="image/jpeg" />
          <img
            src={SamCaitlinLogs}
            alt="Sam and Caitlin posing next to a log cabin"
          />
        </StyledPicture>
      </PhotoContainer>
    </ComponentWrapper>
  );
}

export default PhotoSection;