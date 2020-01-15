import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { connect } from "react-redux";
import styled from 'styled-components';
import PropTypes from "prop-types";

import NavPanel from './NavPanel';
import Hamburger from './Hamburger';
import { device } from "../utils/devices";

import cart from "../images/cart.png";
import cartYellow from "../images/cart-yellow.png";
import horizLogo from "../images/horiz-logo.png";

const Navbar = styled.div`
  z-index: 1000;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid #e3be42;
  :hover {
    opacity: 1;
  }
  /* control Navbar show/hide for scroll & hover when on laptop */
  @media ${device.laptop} {
    opacity: ${props =>
      props.currentRoute !== "/"
        ? "0"
        : "1"};
    &.active {
      opacity: 1;
      transition: opacity 200ms ease-in;
    }
    &.hidden {
      opacity: ${props =>
        props.currentRoute !== "/"
          ? "1"
          : "0"};
      transition: opacity 200ms ease-out;
      :hover {
        opacity: ${props =>
          (props.scrollPos >= 0 && props.scrollPos <= 50) || 
          (props.currentRoute !== "/") 
          ? "1" 
          : "0"};
      }
    }
  }
`;

const CheckoutLink = styled(NavLink)`
  width: 10%;
  height: 100%;
  background-image: url(${cart});
  background-position: center;
  background-size: auto 60%;
  background-repeat: no-repeat;
  &:hover {
    background-image: url(${cartYellow});
  }
`;

const HomeLink = styled.img`
  height: 50px;
  width: auto;
`;

export class Header extends Component {
// Using component state to control show/hide behavior for header
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      scrollPos: 50
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      show: document.body.getBoundingClientRect().top < 0
    });
  }
  
  render() {
  console.log("props!: ", this.props);
  const { burgerToggled } = this.props
    return (
    <Navbar 
    className={this.state.show ? "active" : "hidden"}
    scrollPos={this.state.scrollPos}
    currentRoute={this.props.location.pathname}
    >
      <Hamburger>
        {/* This div creates the hamburger using before & after css pseudoclasses */}
        <div />
      </Hamburger>
      
      <NavLink to={`/#home`}>
        <HomeLink 
          src={`${horizLogo}`} 
          width="1200"
          height="263"
          alt="Whidbey Herbal Logo"
        />
      </NavLink>

      <NavPanel
        burgerToggled={burgerToggled}
      />
      <CheckoutLink to={`/checkout`}></CheckoutLink>
    </Navbar>
    );
  }
}

Header.propTypes = {
  burgerToggled: PropTypes.bool
};


const mapStateToProps = ({burgerToggled}) => ({
  burgerToggled
});

export default connect(mapStateToProps, null)(withRouter(Header));