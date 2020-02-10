import React from 'react';
import styled from "styled-components";
import farmers from './images/farmers.jpg';
import Wrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";

const FarmerIllustration = styled.img`
  display: block;
  height: auto;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const AboutText = styled.p`
  font-size: 0.875em;
  line-height: 1.5em;
  font-style: normal;
  letter-spacing: 0.01em;
  color: #787878;
`;

const About = () => {
  return (
    <Wrapper id="about" maxWidth={"600px"} positionRelative={true}>
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
        Caitlin and Sam Stanton are fifth and third generation Northwesterners,
        respectively. We love our community for its independence, and support of
        small farms. Our hobbies are backpacking, boats, knitting, and
        gardening. We live on the farm with our son Forrest and our dogs Bonnie
        and Merlin.
      </AboutText>
    </Wrapper>
  );
}

export default About;