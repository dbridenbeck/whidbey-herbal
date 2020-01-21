import React from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import mapFrame from "./images/mapFrame.jpg";
import googlemapsImg from "./images/googlemapsImg.png";

const MapWrapper = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
    position: relative;
    width: 60%;
    height: auto;
  }
`;

const MapImg = styled.img`
  display: block;
  width: 100%;
  max-width: 530px;
  margin: 0 auto;
`;

const MapFrame = styled.img`
  position: absolute;
  top: 10.5%;
  left: 15.5%;
  width: 60%;
  height: auto;
  border-radius: 5%;
`;

const GoogleMap = () => {
  
  return (
    <MapWrapper>
      <MapImg 
        src={`${mapFrame}`} 
      />
        <MapFrame 
          src={`${googlemapsImg}`} 
          width="375"
          height="338"
          alt="Blue watercolored lines bordering a Google Map window."        
        />
    </MapWrapper>
  );
}

export default GoogleMap;