import { Link } from 'react-router-dom'

import styles from './CityItem.module.css'
import { useCities } from '../context/CitiesContext'

export default function CityItem({ city }) {
  const {currentCity} = useCities()
  const { cityName, countryCode, date, id, position } = city

  const flagemojiToPNG = (country) => <img src={`https://flagcdn.com/24x18/${country}.png`} alt='flag' />

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(date));

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{flagemojiToPNG(countryCode)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}
