import React from "react"
import Loading from './images/loading.png';
import styled from "styled-components";

import PageWrapper from "../../SharedComponents/PageWrapper";
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
    <PageWrapper>
        <StyledH1 centered={true} colorIsGrey={false}>Uh oh!</StyledH1>
        <StyledP>We can't find that page.</StyledP>
        <StyledImg src={Loading} />
    </PageWrapper>
)

export default NotFoundPage