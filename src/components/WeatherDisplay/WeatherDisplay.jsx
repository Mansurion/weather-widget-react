import styles from './WeatherDisplay.module.css';

const WEATHER_DISPLAY_CLASSES = {
    LOADING: 'loading',
    WEATHER_INFO: 'weather-info',
    CURRENT_TEMP_BLOCK: 'current-temp-block',
    CURRENT_LABEL: 'current-label',
    CURRENT_VALUE: 'current-value',
    FORECAST_ROW: 'forecast-row',
    DAY_NAME: 'day-name',
    DAY_TEMP: 'day-temp',
};

const WEATHER_DISPLAY_LABELS = {
    ERROR: 'Ошибка получения данных',
    LOADING_SERVER: 'Связь с метео-сервером...',
    NOW: 'Сейчас',
};

export const WeatherDisplay = ({ weatherData, isLoading, error }) => {
    const isPrimaryLoading = isLoading && !weatherData;

    if (error) {
        return <div className={styles[WEATHER_DISPLAY_CLASSES.LOADING]}>{WEATHER_DISPLAY_LABELS.ERROR}</div>;
    }

    if (isPrimaryLoading) {
        return <div className={styles[WEATHER_DISPLAY_CLASSES.LOADING]}>{WEATHER_DISPLAY_LABELS.LOADING_SERVER}</div>;
    }

    if (!weatherData) return null;

    return (
        <div className={styles[WEATHER_DISPLAY_CLASSES.WEATHER_INFO]}>
            <div className={styles[WEATHER_DISPLAY_CLASSES.CURRENT_TEMP_BLOCK]}>
                <span className={styles[WEATHER_DISPLAY_CLASSES.CURRENT_LABEL]}>{WEATHER_DISPLAY_LABELS.NOW}</span>
                <span className={styles[WEATHER_DISPLAY_CLASSES.CURRENT_VALUE]}>{weatherData.currentTemperatureText}</span>
            </div>
            {weatherData.forecast.map(({ id, dayLabel, minTemperatureText, maxTemperatureText }) => (
                <div className={styles[WEATHER_DISPLAY_CLASSES.FORECAST_ROW]} key={id}>
                    <span className={styles[WEATHER_DISPLAY_CLASSES.DAY_NAME]}>{dayLabel}</span>
                    <span className={styles[WEATHER_DISPLAY_CLASSES.DAY_TEMP]}>
                        {minTemperatureText} / {maxTemperatureText}
                    </span>
                </div>
            ))}
        </div>
    );
};
