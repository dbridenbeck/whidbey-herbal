import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 0 20px;
`;

const ComponentWrapper = ({children}) => {

  return (
    <StyledWrapper
    >{children}</StyledWrapper>
  );
}

export default ComponentWrapper;