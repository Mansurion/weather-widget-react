import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCitySearch } from '../../hooks/use-city-search';
import './CityListPage.css';

const CityListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { cities, isLoading, error } = useCitySearch(searchQuery);

    return (
        <div className="city-list-page">
            <input
                type="text"
                id="city-search"
                name="citySearch"
                className="search-input"
                placeholder="Введите название города..."
                aria-label="Поиск города"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />

            <div className="city-list-container">
                {isLoading && <div className="loading">Загрузка списка городов...</div>}
                {error && <div className="loading error">{error}</div>}

                {!isLoading && !error && cities.length === 0 && (
                    <div className="loading">Города не найдены</div>
                )}

                {!isLoading && !error && cities.map((city) => {
                    const regionText = city.admin ? `, ${city.admin}` : '';
                    const countryText = city.country ? ` (${city.country})` : '';

                    return (
                        <Link
                            key={city.id}
                            to={`/city/${encodeURIComponent(city.name)}/${city.latitude}/${city.longitude}`}
                            className="city-card-link"
                        >
                            {city.name}{regionText}{countryText}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CityListPage;
