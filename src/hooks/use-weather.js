import { useState, useEffect } from 'react';
import { useFetch } from './use-fetch';

export const useWeather = () => {
    const [selectedCity, setSelectedCity] = useState(() => {
        return localStorage.getItem('selectedCityCoordinates') || 'latitude=55.75&longitude=37.62';
    });

    const queryParams = new URLSearchParams({
        current: 'temperature_2m',
        daily: ['temperature_2m_max', 'temperature_2m_min'].join(','),
        timezone: 'auto'
    }).toString();

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${selectedCity}&${queryParams}`;
    const { data: weatherData, isLoading, error, refetch } = useFetch(weatherUrl);

    useEffect(() => {
        localStorage.setItem('selectedCityCoordinates', selectedCity);
    }, [selectedCity]);

    return {
        selectedCity,
        setSelectedCity,
        weatherData,
        isLoading,
        error,
        refetch
    };
};
