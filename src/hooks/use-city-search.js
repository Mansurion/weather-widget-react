import { useState, useEffect, useCallback } from 'react';
import { geoService } from '../api/geoService';

export const useCitySearch = (query) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const trimmedQuery = query.trim();
    const isSearchMode = trimmedQuery.length > 1;

    // Безопасный сброс пагинации ТОЛЬКО при реальной смене поискового запроса или режима
    useEffect(() => {
        setPage(1);
        setCities([]);
        setHasMore(true);
        setError(null);
    }, [trimmedQuery]);

    // Основной эффект для подгрузки данных
    useEffect(() => {
        const controller = new AbortController();

        // Игнорируем промежуточное состояние ввода в 1 символ
        if (trimmedQuery.length === 1) {
            setIsLoading(false);
            return;
        }

        // Чистая изолированная асинхронная функция загрузки
        const loadData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (isSearchMode) {
                    // СТРАТЕГИЯ 2: Поиск по названию через внешнее API Open-Meteo
                    const networkCities = await geoService.searchCities(trimmedQuery, controller.signal);
                    setCities(networkCities.slice(0, 10));
                    setHasMore(false); // В режиме поиска бесконечный скролл отключаем
                } else {
                    // СТРАТЕГИЯ 1: Честный бесконечный скролл мегаполисов через GeoDB Cities API
                    const data = await geoService.getPopularCities(page, 10, controller.signal);

                    setCities((prev) => {
                        return page === 1 ? data.results : [...prev, ...data.results];
                    });
                    setHasMore(data.hasMore);
                }
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(err.message || 'Ошибка при загрузке данных');
            } finally {
                setIsLoading(false);
            }
        };

        // Для поиска делаем дебаунс 500мс, для скролла — запрашиваем моментально
        const delay = isSearchMode ? 500 : 0;
        const timeoutId = setTimeout(loadData, delay);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [page, trimmedQuery, isSearchMode]);

    // Функция-триггер для подгрузки следующей страницы с защитой по состоянию загрузки
    const loadMore = useCallback(() => {
        // Блокируем вызов, если идет загрузка, данные кончились или мы в режиме текстового поиска
        if (isLoading || !hasMore || isSearchMode) {
            return;
        }

        setPage((prevPage) => prevPage + 1);
    }, [isLoading, hasMore, isSearchMode]);

    // Возвращаем стейты во внешний мир для деструктуризации в компоненте списка
    return { cities, isLoading, error, hasMore, loadMore };
};
