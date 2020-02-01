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

      <div id="mc_embed_signup">
        <form
          action="https://whidbeyherbal.us9.list-manage.com/subscribe/post?u=bbd87421737359b6e8f874c7e&amp;id=b69511f62c"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe to Our Newsletter</h2>
            <div class="mc-field-group">
              <label for="mce-EMAIL">Email Address </label>
              <input
                type="email"
                value=""
                name="EMAIL"
                class="required email"
                id="mce-EMAIL"
              />
            </div>
            <div id="mce-responses" class="clear">
              <div
                class="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                class="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div style={{position: 'absolute', left: '-5000px'}}>
              <input
                type="text"
                name="b_bbd87421737359b6e8f874c7e_b69511f62c"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="clear">
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                class="button"
              />
            </div>
          </div>
        </form>
      </div>

      <CopyrightText>© 2019, Whidbey Herbal</CopyrightText>
    </FooterContainer>
  );
}

export default Footer;