import React from 'react';
import styled from "styled-components";

const H5Component = styled.h5`
  margin-bottom: 5px;
  padding: 0;
  font-weight: bold;
  font-size: 1.313rem;
  color: #2e2e2e;
  text-align: ${props => props.centered ? "center" : "left" };
`;

const StyledH5 = ({children, centered}) => {

  return (
    <H5Component centered={centered}>{children}</H5Component>
  );
}

export default StyledH5;