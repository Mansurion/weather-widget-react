import { useFetch } from './use-fetch';
import { prepareWeatherData } from '../utils/weatherAdapter';

// Хук принимает широту и долготу из URL параметров
export const useWeather = (latitude, longitude) => {
    const queryParams = new URLSearchParams({
        latitude,
        longitude,
        current: 'temperature_2m',
        daily: 'temperature_2m_max,temperature_2m_min',
        timezone: 'auto'
    }).toString();

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${queryParams}`;
    const { data: rawWeatherData, isLoading, error, refetch } = useFetch(weatherUrl);
    const weatherData = prepareWeatherData(rawWeatherData);

    return { weatherData, isLoading, error, refetch };
};
