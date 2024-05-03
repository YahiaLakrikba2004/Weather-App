import React, { useEffect, useState } from 'react';
import '../CapitalCard.css'

const CapitalCard = () => {
  const [capitalData, setCapitalData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCapitalData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const capitalCities = ['Roma', 'Parigi', 'Berlino', 'Londra', 'Tokyo', 'New York'];

        const fetchDataPromises = capitalCities.map(async (capital) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=034098922d7a5c9dd10bf1e73fbdd05d`
          );

          if (!response.ok) {
            throw new Error(`Errore nel recupero dei dati per ${capital}`);
          }

          const data = await response.json();

          const temperature = data.main.temp - 273.15; // Conversione da Kelvin a Celsius
          const icon = data.weather.length > 0 ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` : null;

          return {
            capital,
            temperature: temperature.toFixed(1),
            icon,
          };
        });

        const capitalData = await Promise.all(fetchDataPromises);
        setCapitalData(capitalData);
      } catch (error) {
        console.error('Errore nel recupero dei dati delle capitali:', error);
        setError(error.message); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchCapitalData();
  }, []);

  return (
    <div className='capital-card h-100'>
      <h3 className="text-center">Capitali del Mondo</h3>
      {isLoading && <p className="loading">Caricamento in corso...</p>}
      {error && <p className="error">Errore: {error}</p>}
      {capitalData && (
        <div className="capital-list">
          {capitalData.map((city) => (
            <div key={city.capital} className="capital-item d-flex align-items-center mb-3">
              <div className="mr-2">{city.capital}</div>
              <div className="mr-2">{`${city.temperature} °C`}</div>
              {city.icon && <img src={city.icon} alt="Temperature Icon" style={{ width: '30px', height: '30px' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CapitalCard;
