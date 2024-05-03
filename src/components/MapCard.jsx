import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapCard = () => {
  const { city } = useParams();
  const mapRef = useRef(null);

  const fetchCoordinates = async () => {
    try {
      if (!city || !mapRef.current) return;
  
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=63bbf6c54d2a4d079729180975c34a43`
      );
  
      if (!response.ok) {
        throw new Error(`Errore nella ricerca del luogo: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data && data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return [parseFloat(lat), parseFloat(lng)];
      } else {
        throw new Error('Nessun risultato trovato per la ricerca');
      }
    } catch (error) {
      console.error(`Errore nella ricerca del luogo: ${error.message}`);
      return null;
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map-container').setView([0, 0], 2);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    }
  }, []);

  useEffect(() => {
    fetchCoordinates().then(coordinates => {
      if (coordinates) {
        const [lat, lng] = coordinates;
        mapRef.current.setView([lat, lng], 12);
      }
    });
  }, [city]);
  

  return <div id="map-container" style={{ width: '100%', height: '400px', marginTop: '75px' }}></div>;
};

export default MapCard;
