import React from 'react';
import styled from 'styled-components';
import whPattern from '../../public/wh-pattern.jpg';
import whPatternWebp from '../../public/wh-pattern.webp';
import { device } from '../utils/devices';
import NewsletterSignup from './NewsletterSignup';
import ContactAndSocials from './ContactAndSocials';
import Image from 'next/image';

const FooterContainer = styled.div`
  display: block;
  position: relative;
  height: 630px;
  width: 100vw;
  /* Adjust right margin for homepage */
  margin: '200px auto 0 0px';
  padding: 125px 10px 25px 10px;
  background-color: rgba(230, 197, 100, 1);
  overflow: hidden;
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const WHPatternBackground = styled.div`
  opacity: 0.04;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @media (min-width: 1281px) {
    height: 125%;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <WHPatternBackground>
        <Image src={whPattern} layout="fill" objectFit="cover" />
      </WHPatternBackground>
      <NewsletterSignup />
      <ContactAndSocials />
    </FooterContainer>
  );
};

export default Footer;
