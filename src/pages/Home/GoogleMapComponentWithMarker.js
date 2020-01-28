import React from 'react';
import styled from "styled-components";
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const styles = require('./GoogleMapStyles.json');

const GoogleMapComponentWithMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{
        lat: 40.7484445, // latitude for the center of the map
        lng: -73.9878584 // longitude for the center of the map
      }}
      defaultOptions={{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: true, // allow scroll wheel
        styles: styles // change default map styles
      }}
    >
      <Marker
        position={{
          lat: 40.7484445, // latitude to position the marker
          lng: -73.9878584 // longitude to position the marker
        }}
        onClick={(message, lang, lat) =>
          props.handleMarkerClick(
            "Custom Google Map Marker with infobox!",
            40.7484445,
            -73.9878584
          )
        }
      />

      {props.isInfoboxVisible && (
        <InfoWindow
          position={{
            lat: props.infoboxPosY,
            lng: props.infoboxPosX
          }}
          onCloseClick={() => props.handleInfoboxClick()}
        >
          <div>
            <h4>{props.infoboxMessage}</h4>
          </div>
        </InfoWindow>
      )}
      </GoogleMap>
  ))
);


export default GoogleMapComponentWithMarker;