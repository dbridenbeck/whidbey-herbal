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
    opacity: ${props => (props.currentRoute !== "/" ? "0" : "1")};
    &.active {
      opacity: 1;
      transition: opacity 200ms ease-in;
    }
    &.hidden {
      opacity: ${props =>
        props.currentRoute !== "/" || props.lineItems.length ? "1" : "0"};
      transition: opacity 200ms ease-out;
      :hover {
        opacity: ${props =>
          (props.scrollPos >= 0 && props.scrollPos <= 50) ||
          props.currentRoute !== "/"
            ? "1"
            : "0"};
      }
    }
  }
`;

const CheckoutLink = styled(NavLink)`
  position: relative;
  width: 48px;
  height: 100%;
  margin: 0 3%;
  background-image: url(${cart});
  background-position: center;
  background-size: auto 60%;
  background-repeat: no-repeat;
  &:hover {
    background-image: url(${cartYellow});
  }
  .item-counter {
    width: 25px;
    height: 25px;
    opacity: ${props => (props.itemsincart ? "1" : "0")};
    position: absolute;
    right: -10px;
    top: 2px;
    padding-top: 2px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    color: #787878;
    background-color: rgba(227, 190, 66, 0.6);
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
  }
`;

const HomeLink = styled.img`
  height: 50px;
  width: auto;
  margin: 5px 10% 0 10%;
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
  const { burgerToggled, lineItems } = this.props
  const itemsInCart = () => {
    if (lineItems.length) {
      return lineItems
              .map(lineItem => lineItem.quantity)
              .filter(Boolean)
              .reduce((itemTotal, quantity) => (parseFloat(quantity, 2) + itemTotal ), 0)
    }
  };

  return (
    <Navbar 
    className={this.state.show ? "active" : "hidden"}
    scrollPos={this.state.scrollPos}
    currentRoute={this.props.location.pathname}
    lineItems={lineItems}
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
      <CheckoutLink to={`/checkout`} itemsincart={itemsInCart()}>
        <div className="item-counter">{itemsInCart()}</div>
      </CheckoutLink>
    </Navbar>
    );
  }
}

Header.propTypes = {
  burgerToggled: PropTypes.bool,
  lineItems: PropTypes.array
};


const mapStateToProps = ({burgerToggled, checkout: {lineItems}}) => ({
  burgerToggled,
  lineItems
});

export default connect(mapStateToProps, null)(withRouter(Header));