import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: ${props => props.maxWidth};
  margin: 0px auto 120px auto;
  padding: 200px 0 140px 0;
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