import { useState, useEffect, } from 'react';
import CitySelector from './components/CitySelector/CitySelector';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import './App.css';
import { CITIES } from './data';
import { useFetch } from './hooks/use-fetch';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCityCoordinates') || 'latitude=55.75&longitude=37.62';
  });

  const queryParams = new URLSearchParams({
    current: 'temperature_2m',
    daily: ['temperature_2m_max', 'temperature_2m_min'].join(','),
    timezone: 'auto'
  }).toString();

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?${selectedCity}&${queryParams}`;
  const { data: weatherData, isLoading, error, refetch } = useFetch(weatherUrl);

  useEffect(() => {
    localStorage.setItem('selectedCityCoordinates', selectedCity);
  }, [selectedCity]);

  return (
    <main className="widget">
      <CitySelector cities={CITIES}
        value={selectedCity}
        onChange={setSelectedCity}
      />
      <WeatherDisplay
        weatherData={weatherData}
        isLoading={isLoading}
        error={error}
      />
      <button
        id="refresh-data-btn"
        disabled={isLoading}
        onClick={refetch}
      >
        {isLoading ? 'Секунду...' : 'Обновить данные'}
      </button>
    </main>
  );
};

export default App;