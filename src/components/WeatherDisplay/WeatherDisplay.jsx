import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, isLoading, error }) => {
    if (isLoading) {
        return <div className="loading">Связь с метео-сервером...</div>;
    }

    if (error) {
        return <div className="loading">Ошибка получения данных</div>;
    }

    if (!weatherData) return null;

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
