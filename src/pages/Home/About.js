import React from 'react';
import styled from 'styled-components';
import farmers from './images/farmers.jpg';
import farmersWebp from './images/farmers.webp';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';
import { device } from '../../utils/devices';

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

const AboutText = styled.div`
  padding: 0 20px;
  font-size: 0.875rem;
  line-height: 1.5em;
  font-weight: 300;
  text-align: center;
  text-indent: 1.5rem;
  color: #2e2e2e;
  margin: 0 auto;
  width: 48ch;
  @media ${device.tablet} {
    font-size: 1rem;
    padding: 0;
  }
  @media ${device.laptop} {
    padding: 0;
    font-size: 1.5rem;
  }

  .insta-link {
    text-decoration: none;
    color: #2e2e2e;
    &:hover {
      color: #e3be42;
    }
  }
`;

const About = () => {
  return (
    <ComponentWrapper id='about'>
      <StyledH2>The Farmers</StyledH2>
      <FarmerIllustration>
        <source srcSet={`${farmersWebp}`} type='image/webp' />
        <source srcSet={`${farmers}`} type='image/jpeg' />
        <img
          src={`${farmers}`}
          alt='Watercolor of Sam and Caitlin, the farmers of Whidbey Herbal'
        />
      </FarmerIllustration>

      <AboutText>
        <p>
          Hi! We’re Caitlin and Sam, <br /> the farmers behind Whidbey Herbal.
          <br />
        </p>
        <p className='text-box-middle'>
          We grew up in the Pacific Northwest and have spent the past 5 years
          transforming a run down 1914 homestead into a thriving organic farm
          for herbs, mushrooms, and native plants. Our goal is to create plant
          potions so &nbsp;extraordinary&nbsp;they make you feel more connected
          to the natural world every dang day.
        </p>
        <p>
          Follow along with our farm journey on Instagram
          <b>
            <a
              class='insta-link'
              target='_blank'
              rel='noopener noreferrer'
              href='http://www.instagram.com/whidbeyherbal'
            >
              &nbsp;@whidbeyherbal
            </a>
          </b>
          , or scroll to the bottom of this page to sign up for our
          extra-super-special email newsletter.
        </p>
      </AboutText>
    </ComponentWrapper>
  );
};

export default About;
