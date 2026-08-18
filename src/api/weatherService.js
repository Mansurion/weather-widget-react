const JSON_SERVER_BASE_URL = 'http://localhost:3000';

// Вспомогательная функция для генерации примерной погоды на ходу
const generateMockWeather = (cityId) => {
    // Случайная базовая температура от +10 до +28 градусов
    const baseTemp = Math.floor(Math.random() * (28 - 10 + 1)) + 10;

    return {
        id: `mock-w${cityId}`,
        cityId: String(cityId),
        current: {
            temperature_2m: baseTemp
        },
        daily: {
            time: ["2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23", "2026-08-24"],
            temperature_2m_max: [baseTemp + 2, baseTemp + 4, baseTemp + 1, baseTemp + 3, baseTemp, baseTemp - 2, baseTemp + 1],
            temperature_2m_min: [baseTemp - 5, baseTemp - 4, baseTemp - 6, baseTemp - 5, baseTemp - 7, baseTemp - 8, baseTemp - 6]
        }
    };
};

export const weatherService = {
    async getWeather(cityId, signal) {
        const url = `${JSON_SERVER_BASE_URL}/weather?cityId=${cityId}`;
        const response = await fetch(url, { signal });

        // Если сервер вернул 404 (данных нет), сразу отдаем сгенерированную погоду
        if (response.status === 404) {
            const mockWeather = generateMockWeather(cityId);
            const { prepareWeatherData } = await import('../utils/weatherAdapter');
            return prepareWeatherData(mockWeather);
        }

        if (!response.ok) {
            throw new Error(`Ошибка метео-сервера: ${response.status}`);
        }

        const rawData = await response.json();
        const cityWeather = rawData && rawData.length > 0 ? rawData[0] : generateMockWeather(cityId);

        const { prepareWeatherData } = await import('../utils/weatherAdapter');
        return prepareWeatherData(cityWeather);
    }

};
