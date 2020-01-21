import React from "react";
import styled from 'styled-components';
import loading from "../images/loading.png";

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  .loaded {
    opacity: 0;
  }
`;

const StyledH1 = styled.h1`
  color: #787878;
`;

const SpinnerImage = styled.img`
  display: block;
  width: 5%;
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <StyledH1>Loading!</StyledH1>
      <SpinnerImage src={`${loading}`} />
    </SpinnerWrapper>
  );
};

export default Spinner;