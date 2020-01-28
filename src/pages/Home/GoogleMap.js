import React from 'react';
import styled from "styled-components";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { device } from "../../utils/devices";
import mapFrame from "./images/mapFrame.jpg";
import GoogleMapComponentWithMarker from "./GoogleMapComponentWithMarker";
import googlemapsImg from "./images/googlemapsImg.png";

const styles = require('./GoogleMapStyles.json');

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

const GoogleMapComponent = () => {
  
  return (
    <MapWrapper>
      <GoogleMapComponentWithMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDmIu2NlnSVprmtT1AP05Ajae0OhLxpXy0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

      <MapImg src={`${mapFrame}`} />
    </MapWrapper>
  );
}

export default GoogleMapComponent;