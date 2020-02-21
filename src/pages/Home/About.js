import React from 'react';
import styled from "styled-components";
import farmers from './images/farmers.jpg';
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";
import { device } from "../../utils/devices";

const FarmerIllustration = styled.img`
  display: block;
  height: auto;
  width: 87%;
  max-width: 400px;
  margin: 0 auto;
`;

const AboutText = styled.p`
  padding: 0 20px;
  font-size: 0.875rem;
  line-height: 1.5em;
  font-weight: 300;
  text-align: center;
  color: #2e2e2e;
  @media ${device.tablet} {
    font-size: 1rem;
    padding: 0;
  }
  @media ${device.laptop} {
    padding: 0;
    font-size: 1.5rem;
  }
`;

const About = () => {
  return (
    <ComponentWrapper id="about" maxWidth={"590px"}>
      <StyledH2 colorIsGrey={true} centered={true}>
        The Farmers
      </StyledH2>
      <FarmerIllustration
        src={`${farmers}`}
        width="1200"
        height="1121"
        alt="Watercolor image of Sam and Caitlin, the farmers of Whidbey Herbal"
      />
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