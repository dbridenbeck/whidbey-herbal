import React from 'react';
import * as CartActionCreators from '../../state/actions/cart';
import Link from 'next/link';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';
import horizLogo from '../../../public/horiz-logo.png';

import NavPanel from './NavPanel';
import Hamburger from './Hamburger';
import { device } from '../../utils/devices';

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
`;

const CheckoutLink = styled.div`
  position: relative;
  cursor: pointer;
  width: 48px;
  height: 100%;
  margin-right: 20px;
  background-image: url('/cart.png');
  background-position: center;
  background-size: auto 60%;
  background-repeat: no-repeat;
  &:hover {
    background-image: url('/cart-yellow.png');
  }
  .item-counter {
    width: 25px;
    height: 25px;
    opacity: ${(props) => (props.itemsincart ? '1' : '0')};
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

const HomeLink = styled.div`
  height: 49;
  width: 225px;
  margin: 7px auto 0 auto;
  @media ${device.laptop} {
    margin: 5px 24px 0;
  }
`;

const Header = ({ lineItems, clearBurger, burgerToggled }) => {
  const createCheckoutLink = () => {
    const itemsInCart = () => {
      if (lineItems.length) {
        return lineItems
          .map((lineItem) => lineItem.quantity)
          .filter(Boolean)
          .reduce(
            (itemTotal, quantity) => parseFloat(quantity, 2) + itemTotal,
            0
          );
      }
    };
    return (
      <Link href={`/checkout`}>
        <CheckoutLink itemsincart={itemsInCart()}>
          <div className="item-counter" onClick={clearBurger}>
            {itemsInCart()}
          </div>
        </CheckoutLink>
      </Link>
    );
  };

  const createNavBar = () => {
    return (
      <Navbar id="home">
        <Hamburger />
        <Link href={`/#home`}>
          <HomeLink>
            <Image
              src={horizLogo}
              height="49"
              width="225"
              alt="Whidbey Herbal Logo"
              onClick={clearBurger}
            />
          </HomeLink>
        </Link>
        <NavPanel burgerToggled={burgerToggled} />
        {createCheckoutLink()}
      </Navbar>
    );
  };

  return <>{createNavBar()}</>;
};

Header.propTypes = {
  burgerToggled: PropTypes.bool,
  lineItems: PropTypes.array,
};

const mapDispatchtoProps = (dispatch) => ({
  clearBurger: () => dispatch(CartActionCreators.clearBurger()),
});

const mapStatetoProps = ({ burgerToggled, checkout: { lineItems } }) => ({
  burgerToggled,
  lineItems,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);
