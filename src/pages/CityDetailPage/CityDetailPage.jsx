import { useParams, Link } from 'react-router-dom';
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import { useWeather } from '../../hooks/use-weather';
import { ROUTES } from '../../constants/routes';
import './CityDetailPage.css';

const CityDetailPage = () => {
    const { cityName, lat, lon } = useParams();
    const { weatherData, isLoading, error, refetch } = useWeather(lat, lon);

    // Декодируем имя города из URL-безопасного формата (например, Нью-Йорк)
    const decodedCityName = cityName ? decodeURIComponent(cityName) : '';

    return (
        <div className="city-detail-page">
            {/* Кнопка возврата на главную страницу */}
            <Link to={ROUTES.HOME} className="back-btn">
                ← К поиску
            </Link>

            {/* Выводим название города для улучшения UX */}
            {decodedCityName && <h2 className="current-label">{decodedCityName}</h2>}

            <WeatherDisplay weatherData={weatherData} isLoading={isLoading} error={error} />

            <button
                id="refresh-data-btn"
                disabled={isLoading}
                onClick={refetch}
            >
                {isLoading ? 'Секунду...' : 'Обновить данные'}
            </button>
        </div>
    );
};

export default CityDetailPage;
