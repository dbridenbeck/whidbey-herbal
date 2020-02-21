import React from 'react';
import styled from "styled-components";
import { device } from "../utils/devices";

const H5Component = styled.h5`
  margin-bottom: 5px;
  padding: 0;
  font-size: .925rem;
  font-weight: bold;
  color: #2e2e2e;
  text-align: center;
  @media ${device.tablet} {
  font-size: 1.125rem;
    
  }
  @media ${device.laptop} {
  font-size: 1.313rem;

  }
`;

const StyledH5 = ({children}) => {

  return (
    <H5Component>{children}</H5Component>
  );
}

export default StyledH5;