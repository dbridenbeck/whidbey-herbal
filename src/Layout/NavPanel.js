import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NavLinks from "./NavLinks";
import { device } from "../utils/devices";

const PanelWrapper = styled.div`
  /* make navpanel display as hamburger-controled slider when mobile */
  display: block;
  position: absolute;
  top: 0;
  margin-top: 60px;
  padding: 0;
  z-index: 6;
  /* make navpanel display in top navbar when on laptop */
  @media ${device.laptop} {
    position: relative;
    height: 100%;
    width: 100%;
    flex: 2;
    margin: 0 0 0 5%;
    z-index: 6;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  left: 0;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.75s ease-in-out;
  &.openPanel {
    width: 100vw;
    left: 0;
    left: 0;
    opacity: 1;
    transition: all 0.5s ease-in-out;
    /* ignore .openPanel transition and always make visible on laptop */
    @media ${device.laptop} {
      display: flex;
      left: 0;
      width: 100%;
      height: 100%;
      background: none;
      opacity: 1;
      transition: none;
    }
  }
  &.closePanel {
    left: -200px;
    width: 25vw;
    opacity: 0;
    transition: all .5s ease-in-out;
    /* ignore .closePanel transition and always make visible on laptop */
    @media ${device.laptop} {
      display: flex;
      width: 100%;
      height: 100%;
      left: 0;
      background: none;
      opacity: 1;
      transition: none;
    }
  }
`;

const NavPanel = ({burgerToggled}) => {
  return (
    <PanelWrapper className="PanelWrapper">
      <Panel
        className={burgerToggled ? "openPanel" : "closePanel"}
      >
        <NavLinks />
      </Panel>
    </PanelWrapper>
  );
}

NavPanel.propTypes = {
  burgerToggled: PropTypes.bool,
}

export default React.memo(NavPanel);