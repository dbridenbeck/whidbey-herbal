import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from 'styled-components';
import NavPanel from './NavPanel';
import Hamburger from './Hamburger';
import { device } from "../utils/devices";
import cart from "../images/cart.png";
import cartYellow from "../images/cart-yellow.png";
import horizLogo from "../images/horiz-logo.png";

export class Header extends Component {
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
          const { Reducer1 } = this.props
           return (
            <Navbar 
            className={this.state.show ? "active" : "hidden"}
            scrollPos={this.state.scrollPos}
            >
              <Hamburger>
                <div />
              </Hamburger>
              <HomeLink to={`/`}></HomeLink>
              <NavPanel
                burgerToggled={Reducer1.burgerToggled}
                burgerClickedOnce={Reducer1.burgerClickedOnce}
              />
              <CheckoutLink to={`/checkout`}></CheckoutLink>
            </Navbar>
           );
         }

       }

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
  :hover {
    opacity: 1;
  }
  /* control Navbar show/hide when on laptop */
  @media ${device.laptop} {
    opacity: 0;
    &.active {
    opacity: 1;
    transition: opacity 200ms ease-in;
    }
    &.hidden {
      opacity: 0;
      :hover {
        opacity: ${props => props.scrollPos > 0 && props.scrollPos <= 50 ? '1' : '0'};
      }
      transition: opacity 200ms ease-out;
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

const HomeLink = styled(NavLink)`
  width: 250px;
  height: 100%;
  background-image: url(${horizLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  &:hover {
    color: tomato;
  }
`;  

const mapStateToProps = Reducer1 => ({
  Reducer1
});

export default connect(mapStateToProps, null)(Header);