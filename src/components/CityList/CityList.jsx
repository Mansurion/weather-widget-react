import { Link } from 'react-router-dom';
import styles from './CityList.module.css';

export const CityList = ({
  cities,
  isLoading,
  error,
  hasMore,
  scrollTriggerRef
}) => {
  const isListEmpty = cities.length === 0;

  return (
    <div className={styles['city-list']}>
      {error && <div className={`${styles['city-list__loading']} ${styles['city-list__loading--error']}`}>{error}</div>}
      {!isLoading && !error && isListEmpty && <div className={styles['city-list__loading']}>Города не найдены</div>}

      {cities.map((city) => (
        <Link
          key={city.id}
          to={`/city/${city.id}`}
          className={styles['city-list__card-link']}
        >
          {city.name}{city.admin ? `, ${city.admin}` : ''}{city.country ? `, ${city.country}` : ''}
        </Link>
      ))}

      {isLoading && <div className={styles['city-list__loading']}>{isListEmpty ? 'Загрузка...' : 'Подгружаем...'}</div>}
      {hasMore && !error && !isListEmpty && <div ref={scrollTriggerRef} className={styles['city-list__scroll-trigger']} />}
    </div>
  );
};