import React from 'react';
import styled from 'styled-components';
import { device } from "../utils/devices";
import instagram from './images/instagram.png';
import facebook from './images/facebook.png';

  const ContactAndSocialsWrapper = styled.div`
    display: block;
    width: 100%;
    margin-top: 20px;
    z-index: 5;
    p {
      display: block;
      font-size: 1em;
      font-style: normal;
      font-weight: 300;
      color: #2e2e2e;
      margin: 20px 0;
    }
    .info-text {
      font-size: 0.825em;
    }
    a {
      font-weight: 300;
      color: #2e2e2e;
      text-decoration: none;
      :hover {
        color: black;
      }
    }
    @media ${device.tablet} {
      width: 35%;
      max-width: 448px;
    }
  `;

  const SocialIconContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  `;

  const SocialIcon = styled.img`
    display: inline-block;
    height: 25px;
    width: 25px;
    margin: 10px 20px 0 0;
  `;


const ContactAndSocials = () => {
  return (
    <ContactAndSocialsWrapper>
      <a href="mailto:hello@whidbeyherbal.com">hello@whidbeyherbal.com</a>
      <p>(360) 386-5831</p>
      <div  className="info-text">
        <p>
          Proud member of the Whidbey Island Grown cooperative.
        </p>
        <p>
          Website built by <a href="htt://darren.fun">Darren Bridenbeck</a>
        </p>
      </div>
      <SocialIconContainer>
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
      </SocialIconContainer>
    </ContactAndSocialsWrapper>
  );
};

export default ContactAndSocials;