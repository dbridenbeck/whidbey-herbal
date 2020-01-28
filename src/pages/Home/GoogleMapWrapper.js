import React, { Component } from 'react';
import styled from "styled-components";
import { device } from "../../utils/devices";
import mapFrame from "./images/mapFrame.jpg";
import GoogleMapComponentWithMarker from "./GoogleMapComponentWithMarker";

const Wrap = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
    position: relative;
    width: 60%;
    height: auto;
  }
`;

const MapContainer = styled.div`
  display: block;
  position: absolute;
  top: 9%;
  left: 10%;
  width: 72%;
  max-width: 390px;
  height: 80%;
  overflow: hidden;
  border-radius: 10px;
  @media ${device.laptop} {
    left: 15%;
    width: 380px;
  }
`;

const MapImg = styled.img`
  display: block;
  width: 100%;
  max-width: 530px;
  margin: 0 auto;
`;

class GoogleMapWrapper extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      infoboxMessage: '',
      isInfoboxVisible: false,
      markerLang: 0,
      markerLat: 0
    }
  }

  handleMarkerClick = (message, lang, lat) => {
    this.setState({
      infoboxMessage: message,
      isInfoboxVisible: !this.state.isInfoboxVisible,
      markerLang: lang + 0.006,
      markerLat: lat - 0.0004
    })
  }

  handleInfoboxClick = () => {
    this.setState({
      isInfoboxVisible: false
    })
  }

  render() {
    return (
      <Wrap>
        <MapContainer>
          <GoogleMapComponentWithMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDmIu2NlnSVprmtT1AP05Ajae0OhLxpXy0"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            isInfoboxVisible={this.state.isInfoboxVisible}
            infoboxMessage={this.state.infoboxMessage}
            handleInfoboxClick={this.handleInfoboxClick}
            handleMarkerClick={this.handleMarkerClick}
            infoboxPosY={this.state.markerLang}
            infoboxPosX={this.state.markerLat}
          />
        </MapContainer>
  
        <MapImg src={`${mapFrame}`} />
      </Wrap>
    );
  }
}

export default GoogleMapWrapper;