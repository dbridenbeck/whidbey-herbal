import React from "react";
import { connect } from 'react-redux';
import * as CartActionCreators from '../state/actions/cart';
import styled from 'styled-components';
import { device } from "../utils/devices";

const Burger = styled.div`
  margin: 1em;
  width: 40px;
  &:after,
  &:before,
  & div {
    background-color: black;
    border-radius: 3px;
    content: "";
    display: block;
    height: 3px;
    margin: 7px 0;
    transition: all 0.2s ease-in-out;
  }
  /* click sets burgerToggled to true, which animates hamburger to an "X" when clicked */
  ${props => {
    if (props.burgerToggled) {
      return `
        &:before {
          transform: translatey(10px) rotate(135deg);
        }
        &:after {
          transform: translateY(-10px) rotate(-135deg);
        }
        & div {
          transform: scale(0);
        }
      `
    }
  }}
  @media ${device.laptop} {
    display: none;
  }
`;

const Hamburger = (props) => {
  const createBurger = () => {
    const { toggleBurger, burgerToggled } = props;
    const toggle = () => toggleBurger();
    return (
      <Burger 
        burgerToggled={burgerToggled}
        onClick={toggle}
      >
        <div />
      </Burger>
    );
  }

  return (
    <div>
      {createBurger()}
    </div>
  );
}

const mapStateToProps = (Reducer1) => ({
  burgerToggled: Reducer1.burgerToggled
})

const mapDispatchToProps = dispatch => ({
  toggleBurger: () => dispatch(CartActionCreators.toggleBurger())
});

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);
