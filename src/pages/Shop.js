import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Products from '../components/Products';
import Reviews from '../components/Reviews';
import QuantityButton from '../components/QuantityButton';
import BuyButton from '../components/BuyButton';
import ProductInfo from '../components/ProductInfo';

import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";


// Begin Styled Components
const ShopWrapper = styled.div`
  display: block;
  height: auto;
  width: 100%;
  margin: 90px auto 0 auto;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  color: #e3be42;
  font-size: min(max(26px, 5vw), 54px);
  font-weight: bold;
  @media ${device.tablet} {
    margin-top: -4%;
  }
`;

// begin component
const Shop = ({
}) => {

  // begin component's return
  return (
    <ShopWrapper>
      <Title>Shop</Title>
      <Products title={''} />
    </ShopWrapper>
  );
};

export default Shop;
