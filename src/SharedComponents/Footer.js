import React from 'react';
import styled from 'styled-components';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';

  const FooterContainer = styled.div`
    display: block;
    width: 100%;
    border-top: 1px solid #787878;
    margin: 0px auto 0px auto;
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