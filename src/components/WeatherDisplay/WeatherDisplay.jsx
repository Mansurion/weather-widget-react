import './WeatherDisplay.css';

const DAYS_OF_WEEK = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];


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
                <span className="current-value">
                    {weatherData.current.temperature_2m > 0 ? '+' : ''}
                    {Math.round(weatherData.current.temperature_2m)}°
                </span>
            </div>
            {weatherData.daily.time.slice(0, 7).map((time, index) => {
                const dateObj = new Date(time);
                const dayName = DAYS_OF_WEEK[dateObj.getDay()];

                const minTemp = Math.round(weatherData.daily.temperature_2m_min[index]);
                const maxTemp = Math.round(weatherData.daily.temperature_2m_max[index]);

                return (
                    <div className="forecast-row" key={time}>
                        <span className="day-name">{index === 0 ? 'Сегодня' : dayName}</span>
                        <span className="day-temp">
                            {minTemp > 0 ? '+' : ''}{minTemp}° / {maxTemp > 0 ? '+' : ''}{maxTemp}°
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherDisplay;
