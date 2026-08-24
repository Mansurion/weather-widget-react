import { useParams, Link } from 'react-router-dom';
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import { useWeather } from '../../hooks/use-weather';
import { ROUTES } from '../../constants/routes';
import './CityDetailPage.css';

export const CityDetailPage = () => {
    const { cityId } = useParams();
    const { weatherData, isLoading, error, refetch } = useWeather(cityId);

    return (
        <div className="city-detail-page">
            {/* Кнопка возврата на главную страницу */}
            <Link to={ROUTES.HOME} className="back-btn">
                ← К поиску
            </Link>

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