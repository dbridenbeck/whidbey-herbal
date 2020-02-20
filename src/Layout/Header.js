import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import * as CartActionCreators from "../state/actions/cart";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { connect } from "react-redux";
import styled from 'styled-components';
import PropTypes from "prop-types";

import NavPanel from './NavPanel';
import Hamburger from './Hamburger';
import { device } from "../utils/devices";

import cart from "./images/cart.png";
import cartYellow from "./images/cart-yellow.png";
import horizLogo from "./images/horiz-logo.png";

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
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  :hover {
    opacity: 1;
  }
  /* control Navbar show/hide for scroll & hover when on laptop */
  @media ${device.laptop} {
    /* show Navbar on pages other than homepage */
    opacity: ${props => (props.currentRoute !== "/" ? "0" : "1")};
    &.active {
      opacity: 1;
      transition: opacity 200ms ease-in;
    }
    &.hidden {
      /* show Navbar on homepage if checkout has lineItems in it */
      opacity: ${props =>
        props.currentRoute !== "/" || props.lineItems.length ? "1" : "0"};
      transition: opacity 200ms ease-out;
      :hover {
        opacity: 1;
      }
    }
  }
`;

const CheckoutLink = styled(NavLink)`
  position: relative;
  width: 48px;
  height: 100%;
  margin-right: 15px;
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
  @media ${device.laptop} {
    margin: 0 3%;
  }
`;

const HomeLink = styled.img`
  width: 100%;
  max-width: 225px;
  height: auto;
  margin: 7px auto 0 auto;
  @media ${device.laptop} {
    max-width: 275px;
    margin: 5px 10% 0 10%;
  }
`;

export class Header extends PureComponent {
// Using component state to control show/hide behavior for header
  constructor(props) {
    super(props);
    this.state = {
      // If you want to re-instate hidden Header on load, change to show: false
      show: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.createCheckoutLink = this.createCheckoutLink.bind(this);
    this.createNavBar = this.createNavBar.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  
  // Set show to true if document is scrolled lower than 60px from
  handleScroll() {
    if (
      this.state.show === false
    ) {
      this.setState({
        show: document.body.getBoundingClientRect().top < -60
      });
    }
  }
  
  createCheckoutLink = () => {
    const { lineItems, clearBurger } = this.props
    const itemsInCart = () => {
      if (lineItems.length) {
        return lineItems
          .map(lineItem => lineItem.quantity)
          .filter(Boolean)
          .reduce((itemTotal, quantity) => (parseFloat(quantity, 2) + itemTotal ), 0)
      }
    };
    return (
      <CheckoutLink 
        to={`/checkout`} 
        itemsincart={itemsInCart()}
        onClick={clearBurger}
      >
        <div className="item-counter">{itemsInCart()}</div>
      </CheckoutLink>
    )
  }

  createNavBar = () => {
    const { burgerToggled, lineItems, clearBurger } = this.props;
    
    return (
    <Navbar 
      className={this.state.show ? "active" : "hidden"}
      scrollPos={this.state.scrollPos}
      currentRoute={this.props.location.pathname}
      lineItems={lineItems}
    >
      <Hamburger />      
      <NavLink smooth to={`/#home`}>
        <HomeLink 
          src={`${horizLogo}`} 
          width="1200"
          height="263"
          alt="Whidbey Herbal Logo"
          onClick={clearBurger}
        />
      </NavLink>
      <NavPanel
        burgerToggled={burgerToggled}
      />
      {this.createCheckoutLink()}
    </Navbar>
    )
  }

  render() {
  return (
    <>
      {this.createNavBar()}
    </>
    );
  }
}

Header.propTypes = {
  burgerToggled: PropTypes.bool,
  lineItems: PropTypes.array
};

const mapDispatchtoProps = dispatch => ({
  clearBurger: () => dispatch(CartActionCreators.clearBurger())
});

const mapStatetoProps = ({burgerToggled, checkout: {lineItems}}) => ({
  burgerToggled,
  lineItems
});

export default connect(mapStatetoProps, mapDispatchtoProps)(withRouter(Header));