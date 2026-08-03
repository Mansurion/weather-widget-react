import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [updater, setUpdater] = useState(0);

    const fetchData = useCallback(async () => {
        if (!url) return;
        setIsLoading(true);
        setError(null);

        try {
            const cacheBusterUrl = new URL(url);
            cacheBusterUrl.searchParams.set('_t', Date.now());

            const response = await fetch(cacheBusterUrl.toString());

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            console.log('Ошибка сети:', err);
            setError('Ошибка получения данных');
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    const refetch = useCallback(() => {
        setUpdater((prev) => prev + 1);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData, updater]);

    return { data: weatherData, isLoading, error, refetch };
};
