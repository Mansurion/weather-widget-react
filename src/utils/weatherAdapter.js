const dayOfWeekFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' });

const formatTemperature = (value) => {
    if (value === undefined || value === null || isNaN(Number(value))) {
        return '--°';
    }
    const roundedValue = Math.round(Number(value));

    if (roundedValue === 0) return '0°';

    return `${roundedValue > 0 ? '+' : ''}${roundedValue}°`;
};

export const prepareWeatherData = (rawResponse) => {
    if (
        !rawResponse ||
        !rawResponse.current ||
        !rawResponse.daily ||
        !Array.isArray(rawResponse.daily.time) ||
        rawResponse.daily.time.length === 0
    ) {
        return null;
    }

    const rawCurrentTemp = rawResponse.current.temperature_2m;
    const { time = [], temperature_2m_min = [], temperature_2m_max = [] } = rawResponse.daily;

    const forecast = time.slice(0, 7).map((dateString, index) => {
        const dateObj = new Date(dateString);

        let dayLabel = dayOfWeekFormatter.format(dateObj);
        dayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);

        return {
            id: dateString,
            dayLabel: index === 0 ? 'Сегодня' : dayLabel,
            minTemperatureText: formatTemperature(temperature_2m_min[index]),
            maxTemperatureText: formatTemperature(temperature_2m_max[index])
        };
    });

    return {
        currentTemperatureText: formatTemperature(rawCurrentTemp),
        forecast
    };
};