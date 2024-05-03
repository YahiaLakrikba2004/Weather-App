import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  let timerId = null;

  const fetchCitySuggestions = async (input) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&cnt=5&appid=034098922d7a5c9dd10bf1e73fbdd05d`
      );
  
      if (!response.ok) {
        console.error('Errore nel recupero dei suggerimenti sulla città');
        return;
      }
  
      const data = await response.json();
      const suggestions = data.list.map((item) => item.name);
  
      // Filtra i suggerimenti per rimuovere eventuali duplicati
      const uniqueSuggestions = suggestions.filter((suggestion, index) => suggestions.indexOf(suggestion) === index);
  
      setSuggestions(uniqueSuggestions);
    } catch (error) {
      console.error('Errore nel recupero dei suggerimenti sulla città:', error);
    }
  };

  const handleSearch = async () => {
    if (!city) {
      setErrorMessage('Inserisci una città');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=034098922d7a5c9dd10bf1e73fbdd05d`
      );

      if (!response.ok) {
        setErrorMessage('Città non trovata. Inserisci una città valida.');
        return;
      }

      if (typeof onSearch === 'function') {
        onSearch(city);
      }

      navigate(`/weather/${city}`);
    } catch (error) {
      console.error('Errore nel recupero dei dati sulla città:', error);
      setErrorMessage('Errore nel recupero dei dati sulla città. Riprova più tardi.');
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    
    clearTimeout(timerId);

    
    timerId = setTimeout(() => {
      if (inputValue.length >= 3) {
        fetchCitySuggestions(inputValue);
      } else {
        setSuggestions([]);
        setErrorMessage('');
      }
    }, 300); // Ritardo di 300 millisecondi
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    setErrorMessage('');
    setSuggestions([]); 
    navigate(`/weather/${suggestedCity}`);
  };

  return (
    <div className="search-bar">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Inserisci il nome della città..."
          value={city}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Cerca
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {suggestions.length > 0 && (
        <div className="suggestions">
          <p className="suggestions-header">Suggerimenti:</p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
