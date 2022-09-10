import styled from 'styled-components';
import { device } from '../utils/devices';

const H1Component = styled.h1`
  margin: 0 0 40px 0;
  font-weight: bold;
  font-size: 3rem;
  line-height: 1.138em;
  color: #000000;
  @media ${device.tablet} {
    font-size: 4rem;
  }
  @media ${device.laptop} {
    font-size: 5rem;
  }
`;

const StyledH1 = ({ children }) => {
  return <H1Component>{children}</H1Component>;
};

export default StyledH1;
