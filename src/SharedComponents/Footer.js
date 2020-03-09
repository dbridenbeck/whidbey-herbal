import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import whPattern from './images/wh-pattern.jpg';
import whPatternWebp from './images/wh-pattern.webp';
import { device } from "../utils/devices";
import NewsletterSignup from './NewsletterSignup';
import ContactAndSocials from './ContactAndSocials';

  const FooterContainer = styled.div`
    display: block;
    position: relative;
    height: 630px;
    width: 100vw;
    /* Adjust right margin for homepage */
    margin: ${props => props.pathname === "/" ? "200px auto 0 0px" : "200px auto 0 -20px"};
    padding: 125px 10px 25px 10px;
    background-color: rgba(230, 197, 100, 1);
    overflow: hidden;
    @media ${device.tablet} {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `;

  const WHPatternBackground = styled.picture`
    height: 110%;
    img {
      background-size: auto;
      opacity: 0.04;
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      @media (min-width: 1281px) {
        height: 125%;
      }
    }
  `;

const Footer = ({location: {pathname}}) => {
  return (
    <FooterContainer pathname={pathname}>
      <WHPatternBackground>
        <source srcSet={whPatternWebp} type="image/webp" />
        <source srcSet={whPattern} type="image/jpeg" />
        <img src={whPattern} alt="Cute Woodland Style Line Drawings" />
      </WHPatternBackground>
      <NewsletterSignup />
      <ContactAndSocials />
    </FooterContainer>
  );
}

export default withRouter(Footer);