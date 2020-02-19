import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as CartActionCreators from '../state/actions/cart';
import { NavHashLink as NavLink } from "react-router-hash-link";
import styled from 'styled-components';
import { device } from "../utils/devices";

const NavLinksWrapper = styled.div`
  display: block;
  position: relative;
  width: 50%;
  margin-top: 15px;
  padding-left: 5%;
  @media ${device.laptop} {
    position: absolute;
    right: 0;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 475px;
  }
`;

const StyledNavLinkContainer = styled.div`
  color: #787878;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  color: #787878;
  :visited {
    color: #787878;
  }
  &:hover {
    color: #e3be42;
  }
  @media ${device.laptop} {
    text-align: center;
  }
`;

const links = [
  {
    name: "Shop",
    destination: "/shop",
  },
  {
    name: "About",
    destination: "/#about",
  },
  {
    name: "Process",
    destination: "/#process",
  },
  {
    name: "Find a Store",
    destination: "/#findstore",
  },
  {
    name: "Recipes",
    destination: "/#recipes",
  },
]

  const createStyledNavLink = (clearBurger, links) => {
    const handleClearBurger = () => clearBurger();
    return (
      links.map(link => 
        <StyledNavLinkContainer key={link.name}>
          <StyledNavLink 
            scroll={el => setTimeout((() => el.scrollIntoView({behavior: 'smooth'})), 310)} 
            to={link.destination}
            onClick={handleClearBurger}
          >
            {link.name}
          </StyledNavLink>
        </StyledNavLinkContainer>
      )
    )
  }
    
  const NavLinks = ({clearBurger}) => {
    return (
      <NavLinksWrapper>
        {createStyledNavLink(clearBurger, links)}
      </NavLinksWrapper>
  );
}

NavLinks.propTypes = {
  clearBurger: PropTypes.func,
}

const mapDispatchtoProps = (dispatch) => ({
  clearBurger: () => dispatch(CartActionCreators.clearBurger())
});

export default connect(null, mapDispatchtoProps)(NavLinks);
