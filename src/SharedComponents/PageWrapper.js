import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px auto 0px auto;
  padding: 50px 20px 0px 20px;
`;

const PageWrapper = ({maxWidth, children, id, positionRelative}) => {

  return (
    <StyledWrapper
      maxWidth={maxWidth}
      id={id}
      positionRelative={positionRelative}
    >{children}</StyledWrapper>
  );
}

export default PageWrapper;