import CitySelector from './components/CitySelector/CitySelector';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import './App.css';
import { CITIES } from './data';
import { useWeather } from './hooks/use-weather';

const App = () => {
  const { selectedCityId, setSelectedCityId, weatherData, isLoading, error, refetch } = useWeather();

  return (
    <main className="widget">
      <CitySelector
        cities={CITIES}
        value={selectedCityId}
        onChange={setSelectedCityId}
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