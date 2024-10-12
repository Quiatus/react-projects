import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'
import styles from './Map.module.css'

export default function Map() {
  const {cities} = useCities()

  const [mapPosition, setMapPosition] = useState([40, 0])
  const [searchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  useEffect(() => {
    if(lat && lng) setMapPosition([lat, lng])
  }, [lat, lng])

  return (
    <div className={styles.mapContainer}>
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