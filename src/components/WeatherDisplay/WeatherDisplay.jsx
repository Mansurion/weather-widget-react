import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, isLoading, error }) => {
    // Показываем ошибку, если она произошла
    if (error) {
        return <div className="loading">Ошибка получения данных</div>;
    }

    // Если это ПЕРВИЧНАЯ загрузка (данных еще нет и идет запрос) — показываем полноэкранный лоадер
    if (isLoading && !weatherData) {
        return <div className="loading">Связь с метео-сервером...</div>;
    }

    // Если данных нет вообще (и загрузка не идет) — ничего не рендерим
    if (!weatherData) return null;

    // В остальных случаях (даже если идет фоновое обновление isLoading === true) — контент остается на месте!
    return (
        <div className="weather-info">
            <div className="current-temp-block">
                <span className="current-label">Сейчас</span>
                <span className="current-value">{weatherData.currentTemperatureText}</span>
            </div>

            {weatherData.forecast.map(({ id, dayLabel, minTemperatureText, maxTemperatureText }) => (
                <div className="forecast-row" key={id}>
                    <span className="day-name">{dayLabel}</span>
                    <span className="day-temp">
                        {minTemperatureText} / {maxTemperatureText}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default WeatherDisplay;
