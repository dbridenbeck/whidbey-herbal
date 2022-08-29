import React from 'react';
import styled from 'styled-components';
import { device } from '../utils/devices';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: ${(props) => props.maxWidth};
  /* conditional for process allows the yellow svg circle to position correctly
  and responsively overlap the storeLocator component */
  margin: 0 auto;
  margin-bottom: ${(props) => (props.id === 'process' ? '-3%' : '0px')};
  padding-top: 100px;
  padding-bottom: ${(props) =>
    props.id === 'process' ? '12%' : props.bottomPadding ? '100px' : '0px'};
  /* Create full width color bars */
  ${({ backgroundColor }) =>
    backgroundColor &&
    `
    position: relative;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    background-color: ${backgroundColor};
    `}
  @media ${device.tablet} {
    padding-top: 200px;
  }
`;

const ComponentWrapper = ({
  maxWidth,
  children,
  id,
  backgroundColor,
  bottomPadding,
}) => {
  return (
    <StyledWrapper
      maxWidth={maxWidth}
      id={id}
      backgroundColor={backgroundColor}
      bottomPadding={bottomPadding}
    >
      {children}
    </StyledWrapper>
  );
};

export default ComponentWrapper;
