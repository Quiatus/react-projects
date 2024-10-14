import { useEffect, useState } from "react";
import { useUrlPosition } from '../hooks/useUrlPosition'
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from './Message'
import Spinner from './Spinner'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition()
  const [isLoadingGeo, setIsLoadingGeo] = useState(false)
  const [countryCode, setCountryCode] = useState("")
  const [geocodingError, setGeocodinError] = useState("")

  // const flagemojiToPNG = (country) => <img src={`https://flagcdn.com/24x18/${country}.png`} alt='flag' />

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeo(true)
        setGeocodinError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) throw new Error('Invalid location')

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setCountryCode(data.countryCode)
  
      } catch (err) {
        setGeocodinError(err.message)
      } finally {
        setIsLoadingGeo(false)
      }
    }

    fetchCityData()
  }, [lat, lng])

  if (isLoadingGeo) return <Spinner />

  if (geocodingError) return <Message message={geocodingError}/>

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}><img src={`https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`} alt={`${countryCode}`} /></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
