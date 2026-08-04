import { useState, useEffect } from 'react';
import { CITIES } from '../data';
import { geoService } from '../api/geoService';

export const useCitySearch = (query) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const trimmedQuery = query.trim();

        // 1. Быстрый возврат для пустого инпута — берем локальные данные
        if (trimmedQuery.length === 0) {
            setCities(CITIES.slice(0, 10));
            setIsLoading(false);
            setError(null);
            return;
        }

        // 2. Игнорируем ввод из одного символа
        if (trimmedQuery.length === 1) {
            return;
        }

        const controller = new AbortController();

        const fetchCities = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // 3. Вызываем изолированный инфраструктурный сервис
                const networkCities = await geoService.searchCities(trimmedQuery, controller.signal);
                setCities(networkCities.slice(0, 10));
            } catch (err) {
                // Игнорируем ошибку отмены запроса, так как это штатное поведение UX
                if (err.name === 'AbortError') return;
                setError(err.message || 'Произошла ошибка при поиске');
            } finally {
                setIsLoading(false);
            }
        };

        // Дебаунс для предотвращения спама запросами в процессе ввода
        const timeoutId = setTimeout(fetchCities, 500);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query]);

    return { cities, isLoading, error };
};
