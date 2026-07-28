import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (!url) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url);

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
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data: weatherData, isLoading, error, refetch: fetchData };
};
