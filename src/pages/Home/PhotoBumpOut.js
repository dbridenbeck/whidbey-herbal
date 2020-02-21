import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import bottlesAndHoney from "./images/bottles-and-honey.jpg";

const BumpOutContainer = styled.div`
  position: relative;
  width: 51%;
  margin-top: 10%;
  @media ${device.tablet} {
    margin-top: -22%;
  }
  align-self: flex-end;
  img {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    z-index: 3;
  }
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
`;


const PhotoBumpOut = () => {

  return (
    <BumpOutContainer>
      <img src={bottlesAndHoney} />
      <div className="circle">
        <svg height="100%" width="100%">
          <circle
            cx="50%"
            cy="50%"
            r="50%"
            stroke="black"
            stroke-width="0"
            fill="red"
          />
        </svg>
      </div>
    </BumpOutContainer>
  );
}

export default PhotoBumpOut;