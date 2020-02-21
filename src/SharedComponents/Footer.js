import React from 'react';
import styled from 'styled-components';
import whPattern from './images/wh-pattern.jpg';
import { device } from "../utils/devices";
import NewsletterSignup from './NewsletterSignup';
import ContactAndSocials from './ContactAndSocials';

  const FooterContainer = styled.div`
    display: block;
    position: relative;
    height: 630px;
    width: 100vw;
    margin: 50px auto 0 0;
    padding: 15% 5% 5% 5%;
    background-color: rgba(230, 197, 100, 1);
    ::before {
      content: "";
      background: url(${whPattern});
      opacity: 0.04;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    @media ${device.tablet} {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    @media ${device.largeScreen} {
      /* maring-left and margin-right used to create full bar given Layout's MasterWrapper 
      has a known width of 1200px on large screens and -20px is used to offset pagewrapper's 20px left padding */
      margin-left: calc((-100vw / 2) + (1200px / 2));
      margin-right: calc(-100vw / 2 + 1200px / 2);
    }
  `;

const Footer = () => {
  return (
    <FooterContainer>
      <NewsletterSignup />
      <ContactAndSocials />
    </FooterContainer>
  );
}

export default Footer;