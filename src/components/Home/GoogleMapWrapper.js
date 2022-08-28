import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as CartActionCreators from '../../state/actions/cart'
import { device } from '../../utils/devices'
import mapFrame from '../../../public/map-frame.png'
import mapFrameWebp from '../../../public/map-frame.webp'
import GoogleMapComponentWithMarker from './GoogleMapComponentWithMarker'

const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_KEY}`

const Wrap = styled.div`
  display: none;
  width: 80%;
  max-width: 670px;
  position: relative;
  height: 80%;
  @media ${device.tablet} {
    display: block;
  }
`

const MapContainer = styled.div`
  display: block;
  position: absolute;
  top: 9%;
  left: 10%;
  width: 73%;
  height: 80%;
  max-width: 480px;
  overflow: hidden;
  border-radius: 10px;
`

const MapImg = styled.picture`
  img {
    display: block;
    width: 100%;
    max-width: 670px;
    margin: 0 auto;
  }
`

const GoogleMapWrapper = ({ setGoogleMapInfoWindow, selectedStoreName }) => {
  const createGoogleMapComponentWithMarker = () => {
    return (
      <GoogleMapComponentWithMarker
        googleMapURL={mapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        handleMarkerClick={setGoogleMapInfoWindow}
        selectedStoreName={selectedStoreName}
      />
    )
  }

  return (
    <Wrap>
      <MapContainer>{createGoogleMapComponentWithMarker()}</MapContainer>
      <MapImg>
        <source srcSet={`${mapFrameWebp}`} type="image/webp" />
        <source srcSet={`${mapFrame}`} type="image/png" />
        <img
          src={`${mapFrame}`}
          alt="a watercolor of fir bows making a border around a google map"
        />
      </MapImg>
    </Wrap>
  )
}

GoogleMapWrapper.propTypes = {
  selectedStoreName: PropTypes.string,
  googleMapInfoWindow: PropTypes.func,
}

const mapStatetoProps = ({ googleMapInfoWindow: { selectedStoreName } }) => ({
  selectedStoreName,
})

const mapDispatchtoProps = (dispatch) => ({
  setGoogleMapInfoWindow: (selectedStoreName) =>
    dispatch(CartActionCreators.setGoogleMapInfoWindow(selectedStoreName)),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(GoogleMapWrapper)
