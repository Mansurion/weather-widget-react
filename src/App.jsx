import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import CityListPage from './pages/CityListPage/CityListPage';
import CityDetailPage from './pages/CityDetailPage/CityDetailPage';
import './App.css';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: <CityListPage />,
    },
    {
      path: ROUTES.CITY_DETAILS,
      element: <CityDetailPage />,
    },
  ],
  {
    basename: '/weather-widget-react', // Указываем роутеру базовый подпуть для GitHub Pages
  }
);


const App = () => {
  return (
    <div className="widget">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;