import { useState, useEffect } from 'react';
import { useFetch } from './use-fetch';
import { CITIES } from '../data';
import { prepareWeatherData } from '../utils/weatherAdapter';

export const useWeather = () => {
    const [selectedCityId, setSelectedCityId] = useState(() => {
        return localStorage.getItem('selectedCityId') || 'msk';
    });

    const currentCity = CITIES.find((city) => city.id === selectedCityId) || CITIES[0];

    const queryParams = new URLSearchParams({
        latitude: currentCity.latitude,
        longitude: currentCity.longitude,
        current: 'temperature_2m',
        daily: 'temperature_2m_max,temperature_2m_min',
        timezone: 'auto'
    }).toString();

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${queryParams}`;
    const { data: rawWeatherData, isLoading, error, refetch } = useFetch(weatherUrl);

    const weatherData = prepareWeatherData(rawWeatherData);

    useEffect(() => {
        localStorage.setItem('selectedCityId', selectedCityId);
    }, [selectedCityId]);

    return {
        selectedCityId,
        setSelectedCityId,
        weatherData,
        isLoading,
        error,
        refetch
    };
};
