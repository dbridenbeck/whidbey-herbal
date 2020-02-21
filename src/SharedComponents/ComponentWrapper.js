import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: ${props => props.maxWidth};
  /* conditional for process allows the yellow svg circle to position correctly
  and responsively overlap the storeLocator component */
  margin: ${props =>
    props.id === "process" ? "0px auto -3% auto" : "0px auto 0px auto"};
  padding: ${props =>
    props.id === "process" ? "200px 0 12% 0" : "200px 0px 0px 0px"};
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
`;

const ComponentWrapper = ({maxWidth, children, id, backgroundColor}) => {

  return (
    <StyledWrapper
      maxWidth={maxWidth}
      id={id}
      backgroundColor={backgroundColor}
    >{children}</StyledWrapper>
  );
}

export default ComponentWrapper;