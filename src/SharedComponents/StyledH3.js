import { device } from '../utils/devices';
import styled from 'styled-components';

const H3Component = styled.h3`
  margin: 0 0 5px 0;
  font-style: normal;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.138em;
  color: #2e2e2e;
  @media ${device.tablet} {
    font-size: 1.5rem;
  }
  @media ${device.tablet} {
    font-size: 1.75rem;
  }
`;

const StyledH3 = ({ children }) => {
  return <H3Component>{children}</H3Component>;
};

export default StyledH3;
