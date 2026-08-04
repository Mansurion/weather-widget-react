import { prepareWeatherData } from '../utils/weatherAdapter';

const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast?current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto';

export const weatherService = {
    async getWeather(latitude, longitude, signal) {
        const url = `${WEATHER_BASE_URL}&latitude=${latitude}&longitude=${longitude}`;
        const response = await fetch(url, { signal });

        if (!response.ok) {
            throw new Error(`Ошибка метео-сервера: ${response.status}`);
        }

        const rawData = await response.json();

        return prepareWeatherData(rawData);
    }
};
