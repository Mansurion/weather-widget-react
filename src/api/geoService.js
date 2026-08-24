import { fetchWithTimeout } from './fetchWithTimeout';

const JSON_SERVER_BASE_URL = 'http://localhost:3000';

export const geoService = {
  // Поиск по названию через json-server
  async searchCities(query, signal) {
    const url = `${JSON_SERVER_BASE_URL}/cities?name_like=${encodeURIComponent(query)}`;
    const response = await fetchWithTimeout(url, { signal });
    if (!response.ok) throw new Error(`Ошибка локального поиска: ${response.status}`);

    const rawResults = await response.json();

    return rawResults.map((city) => ({
      id: String(city.id),
      name: city.name,
      admin: city.admin,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude
    }));
  },

  // Бесконечный скролл через json-server с пагинацией
  async getPopularCities(page = 1, limit = 10, signal) {
    const url = `${JSON_SERVER_BASE_URL}/cities?_page=${page}&_limit=${limit}`;

    const response = await fetchWithTimeout(url, { signal });
    if (!response.ok) throw new Error(`Ошибка сервера городов: ${response.status}`);

    const rawResults = await response.json();

    // Извлекаем общее количество записей из заголовка для контроля пагинации
    const totalCountHeader = response.headers.get('X-Total-Count');
    const totalCount = totalCountHeader ? Number(totalCountHeader) : 0;

    const formattedResults = rawResults.map((city) => ({
      id: String(city.id),
      name: city.name,
      admin: city.admin,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude
    }));

    // Вычисляем, есть ли еще страницы для загрузки
    const hasMore = (page * limit) < totalCount;

    return {
      results: formattedResults,
      hasMore
    };
  }
};