import { useState, useEffect } from 'react';

export const useCitySearch = (query) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Если запрос слишком короткий, очищаем список результатов
        if (query.trim().length < 2) {
            setCities([]);
            return;
        }

        const controller = new AbortController();

        const searchCities = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const queryParams = new URLSearchParams({
                    name: query,
                    count: '5',
                    language: 'ru',
                }).toString();

                const url = `https://geocoding-api.open-meteo.com/v1/search?${queryParams}`;

                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) throw new Error('Ошибка поиска городов');

                const data = await response.json();

                // Безопасно маппим результаты (сервер может вернуть undefined, если ничего не найдено)
                const mappedCities = (data.results || []).map((item) => ({
                    id: String(item.id),
                    name: item.name,
                    country: item.country || '',
                    admin: item.admin1 || '', // Область/регион
                    latitude: item.latitude,
                    longitude: item.longitude,
                }));

                setCities(mappedCities);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError('Не удалось загрузить список городов');
            } finally {
                setIsLoading(false);
            }
        };

        // Реализуем простейший Debounce (задержку запроса), чтобы не спамить сервер на каждую букву
        const debounceTimer = setTimeout(() => {
            searchCities();
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
            controller.abort(); // Отменяем старый сетевой запрос, если пользователь продолжает печатать
        };
    }, [query]);

    return { cities, isLoading, error };
};
