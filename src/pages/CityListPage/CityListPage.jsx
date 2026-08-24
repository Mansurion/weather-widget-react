import { useState } from 'react';
import { useCitySearch } from '../../hooks/use-city-search';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { CityList } from '../../components/CityList/CityList';
import styles from './CityListPage.module.css';

const CITY_LIST_PAGE_LABELS = {
    SEARCH_PLACEHOLDER: 'Введите название города...',
    SEARCH_ARIA_LABEL: 'Поиск города',
};

export const CityListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { cities, isLoading, error, hasMore, loadMore } = useCitySearch(searchQuery);

    const scrollTriggerRef = useIntersectionObserver(loadMore, !isLoading && hasMore);

    return (
        <div className={styles['city-list-page']}>
            <input
                type="text"
                id="city-search"
                name="citySearch"
                className={styles['search-input']}
                placeholder={CITY_LIST_PAGE_LABELS.SEARCH_PLACEHOLDER}
                aria-label={CITY_LIST_PAGE_LABELS.SEARCH_ARIA_LABEL}
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
