import React from 'react';
import { withRouter } from "react-router-dom";
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
    /* Adjust right margin for homepage */
    margin: ${props => props.pathname === "/" ? "50px auto 0 0px" : "50px auto 0 -20px"};
    padding: 125px 10px 25px 10px;
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
  `;

const Footer = ({location: {pathname}}) => {
  console.log("pathname from footer: ", pathname);
  return (
    <FooterContainer pathname={pathname}>
      <NewsletterSignup />
      <ContactAndSocials />
    </FooterContainer>
  );
}

export default withRouter(Footer);