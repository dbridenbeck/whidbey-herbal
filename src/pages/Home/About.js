import React from 'react';
import styled from "styled-components";
import farmers from './images/farmers.jpg';
import farmersWebp from './images/farmers.webp';
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";
import { device } from "../../utils/devices";

const FarmerIllustration = styled.picture`
  img {
    display: block;
    height: auto;
    width: 87%;
    max-width: 400px;
    margin: 0 auto;
    @media (min-width: 1281px) {
      max-width: 800px;
    }
  }
`;

const AboutText = styled.p`
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
      <StyledH2 >
        The Farmers
      </StyledH2>
      <FarmerIllustration>
        <source srcset={`${farmersWebp}`} type='image/webp' />
        <source srcset={`${farmers}`} type='image/jpeg' />
        <img src={`${farmers}`}
        alt="Watercolor image of Sam and Caitlin, the farmers of Whidbey Herbal"
        />
      </FarmerIllustration>
        
      <AboutText>
        We’re Caitlin and Sam Stanton, and we’re fifth and third generation
        Northwesterners, respectively. We love our community for its
        independence, and support of small farms. Our hobbies are backpacking,
        boats, knitting, and gardening. We live on the farm with our son Forrest
        and our dogs Bonnie and Merlin.
      </AboutText>
    </ComponentWrapper>
  );
}

export default About;