import React from 'react';
import '../ForeCast.css'; 

const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

const Forecast = ({ data }) => {
  return (
    <div className="forecast-container">
      <h3>Previsioni settimanali</h3>
      
      {data && data.map((item, index) => (
        <div key={index} className="forecast-item">
          <p>{new Date(item.dt * 1000).toLocaleDateString('ITA', { weekday: 'long' })}</p>
          <p>Temperatura: {kelvinToCelsius(item.main.temp)}°C</p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
