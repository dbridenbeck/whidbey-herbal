import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from "../utils/devices";
import StyledH1 from './StyledH1';
import StyledH3 from './StyledH3';
import loop from "./images/loop.png";

const SignupWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding: 0 5% 5% 0;
  .setH1Width {
    display: inline-block;
    position: relative;
    img {
      position: absolute;
      top: 1%;
      right: -19.5%;
      width: 33%;
    }
  }
  @media ${device.tablet} {
    width: 65%;
    max-width: 832px;
  }
`;

const FormContainer = styled.div`
  display: block;
  margin-top: 40px;
  input {
    font-size: 1.2em;
    border: 1px solid blue;
    font-family: "Open Sans", sans-serif;
    border: 1px solid #787878;
    height: 2.25em;
    padding: 0;
    margin: 0;
  }
  .emailInput {
    width: 65%;
    max-width: 300px;
    padding-left: 5px;
    margin: 0;
    color: #787878;
    border: 1px solid #787878;
  }
  .submitInput {
    padding: 0 10px;
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 0.25);
    :hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export class NewsletterSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
    }
  }

  render() {
    return (
      <SignupWrapper>
        <div className="setH1Width">
          <StyledH1>
            Stay in <br /> the loop.
          </StyledH1>
          <img src={loop} alt="A hand drawn loop-de-loop" />
        </div>
        <StyledH3>Subscribe to our newsletter below</StyledH3>
        <FormContainer>
          <form
            action="https://whidbeyherbal.us9.list-manage.com/subscribe/post"
            method="POST"
            noValidate
          >
            <input type="hidden" name="u" value="bbd87421737359b6e8f874c7e" />
            <input type="hidden" name="id" value="b69511f62c" />
            <label htmlFor="MERGE0">
              <input
                type="email"
                name="EMAIL"
                id="MERGE0"
                value={this.state.emailValue}
                onChange={e => {
                  this.setState({ emailValue: e.target.value });
                }}
                autoCapitalize="off"
                autoCorrect="off"
                className="emailInput"
              />
            </label>
            <input
              type="submit"
              value="Submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button submitInput"
            />

            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
              aria-label="Please leave the following three fields empty"
            >
              <label htmlFor="b_name">Name: </label>
              <input
                readOnly
                type="text"
                name="b_name"
                tabIndex="-1"
                value=""
                placeholder="Freddie"
                id="b_name"
              />

              <label htmlFor="b_email">Email: </label>
              <input
                readOnly
                type="email"
                name="b_email"
                tabIndex="-1"
                value=""
                placeholder="youremail@gmail.com"
                id="b_email"
              />

              <label htmlFor="b_comment">Comment: </label>
              <textarea
                name="b_comment"
                tabIndex="-1"
                placeholder="Please comment"
                id="b_comment"
              ></textarea>
            </div>
          </form>
        </FormContainer>
      </SignupWrapper>
    );
  }
}

export default NewsletterSignup;