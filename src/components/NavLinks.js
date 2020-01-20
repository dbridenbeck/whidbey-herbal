import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as CartActionCreators from '../state/actions/cart';
import { NavHashLink as NavLink } from "react-router-hash-link";
import styled from 'styled-components';
import { device } from "../utils/devices";

const NavLinksWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 3px;
  padding: 0 5%;
  @media ${device.laptop} {
    align-items: center;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 3px;
    padding: 0 5%;
  }
`;

const StyledNavLinkContainer = styled.div`
  display: flex;
  color: black;
  justify-content: flex-start;
  margin-top: 10px;
  @media ${device.laptop} {
    margin-top: 0px;
    justify-content: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  display: inline-block;
  text-align: center;
  color: black;
  :visited {
    color: black;
  }
  &:hover {
    color: #e3be42;
  }
  @media ${device.laptop}
  {
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

const NavLinks = ({clearBurger}) => {

  // Add in functionality to close navpanel by turning burgerToggled to false on click!
  return (
    <NavLinksWrapper>
      {links.map(link => 
        <StyledNavLinkContainer key={link.name}>
        <StyledNavLink 
          smooth 
          to={link.destination}
          onClick={() => clearBurger()}
        >
          {link.name}
        </StyledNavLink>
      </StyledNavLinkContainer>
      )}
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
