import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'
import styles from './Map.module.css'
import { useGeolocation } from '../hooks/useGeoloc'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Button from "./Button";

export default function Map() {
  const {cities} = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const {isLoading: isLoadingPos, position: geolocPos, getPosition} = useGeolocation()
  const [lat, lng] = useUrlPosition()


  useEffect(() => {
    if(lat && lng) setMapPosition([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if (geolocPos) setMapPosition([geolocPos.lat, geolocPos.lng])
  }, [geolocPos])

  return (
    <div className={styles.mapContainer}>
      <>
        <Button type="position" onClick={getPosition}>{isLoadingPos ? "Loading..." : "Use your position"}</Button>
        <MapContainer className={styles.map} center={mapPosition} zoom={8} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          { cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              {city.cityName}
            </Popup>
          </Marker>)
          }
          <ChangeCenter position={mapPosition}/>
          <DetectClick/>
        </MapContainer>
      </>   
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}