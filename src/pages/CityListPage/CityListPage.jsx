// src/pages/CityListPage/CityListPage.jsx
import { useState } from 'react';
import { useCitySearch } from '../../hooks/use-city-search';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { CityList } from '../../components/CityList/CityList';
import styles from './CityListPage.module.css';

export const CityListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Подключаем бизнес-логику поиска и пагинации
    const { cities, isLoading, error, hasMore, loadMore } = useCitySearch(searchQuery);

    // Инициализируем наблюдатель скролла. 
    // Он возвращает callback-реф, который мы прокинем внутрь компонента CityList
    const scrollTriggerRef = useIntersectionObserver(loadMore, !isLoading && hasMore);

    return (
        <div className={styles['city-list-page']}>
            <input
                type="text"
                id="city-search"
                name="citySearch"
                className={styles['search-input']}
                placeholder="Введите название города..."
                aria-label="Поиск города"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />

            <div className={styles['city-list-container']}>
                <CityList
                    cities={cities}
                    isLoading={isLoading}
                    error={error}
                    hasMore={hasMore}
                    scrollTriggerRef={scrollTriggerRef}
                />
            </div>
        </div>
    );
};