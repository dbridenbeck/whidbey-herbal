import React from 'react';
import styled from 'styled-components';
import { device } from '../utils/devices';

const H2Component = styled.h2`
  margin: 0 0 96px 0;
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.138em;
  text-align: center;
  color: #000000;
  @media ${device.tablet} {
    font-size: 3rem;
  }
  @media ${device.laptop} {
    font-size: 4rem;
  }
`;

const StyledH2 = ({ children }) => {
  return <H2Component>{children}</H2Component>;
};

export default StyledH2;
