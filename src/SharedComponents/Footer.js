import React from 'react';
import styled from 'styled-components';
import whPattern from './images/wh-pattern.jpg';
import NewsletterSignup from './NewsletterSignup';
import ContactAndSocials from './ContactAndSocials';

  const FooterContainer = styled.div`
    display: block;
    position: relative;
    height: 630px;
    width: 100vw;
    margin: 0px auto 0px auto;
    padding: 0 20px;
    background-color: rgba(230, 197, 100, 0.95);
    ::after {
      content: "";
      background: url(${whPattern});
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
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