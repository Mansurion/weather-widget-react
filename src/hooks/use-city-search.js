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

    const [prevTrimmedQuery, setPrevTrimmedQuery] = useState(trimmedQuery);

    if (trimmedQuery !== prevTrimmedQuery) {
        setPrevTrimmedQuery(trimmedQuery);
        setPage(1);
        setCities([]);
        setHasMore(true);
        setError(null);
    }

    useEffect(() => {
        const controller = new AbortController();

        if (trimmedQuery.length === 1) {
            setIsLoading(false);
            return;
        }

        const loadData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (isSearchMode) {
                    const networkCities = await geoService.searchCities(trimmedQuery, controller.signal);
                    setCities(networkCities.slice(0, 10));
                    setHasMore(false);
                } else {
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

        const delay = isSearchMode ? 500 : 0;
        const timeoutId = setTimeout(loadData, delay);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [page, trimmedQuery, isSearchMode]);

    const loadMore = useCallback(() => {
        if (isLoading || !hasMore || isSearchMode) {
            return;
        }

        setPage((prevPage) => prevPage + 1);
    }, [isLoading, hasMore, isSearchMode]);

    return { cities, isLoading, error, hasMore, loadMore };
};
