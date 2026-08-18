const JSON_SERVER_BASE_URL = 'http://localhost:3000';

// 1. Обертка для защиты сетевого слоя от бесконечного ожидания (Timeout)
const fetchWithTimeout = async (url, options = {}, timeoutMs = 5000) => {
  const { signal, ...restOptions } = options;
  const controller = new AbortController();

  // Принудительно прерываем запрос через 5 секунд
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // Связываем внешний сигнал отмены (если React размонтирует компонент)
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    return await fetch(url, { ...restOptions, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

export const geoService = {
  // СТРАТЕГИЯ 1: Локальный поиск по названию через json-server без интернета
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

  // СТРАТЕГИЯ 2: Бесконечный скролл через локальный json-server с пагинацией
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
