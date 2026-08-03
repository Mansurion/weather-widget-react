const DAYS_OF_WEEK = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const prepareWeatherData = (rawResponse) => {
    if (!rawResponse) return null;

    const currentTemp = Math.round(rawResponse.current.temperature_2m);
    const { time, temperature_2m_min, temperature_2m_max } = rawResponse.daily;

    const forecast = time.slice(0, 7).map((dateString, index) => {
        const dateObj = new Date(dateString);
        const minTemp = Math.round(temperature_2m_min[index]);
        const maxTemp = Math.round(temperature_2m_max[index]);

        return {
            id: dateString,
            dayLabel: index === 0 ? 'Сегодня' : DAYS_OF_WEEK[dateObj.getDay()],
            minTemperatureText: `${minTemp > 0 ? '+' : ''}${minTemp}°`,
            maxTemperatureText: `${maxTemp > 0 ? '+' : ''}${maxTemp}°`
        };
    });

    return {
        currentTemperatureText: `${currentTemp > 0 ? '+' : ''}${currentTemp}°`,
        forecast
    };
};
