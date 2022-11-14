import styled from 'styled-components';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import SamCaitlinLogs from '../../../public/sam-and-caitlin-logs.jpg';
import BottlesHoneyCloseup from '../../../public/bottles-honey-closeup.jpg';

import Image from 'next/image';
import { device } from '../../utils/devices';

const PhotoContainer = styled.div`
  display: block;
  width: 100%;
  @media ${device.tablet} {
    width: 115%;
    margin-left: -7.5%;
  }
`;

const StyledPicture = styled.div`
  position: relative;
  display: inline-block;
  width: 49%;
  height: auto;

  :first-child {
    margin-right: 2%;
  }
`;

const PhotoSection = () => {
  return (
    <ComponentWrapper id="photo-section">
      <PhotoContainer>
        <StyledPicture>
          <Image
            src={BottlesHoneyCloseup}
            alt="Three bottles of essential oils and a piece of honey comb sitting on a table"
            layout="responsive"
            sizes="50vw"
          />
        </StyledPicture>
        <StyledPicture>
          <Image
            src={SamCaitlinLogs}
            alt="Sam and Caitlin posing next to a log cabin"
            layout="responsive"
            sizes="50vw"
          />
        </StyledPicture>
      </PhotoContainer>
    </ComponentWrapper>
  );
};

export default PhotoSection;
