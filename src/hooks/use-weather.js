import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../api/weatherService';

export const useWeather = (cityId) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updater, setUpdater] = useState(0);

    const refetch = useCallback(() => {
        setUpdater((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (!cityId) return;

        const controller = new AbortController();

        const fetchWeather = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Сервис теперь принимает cityId и возвращает адаптированные данные погоды
                const data = await weatherService.getWeather(cityId, controller.signal);
                setWeatherData(data);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(err.message || 'Не удалось загрузить данные погоды');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();

        return () => {
            controller.abort();
        };
    }, [cityId, updater]);

    return { weatherData, isLoading, error, refetch };
};
