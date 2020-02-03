import React from 'react';
import styled from 'styled-components';
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';

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


const ContactAndSocials = () => {
  return (
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
  );
};

export default ContactAndSocials;