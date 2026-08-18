// src/utils/weatherAdapter.js

// Браузерный форматтер для названий дней недели (короткий формат, например: "Пн", "Вт")
const dayOfWeekFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' });

/**
 * Вспомогательная функция для безопасного округления и добавления знака "+" для тепла
 */
const formatTemperature = (value) => {
    if (value === undefined || value === null || isNaN(Number(value))) {
        return '--°'; // Заглушка, если бэкенд прислал битые данные или пустоту
    }
    const roundedValue = Math.round(Number(value));

    // Защита от системного отображения "-0" при округлении
    if (roundedValue === 0) return '0°';

    return `${roundedValue > 0 ? '+' : ''}${roundedValue}°`;
};

export const prepareWeatherData = (rawResponse) => {
    // 1. Безопасный возврат, если бэкенд вообще ничего не прислал
    if (!rawResponse || !rawResponse.current || !rawResponse.daily) return null;

    const rawCurrentTemp = rawResponse.current.temperature_2m;
    const { time = [], temperature_2m_min = [], temperature_2m_max = [] } = rawResponse.daily;

    // 2. Формируем массив прогноза на 7 дней
    const forecast = time.slice(0, 7).map((dateString, index) => {
        const dateObj = new Date(dateString);

        // Переводим день недели через Intl и делаем первую букву заглавной (например, "пн" -> "Пн")
        let dayLabel = dayOfWeekFormatter.format(dateObj);
        dayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);

        return {
            id: dateString,
            // Если это первый элемент в массиве — пишем "Сегодня", иначе подставляем динамический перевод
            dayLabel: index === 0 ? 'Сегодня' : dayLabel,
            // Используем наш безопасный адаптер температуры
            minTemperatureText: formatTemperature(temperature_2m_min[index]),
            maxTemperatureText: formatTemperature(temperature_2m_max[index])
        };
    });

    return {
        // Безопасно форматируем текущую температуру
        currentTemperatureText: formatTemperature(rawCurrentTemp),
        forecast
    };
};
