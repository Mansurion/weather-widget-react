import { Link } from 'react-router-dom';
import styles from './CityList.module.css';

const CITY_LIST_CLASSES = {
    CITY_LIST: 'city-list',
    LOADING: 'city-list__loading',
    LOADING_ERROR: 'city-list__loading--error',
    CARD_LINK: 'city-list__card-link',
    SCROLL_TRIGGER: 'city-list__scroll-trigger',
};

const CITY_LIST_LABELS = {
    NOT_FOUND: 'Города не найдены',
    INITIAL_LOADING: 'Загрузка...',
    INCREMENTAL_LOADING: 'Подгружаем...',
};

export const CityList = ({
    cities,
    isLoading,
    error,
    hasMore,
    scrollTriggerRef
}) => {
    const isListEmpty = cities.length === 0;

    const renderCityCard = (city) => {
        const adminPart = city.admin ? `, ${city.admin}` : '';
        const countryPart = city.country ? `, ${city.country}` : '';

        return (
            <Link
                key={city.id}
                to={`/city/${city.id}`}
                className={styles[CITY_LIST_CLASSES.CARD_LINK]}
            >
                {city.name}{adminPart}{countryPart}
            </Link>
        );
    };

    return (
        <div className={styles[CITY_LIST_CLASSES.CITY_LIST]}>
            {error && (
                <div className={`${styles[CITY_LIST_CLASSES.LOADING]} ${styles[CITY_LIST_CLASSES.LOADING_ERROR]}`}>
                    {error}
                </div>
            )}

            {!isLoading && !error && isListEmpty && (
                <div className={styles[CITY_LIST_CLASSES.LOADING]}>
                    {CITY_LIST_LABELS.NOT_FOUND}
                </div>
            )}

            {cities.map(renderCityCard)}

            {isLoading && (
                <div className={styles[CITY_LIST_CLASSES.LOADING]}>
                    {isListEmpty ? CITY_LIST_LABELS.INITIAL_LOADING : CITY_LIST_LABELS.INCREMENTAL_LOADING}
                </div>
            )}

            {hasMore && !error && !isListEmpty && (
                <div ref={scrollTriggerRef} className={styles[CITY_LIST_CLASSES.SCROLL_TRIGGER]} />
            )}
        </div>
    );
};