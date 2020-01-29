import React from 'react';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { stores } from './StoreLocator';

const styles = require('./GoogleMapStyles.json');

const GoogleMapComponentWithMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{
        lat: 47.041318, // latitude for the center of the map
        lng: -122.444056 // longitude for the center of the map
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
      {stores.map(store => (
        <Marker
          key={store.storeName}
          position={{
            lat: store.lat,
            lng: store.lng
          }}
          // convert onClick to a redux action that stores name and storeName to isInfoboxVisible
          // then I need to change props.isInfoboxVisible to compare store.storeName with storeName stored in redux
          // if true, switch isInfoboxVisible to true. or something...
          onClick={(message, lang, lat) =>
            props.handleMarkerClick(`${store.storeName}`, store.lat, store.lng)
          }
        >
        
          {props.isInfoboxVisible && (
            <InfoWindow
              position={{
                lat: props.infoboxPosY,
                lng: props.infoboxPosX
              }}
            >
              <div>
                <h4>{props.infoboxMessage}</h4>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}

    </GoogleMap>
  ))
);


export default GoogleMapComponentWithMarker;