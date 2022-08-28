import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as CartActionCreators from '../../state/actions/cart';
import Link from 'next/link';
import styled from 'styled-components';
import { device } from '../../utils/devices';

const LinksWrapper = styled.div`
  display: block;
  position: relative;
  width: 50%;
  margin: 15px 0 0 50px;
  @media ${device.laptop} {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    padding: 0;
  }
`;

const StyledLinkContainer = styled.div`
  color: #787878;
`;

const StyledLink = styled.div`
  a {
    display: inline-block;
    text-decoration: none;
    text-align: center;
    font-size: 1.125rem;
    line-height: 1.5em;
    font-weight: 300;
    color: black;
    :visited {
      color: black;
    }
    &:hover {
      color: #e3be42;
    }
    @media ${device.laptop} {
      padding: 0;
      text-align: center;
    }
  }
`;

const links = [
  {
    name: 'Shop',
    destination: '/shop',
  },
  {
    name: 'About',
    destination: '/#about',
  },
  {
    name: 'Process',
    destination: '/#process',
  },
  {
    name: 'Find a Store',
    destination: '/#findstore',
  },
  {
    name: 'Recipes',
    destination: '/#recipes',
  },
];

const createStyledLink = (clearBurger, links) => {
  const handleClearBurger = () => clearBurger();
  return links.map((link) => (
    <StyledLinkContainer key={link.name}>
      <StyledLink onClick={handleClearBurger}>
        <Link href={link.destination}>{link.name}</Link>
      </StyledLink>
    </StyledLinkContainer>
  ));
};

const NavLinks = ({ clearBurger }) => {
  return <LinksWrapper>{createStyledLink(clearBurger, links)}</LinksWrapper>;
};

NavLinks.propTypes = {
  clearBurger: PropTypes.func,
};

const mapDispatchtoProps = (dispatch) => ({
  clearBurger: () => dispatch(CartActionCreators.clearBurger()),
});

export default connect(null, mapDispatchtoProps)(NavLinks);
