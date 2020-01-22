import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: ${props => props.maxWidth};
  margin: 0px auto 120px auto;
  padding: 50px 20px 0 20px;
`;

const Wrapper = ({maxWidth, children, id}) => {

  return (
    <StyledWrapper
      maxWidth={maxWidth}
      id={id}
    >{children}</StyledWrapper>
  );
}

export default Wrapper;