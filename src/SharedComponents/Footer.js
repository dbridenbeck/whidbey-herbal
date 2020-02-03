import React from 'react';
import styled from 'styled-components';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';
import whPattern from './images/wh-pattern.jpg';
import NewsletterSignup from './NewsletterSignup';

  const FooterContainer = styled.div`
    display: block;
    position: relative;
    height: 630px;
    width: 100vw;
    margin: 0px auto 0px auto;
    background-color: rgb(230, 197, 100);
    ::after {
      content: "";
      background: url(${whPattern});
      opacity: 0.05;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  `;

  const SocialIconWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 70px;
  `;

  const SocialIcon = styled.img`
    display: inline-block;
    height: 25px;
    width: 25px;
    margin: 25px 10px 0px 10px;
  `;

  const CopyrightText = styled.p`
    width: 100%;
    text-align: center;
    color: #787878;
    letter-spacing: 0.01em;
    font-size: 14px;
    font-weight: normal;
  `;

const Footer = () => {

  return (
    <FooterContainer>
    <NewsletterSignup />
      <SocialIconWrapper>
        <a href="https://www.instagram.com/whidbeyherbal/">
          <SocialIcon
            src={`${instagram}`}
            height="512"
            width="512"
            alt="Instagram logo"
          />
        </a>
        <a href="https://www.facebook.com/WhidbeyHerbal/">
          <SocialIcon
            src={`${facebook}`}
            height="512"
            width="512"
            alt="Facebook logo"
          />
        </a>
      </SocialIconWrapper>


      <CopyrightText>© 2019, Whidbey Herbal</CopyrightText>
    </FooterContainer>
  );
}

export default Footer;