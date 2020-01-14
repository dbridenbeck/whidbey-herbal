import React from 'react';
import styled from "styled-components";
import { device } from "../utils/devices";
import { laptopMargins, tabletMargins, mobileMargins, fluidText, fluidH1 } from "../utils/responsiveSCSS";
import farmers from '../images/farmers.jpg';

const AboutContainer = styled.div`
  width: 100%;
  max-width: 600px;
  ${mobileMargins};
  @media ${device.tablet} {
    ${tabletMargins};
  }
  @media ${device.laptop} {
    ${laptopMargins};
  }
`;

const Title = styled.h1`
  font-weight: bold;
  ${fluidH1}
  text-align: center;
  color: #787878;
`;

const FarmerIllustration = styled.img`
  display: block;
  height: auto;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const AboutText = styled.p`
  ${fluidText}
  font-style: normal;
  letter-spacing: 0.01em;
  color: #787878;
`;

const About = () => {
  return (
    <AboutContainer id="about">
      <Title>About the Farmers</Title>
      <FarmerIllustration 
        src={`${farmers}`} 
        width="1200" 
        height="1121" 
        alt="Watercolor image of Sam and Caitlin, the farmers of Whidbey Herbal"
      />
      <AboutText>
        Caitlin and Sam Stanton are fifth and third generation Northwesterners,
        respectively. We love our community for its independence, and support of
        small farms. Our hobbies are backpacking, boats, knitting, and
        gardening. We live on the farm with our son Forrest and our dogs Bonnie
        and Merlin.
      </AboutText>
    </AboutContainer>
  );
}

export default About;