import React from 'react';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { stores } from './StoreLocator';

const styles = require('./GoogleMapStyles.json');

const GoogleMapComponentWithMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{
        lat: 47.041318,
        lng: -122.444056
      }}
      defaultOptions={{
        disableDefaultUI: true,
        zoomControl: true,
        draggable: true,
        keyboardShortcuts: false,
        scaleControl: true,
        scrollwheel: true,
        styles: styles
      }}
    >
      {stores.map(store => (
        <Marker
          key={store.storeName}
          position={{
            lat: store.lat,
            lng: store.lng
          }}
          onClick={storeName => props.handleMarkerClick(`${store.storeName}`)}
        >
          {store.storeName === props.selectedStoreName && (
            <InfoWindow>
              <>
                <h4>{store.storeName}</h4>
                <a
                  href={store.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See in Google Maps
                </a>
              </>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ))
);

export default GoogleMapComponentWithMarker;