import React from 'react';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import CaitlinBowsWebp from './images/caitlin-bows.webp';
import CaitlinBows from './images/caitlin-bows.jpg';
import stillOnStump from './images/still-on-stump.jpg';
import stillOnStumpWebp from './images/still-on-stump.webp';
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
  @media (min-width: 1281px) {
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
  .circle-photo {
    align-self: flex-end;
    border-radius: 50%;
    padding: 0 3.2%;
  }
`;

const StyledPicture = styled.picture`
  img {
    display: inline-block;
    position: relative;
    width: 50%;
    height: auto;
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
  @media ${device.mobile} {
    font-size: 11px;
  }
  @media ${device.tablet} {
    font-size: 1.5rem;
  }
  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const FeaturedPhotos = () => {
  return (
    <ComponentWrapper>
      <FullWidthSVG />
      <PhotoContainer>
        <FeaturedText>
          We’re a family farm that grows and distills herbs. We make our herbal
          products in small batches, fresh from the heart of Whidbey Island in
          the Salish Sea.
        </FeaturedText>
        <StyledPicture>
          <source srcSet={`${stillOnStumpWebp}`} type='image/webp' />
          <source srcSet={`${stillOnStump}`} type='image/jpeg' />
          <img
            className='circle-photo'
            src={stillOnStump}
            alt='Beatiful copper still sitting on a stump.'
          />
        </StyledPicture>
        <StyledPicture>
          <source srcSet={`${CaitlinBowsWebp}`} type='image/webp' />
          <source srcSet={`${CaitlinBows}`} type='image/jpeg' />
          <img
            className='right-rect-photo'
            src={CaitlinBows}
            alt='Caitlin smiling and holding fir bows'
          />
        </StyledPicture>
      </PhotoContainer>
    </ComponentWrapper>
  );
};

export default FeaturedPhotos;
