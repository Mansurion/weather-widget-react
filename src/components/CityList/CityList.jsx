import { Link } from 'react-router-dom';
import './CityList.css';

export const CityList = ({
    cities,
    isLoading,
    error,
    hasMore,
    scrollTriggerRef
}) => {
    const isListEmpty = cities.length === 0;

    return (
        <div className="city-list">
            {error && <div className="city-list__loading city-list__loading--error">{error}</div>}
            {!isLoading && !error && isListEmpty && <div className="city-list__loading">Города не найдены</div>}

            {cities.map((city) => (
                <Link
                    key={city.id}
                    to={`/city/${city.id}`}
                    className="city-list__card-link"
                >
                    {city.name}{city.admin ? `, ${city.admin}` : ''}{city.country ? ` (${city.country})` : ''}
                </Link>
            ))}

            {isLoading && <div className="city-list__loading">{isListEmpty ? 'Загрузка...' : 'Подгружаем...'}</div>}
            {hasMore && !error && !isListEmpty && <div ref={scrollTriggerRef} className="city-list__scroll-trigger" />}
        </div>
    );
};