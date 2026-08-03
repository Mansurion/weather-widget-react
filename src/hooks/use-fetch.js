import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updater, setUpdater] = useState(0);

    const refetch = useCallback(() => {
        setUpdater((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(err.message || 'Не удалось загрузить данные');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, updater]);

    return { data, isLoading, error, refetch };
};
