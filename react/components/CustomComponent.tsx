/* import React from 'react' */
import React, { useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'

const CustomComponent = () => {
  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})
  const [locationData, setLocationData] = useState({city: "", countryName: ""})

  useEffect(() => {
    if (coords) {
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => setLocationData(data))
    }
  }, [coords])

  return (
    <div>
      {isGeolocationAvailable
        ? `Geolocation is available`
        : `Geolocation is not available`}
      <br />
      {isGeolocationEnabled
        ? `Geolocation is enabled`
        : `Geolocation is not enabled`}
      <br />
      {coords
        ? `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`
        : `Waiting for location...`}
      <br />
      {locationData
        ? `City: ${locationData?.city}, Country: ${locationData?.countryName}`
        : null}
    </div>
  )
}

export default CustomComponent
