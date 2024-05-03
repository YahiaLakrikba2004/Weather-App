import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import '../Weather.css';
import MapCard from '../components/MapCard'; 
import CapitalCard from '../components/CapitalCard'; 
import Forecast from '../components/ForeCast';

import cloudyImage from '../assets/cloudy.jpg';
import sunnyImage from '../assets/sunny.jpg';
import rainyImage from '../assets/rainy.jpg';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const { city } = useParams();
  const [uniqueForecast, setUniqueForecast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!city) {
          throw new Error('City not provided');
        }

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=034098922d7a5c9dd10bf1e73fbdd05d`
        );

        if (!weatherResponse.ok) {
          throw new Error('Error fetching weather data');
        }

        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=034098922d7a5c9dd10bf1e73fbdd05d`
        );

        if (!forecastResponse.ok) {
          throw new Error('Error fetching weekly forecast data');
        }

        const forecastData = await forecastResponse.json();
        setWeeklyForecast(forecastData);
      } catch (error) {
        console.error('Error fetching data:', error);
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      const weatherCondition = weatherData.weather[0].main;
      switch (weatherCondition) {
        case 'Clouds':
          setBackgroundImage(cloudyImage);
          break;
        case 'Clear':
          setBackgroundImage(sunnyImage);
          break;
        case 'Rain':
          setBackgroundImage(rainyImage);
          break;
        default:
          setBackgroundImage('');
      }
    }
  }, [weatherData]);

  useEffect(() => {
    if (weeklyForecast) {
      const uniqueDates = new Set();
      const filteredForecast = weeklyForecast.list.filter(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-GB');
        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);
          return true;
        }
        return false;
      });
      setUniqueForecast(filteredForecast);
    }
  }, [weeklyForecast]);
  return (
    <div className="container-fluid" style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%'
    }}>
      <div className="row">
        <div className="col-md-12 text-center mb-3">
          <SearchBar />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 my-5">
          {loading && <p>Caricamento...</p>}
          {!loading && weatherData && (
            <div>
              <WeatherCard data={weatherData} />
            </div>
          )}
        </div>
        <div className="col-md-4">
          {weatherData && (
            <div>
              <MapCard data={weatherData} />
            </div>
          )}
        </div>
        <div className="col-md-4">
          {weatherData && (
            <div className="border p-3 bg-light">
              <CapitalCard data={weatherData} />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {!loading && uniqueForecast && (
            <Forecast data={uniqueForecast} />
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 text-center">
          <Link to="/" className="btn btn-light btn-lg shadow-lg p-3 mb-5 rounded">
            <i className="fas fa-home"></i> Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
  
  
  
  

};


export default Weather;
