import React from 'react';
import styled from 'styled-components';
import farmers from '../../../public/farmers.jpg';
import farmersWebp from '../../../public/farmers.webp';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';
import { device } from '../../utils/devices';
import Image from 'next/image';

const FarmerIllustration = styled.div`
  display: block;
  height: auto;
  width: 87%;
  max-width: 400px;
  margin: 0 auto;
  @media (min-width: 1281px) {
    max-width: 800px;
  }
`;

const AboutText = styled.div`
  padding: 0 20px;
  font-size: 0.875rem;
  line-height: 1.5em;
  font-weight: 300;
  text-align: center;
  color: #2e2e2e;
  margin: 0 auto;
  @media ${device.tablet} {
    font-size: 1rem;
    width: 48%;
    padding: 0;
  }
  @media ${device.laptop} {
    padding: 0;
    font-size: 1.5rem;
  }
`;

const About = () => {
  return (
    <ComponentWrapper id="about">
      <StyledH2>The Farmers</StyledH2>
      <FarmerIllustration>
        <Image
          src={farmers}
          alt="Watercolor of Sam and Caitlin, the farmers of Whidbey Herbal"
        />
      </FarmerIllustration>

      <AboutText>
        <p>
          Hi! We’re Caitlin and Sam Stanton, the farmers behind Whidbey Herbal.
          We grew up in the Pacific Northwest and are on a mission to capture
          this place in a bottle.
        </p>{' '}
        <p>
          A real estate ad for a 1914 abandoned farm brought us to Whidbey
          Island. We’re currently restoring the old farm into an eco homestead
          for growing and distilling healing plants.
        </p>
      </AboutText>
    </ComponentWrapper>
  );
};

export default About;
