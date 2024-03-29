import styled from 'styled-components';
import { device } from '../../utils/devices';
import Image from 'next/image';
import bottlesAndHoney from '../../../public/bottles-and-honey.jpg';

const BumpOutContainer = styled.div`
  position: relative;
  width: 51%;
  margin-top: 10%;
  align-self: flex-end;
  svg {
    display: inline-block;
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
  }
  circle {
    fill: #e6c564;
  }
  .circle {
    display: block;
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 63.7%;
    height: 51%;
  }
  @media ${device.tablet} {
    margin-top: -22%;
  }
  @media (min-width: 12801px) {
    margin-top: -10%;
  }
`;

const BottlesHoneyPhoto = styled.div`
  img {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    z-index: 3;
  }
`;

const PhotoBumpOut = () => {
  return (
    <BumpOutContainer>
      <BottlesHoneyPhoto>
        <Image
          src={bottlesAndHoney}
          alt="Bottles of essential oil, honeycomb, and lavender stalk laying on a table"
          sizes="50vw"
        />
      </BottlesHoneyPhoto>
      <div className="circle">
        <svg height="100%" width="100%">
          <circle
            cx="50%"
            cy="50%"
            r="50%"
            stroke="black"
            strokeWidth="0"
            fill="red"
          />
        </svg>
      </div>
    </BumpOutContainer>
  );
};

export default PhotoBumpOut;
