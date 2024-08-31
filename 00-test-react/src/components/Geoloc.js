import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

export default function Geoloc() {
  const {isLoading, position: {lat, lng}, error, getPosition} = useGeolocation()
  const [countClicks, setCountClicks] = useState(0);

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition()
  }

  return (
    <div className="comp geo">
      <button className="btnB" onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      <p>
        Your GPS position:{" "}
        {isLoading && <span>Loading position...</span>}
        {error && <span>{error}</span>}
        {!isLoading && !error && lat && lng && (
          <a target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}>{lat}, {lng}</a>
        )}
      </p>

      <p>You requested position {countClicks} times</p>
    </div>
  );
}