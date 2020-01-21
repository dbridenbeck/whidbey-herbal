import React from 'react';
import styled from "styled-components";

const H1Component = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: min(max(24px, 5vw), 48px);
  text-align: ${props => props.centered ? "center" : "left"};
  letter-spacing: 0.01em;
  color: ${props => (props.colorIsGrey ? "#787878" : "#e3be42")};
`;

const StyledH1 = ({centered, colorIsGrey, children}) => {

  return (
    <H1Component
      colorIsGrey={colorIsGrey}
      centered={centered}
    >{children}</H1Component>
  );
}

export default StyledH1;