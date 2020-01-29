import React, { Component } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as CartActionCreators from "../../state/actions/cart";
import { device } from "../../utils/devices";
import mapFrame from "./images/mapFrame.jpg";
import GoogleMapComponentWithMarker from "./GoogleMapComponentWithMarker";

const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_KEY}`

const Wrap = styled.div`
  display: none;
  width: 60%;
  max-width: 530px;
  position: relative;
  height: auto;
  @media ${device.tablet} {
    display: block;
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
    }
  }

  handleMarkerClick = (message, lang, lat) => {
    this.setState({
      infoboxMessage: message,
      isInfoboxVisible: !this.state.isInfoboxVisible,
    })
  }

  render() {
    const { setGoogleMapInfoWindow, selectedStoreName } = this.props;
    return (
      <Wrap>
        <MapContainer>
          <GoogleMapComponentWithMarker
            googleMapURL={mapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            isInfoboxVisible={this.state.isInfoboxVisible}
            infoboxMessage={this.state.infoboxMessage}
            handleMarkerClick={setGoogleMapInfoWindow}
            selectedStoreName={selectedStoreName}
          />
        </MapContainer>

        <MapImg src={`${mapFrame}`} />
      </Wrap>
    );
  }
}

GoogleMapWrapper.propTypes = {
  selectedStoreName: PropTypes.string,
  googleMapInfoWindow: PropTypes.func
};

const mapStatetoProps = ({ googleMapInfoWindow: { selectedStoreName } }) => ({
  selectedStoreName
});

const mapDispatchtoProps = dispatch => ({
  setGoogleMapInfoWindow: selectedStoreName =>
    dispatch(CartActionCreators.setGoogleMapInfoWindow(selectedStoreName))
});

export default connect(mapStatetoProps, mapDispatchtoProps)(GoogleMapWrapper);