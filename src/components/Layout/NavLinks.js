import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as CartActionCreators from '../../state/actions/cart';
import styled from 'styled-components';
import { device } from '../../utils/devices';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const StyledLinkContainer = styled.div``;

const StyledLink = styled.div`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.5em;
  font-weight: 300;
  a {
    color: black;
    text-decoration: none;
    :visited {
      color: black;
    }
    &:hover {
      color: #e3be42;
    }
  }
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
`;

const links = [
  {
    name: 'Shop',
    destination: '/shop',
  },
  {
    name: 'About',
    destination: '#about',
  },
  {
    name: 'Process',
    destination: '#process',
  },
  {
    name: 'Find a Store',
    destination: '#findstore',
  },
  {
    name: 'Recipes',
    destination: '#recipes',
  },
];

const NavLinks = ({ clearBurger }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);
  const createStyledLink = (clearBurger, links) => {
    const handleClearBurger = (link) => {
      if (isMounted && link.name !== 'Shop') {
        const element = document.querySelector(link.destination);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }
      clearBurger();
    };

    return links.map((link) => {
      return (
        <StyledLinkContainer key={link.name}>
          <StyledLink onClick={() => handleClearBurger(link)}>
            {link.name !== 'Shop' ? (
              link.name
            ) : (
              <Link href={link.destination}>{link.name}</Link>
            )}
          </StyledLink>
        </StyledLinkContainer>
      );
    });
  };
  return <LinksWrapper>{createStyledLink(clearBurger, links)}</LinksWrapper>;
};

NavLinks.propTypes = {
  clearBurger: PropTypes.func,
};

const mapDispatchtoProps = (dispatch) => ({
  clearBurger: () => dispatch(CartActionCreators.clearBurger()),
});

export default connect(null, mapDispatchtoProps)(NavLinks);
