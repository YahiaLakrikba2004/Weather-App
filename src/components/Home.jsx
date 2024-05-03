import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import umbrellaImage from '../assets/Ombrello.jpg';
import '../Home.css';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=034098922d7a5c9dd10bf1e73fbdd05d`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(`Errore durante la ricerca della città: ${city}`, error);
    }
    setLoading(false);
  };

  return (
    <main className="container-fluid py-5 bg-light">
      <section className="row justify-content-center align-items-center">
        <div className="col-md-6 text-center">
          <img src={umbrellaImage} alt="Umbrella" className="umbrella-image mb-4" />
          <h1 className="display-4 mb-3"><strong>Mi devo portare l'ombrello?</strong></h1>
          <p className="lead mb-4">Preparati per la giornata con le nostre previsioni accurate</p>
          <SearchBar onSearch={handleSearch} />
          {loading ? <p>Caricamento...</p> : weatherData && <p>Temperatura: {weatherData.main.temp}°C</p>}
        </div>
      </section>
      <section className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">Perché scegliere noi?</h2>
          <div className="row justify-content-center">
            {[
              {
                title: 'Aggiornamenti in tempo reale',
                text: 'Le nostre previsioni vengono costantemente aggiornate per garantirti sempre le informazioni più recenti.'
              },
              {
                title: 'Interfaccia intuitiva',
                text: 'La nostra barra di ricerca ti consente di trovare facilmente il meteo della tua città.'
              },
              {
                title: 'Informazioni dettagliate',
                text: 'Oltre alla temperatura, forniamo anche dati sull\'umidità, la velocità del vento e altro ancora.'
              }
            ].map((card, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card border-0 shadow rounded">
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
