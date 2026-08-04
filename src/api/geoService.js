const GEO_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const geoService = {
 
    async searchCities(query, signal) {
        const queryParams = new URLSearchParams({
            name: query,
            count: '10',
            language: 'ru',
            format: 'json'
        });

        const url = `${GEO_BASE_URL}?${queryParams}`;
        const response = await fetch(url, { signal });

        if (!response.ok) {
            throw new Error('Не удалось загрузить список городов от сервера');
        }

        const data = await response.json();
        return data.results || [];
    }
};
