import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  max-width: ${props => props.maxWidth};
  margin: 0px auto 120px auto;
  padding-top: 50px;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
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