import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as CartActionCreators from '../../state/actions/cart';
import styled from 'styled-components';
import { device } from '../../utils/devices';

const Burger = styled.div`
  width: 40px;
  margin: 1em;
  &:after,
  &:before,
  & div {
    display: block;
    height: 3px;
    margin: 7px 0;
    background-color: black;
    border-radius: 3px;
    content: '';
    transition: all 0.2s ease-in-out;
  }
  /* click sets burgerToggled to true, which animates hamburger to an "X" when clicked */
  ${(props) => {
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
      `;
    }
  }}
  @media ${device.laptop} {
    display: none;
  }
`;

const createBurger = ({ burgerToggled, toggleBurger }) => {
  const toggle = () => toggleBurger();
  return (
    <Burger burgerToggled={burgerToggled} onClick={toggle}>
      <div />
    </Burger>
  );
};

const Hamburger = (props) => createBurger(props);

Hamburger.propTypes = {
  burgerToggled: PropTypes.bool,
  toggleBurger: PropTypes.func,
};

const mapStateToProps = ({ burgerToggled }) => ({
  burgerToggled,
});

const mapDispatchToProps = (dispatch) => ({
  toggleBurger: () => dispatch(CartActionCreators.toggleBurger()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);
