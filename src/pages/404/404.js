import React from "react"
import Loading from './images/loading.png';
import styled from "styled-components";

import StyledH1 from "../../SharedComponents/StyledH1";

const StyledP = styled.p`
  text-align: center;
  color: #787878;
`;

const StyledImg = styled.img`
  display: block;
  margin: 0 auto;
`;

const NotFoundPage = () => (
      <>
        <StyledH1>Uh oh!</StyledH1>
        <StyledP>We can't find that page.</StyledP>
        <StyledImg src={Loading} />
      </>
)

export default NotFoundPage