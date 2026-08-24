import { fetchWithTimeout } from './fetchWithTimeout';

const JSON_SERVER_BASE_URL = 'http://localhost:3000';

const generateForecastDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);
        return date.toISOString().split('T')[0];
    });
};

const generateMockWeather = (cityId) => {
    const baseTemp = Math.floor(Math.random() * (28 - 10 + 1)) + 10;

    return {
        id: `mock-w${cityId}`,
        cityId: String(cityId),
        current: {
            temperature_2m: baseTemp
        },
        daily: {
            time: generateForecastDates(),
            temperature_2m_max: [baseTemp + 2, baseTemp + 4, baseTemp + 1, baseTemp + 3, baseTemp, baseTemp - 2, baseTemp + 1],
            temperature_2m_min: [baseTemp - 5, baseTemp - 4, baseTemp - 6, baseTemp - 5, baseTemp - 7, baseTemp - 8, baseTemp - 6]
        }
    };
};

export const weatherService = {
    async getWeather(cityId, signal) {
        const url = `${JSON_SERVER_BASE_URL}/weather?cityId=${cityId}`;
        const response = await fetchWithTimeout(url, { signal });

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
