import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { CityListPage } from '../pages/CityListPage/CityListPage';
import { CityDetailPage } from '../pages/CityDetailPage/CityDetailPage';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <CityListPage />,
    },
    {
        path: ROUTES.CITY_DETAILS,
        element: <CityDetailPage />,
    },
], {
    basename: '/weather-widget-react'
});
