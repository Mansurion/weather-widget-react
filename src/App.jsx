import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import CityListPage from './pages/CityListPage/CityListPage';
import CityDetailPage from './pages/CityDetailPage/CityDetailPage';
import './App.css';

// Добавляем basename, чтобы роутер учитывал подпапку /weather-widget-react/
const router = createBrowserRouter([
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

const App = () => {
  return (
    <div className="widget">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
