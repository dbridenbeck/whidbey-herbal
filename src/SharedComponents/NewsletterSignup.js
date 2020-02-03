import React, { Component } from 'react';
import styled from 'styled-components';

export class NewsletterSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
    }
  }

  render() {
    return (
      <form
        action="https://whidbeyherbal.us9.list-manage.com/subscribe/post"
        method="POST"
        noValidate
      >
        <input type="hidden" name="u" value="bbd87421737359b6e8f874c7e" />
        <input type="hidden" name="id" value="b69511f62c" />
        <label htmlFor="MERGE0">
          Email
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
          />
        </label>
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          className="button"
        />

        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
          aria-label="Please leave the following three fields empty"
        >
          <label htmlFor="b_name">Name: </label>
          <input
            type="text"
            name="b_name"
            tabIndex="-1"
            value=""
            placeholder="Freddie"
            id="b_name"
          />

          <label htmlFor="b_email">Email: </label>
          <input
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
    );
  }
}

export default NewsletterSignup;