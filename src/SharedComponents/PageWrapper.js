import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  margin: 0px auto 0px auto;
  padding: 0px 20px 0px 20px;
`;

const PageWrapper = ({maxWidth, children, id}) => {

  return (
    <StyledWrapper
      maxWidth={maxWidth}
      id={id}
      className="page-wrapper"
    >{children}</StyledWrapper>
  );
}

export default PageWrapper;