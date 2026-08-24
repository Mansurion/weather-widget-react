import { useParams, Link } from 'react-router-dom';
import { WeatherDisplay } from '../../components/WeatherDisplay/WeatherDisplay';
import { useWeather } from '../../hooks/use-weather';
import { ROUTES } from '../../constants/routes';
import styles from './CityDetailPage.module.css';

const CITY_DETAIL_LABELS = {
    BACK_BUTTON: '← К поиску',
    REFRESH_LOADING: 'Обновляем...',
    REFRESH_READY: 'Обновить данные',
};

export const CityDetailPage = () => {
    const { cityId } = useParams();
    const { weatherData, isLoading, error, refetch } = useWeather(cityId);

    return (
        <div className={styles['city-detail-page']}>
            <Link to={ROUTES.HOME} className={styles['back-btn']}>
                {CITY_DETAIL_LABELS.BACK_BUTTON}
            </Link>

            <WeatherDisplay weatherData={weatherData} isLoading={isLoading} error={error} />

            <button
                id="refresh-data-btn"
                className={styles['city-detail-page__refresh-btn']}
                disabled={isLoading}
                onClick={refetch}
            >
                {isLoading ? CITY_DETAIL_LABELS.REFRESH_LOADING : CITY_DETAIL_LABELS.REFRESH_READY}
            </button>
        </div>
    );
};
