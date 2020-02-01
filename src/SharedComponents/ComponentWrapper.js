import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: ${props => props.maxWidth};
  margin: 0px auto 120px auto;
  padding-top: 50px;
`;

const ComponentWrapper = ({maxWidth, children, id}) => {

  return (
    <StyledWrapper
      maxWidth={maxWidth}
      id={id}
    >{children}</StyledWrapper>
  );
}

export default ComponentWrapper;