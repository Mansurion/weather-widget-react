import { useParams, Link } from 'react-router-dom';
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import { useWeather } from '../../hooks/use-weather';
import { ROUTES } from '../../constants/routes';
import './CityDetailPage.css';

const CityDetailPage = () => {
    const { cityId, cityName } = useParams();
    const { weatherData, isLoading, error, refetch } = useWeather(cityId);

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
                className="city-detail-page__refresh-btn" /* Перевели на БЭМ */
                disabled={isLoading}
                onClick={refetch}
            >
                {isLoading ? 'Обновляем...' : 'Обновить данные'}
            </button>
        </div>
    );
};

export default CityDetailPage;
