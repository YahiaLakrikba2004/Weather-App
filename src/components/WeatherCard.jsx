import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureLow,
  faTint,
  faWind,
  faEye,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import '../Weathercard.css'

const WeatherCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const {
    name,
    weather,
    main,
    wind,
    visibility,
    sys: { country },
  } = data;

  // Funzione per convertire Kelvin in Celsius
  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  // Mappa delle condizioni meteorologiche
  const weatherConditions = {
    Clear: 'Sereno',
    Clouds: 'Nuvoloso',
    Rain: 'Pioggia',
    Drizzle: 'Pioggerella',
    Thunderstorm: 'Temporale',
    Snow: 'Neve',
    Mist: 'Nebbia',
  };

  const conditionInItalian = weatherConditions[weather[0].main] || weather[0].description;

  return (
    <div className="weather-card border mb-3 my-2">
      <div className="card-body">
        <h5 className="card-title ">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {`${name}, ${country}`}
        </h5>
        <div className="capital-item d-flex align-items-center mb-3 text-bold">
          <div className="mr-2">{conditionInItalian}</div>
          <div className="mr-2 ">: {`${kelvinToCelsius(main.temp)} °C`}</div>
          {conditionInItalian && (
  <img
    src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
    alt="Temperatura Icona"
    style={{ width: '30px', height: '30px' }}
  />
)}

        </div>
        <div className="capital-item d-flex align-items-center mb-3">
          <div className="mr-2"><FontAwesomeIcon icon={faTint} /> Umidità: {main.humidity}%</div>
        </div>
        <div className="capital-item d-flex align-items-center mb-3">
          <div className="mr-2"><FontAwesomeIcon icon={faWind} /> Velocità del vento: {wind.speed} m/s</div>
        </div>
        <div className="capital-item d-flex align-items-center mb-3">
          <div className="mr-2 "><FontAwesomeIcon icon={faEye} /> Visibilità: {visibility} metri</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
