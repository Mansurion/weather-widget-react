import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './App.css';

export const App = () => {
  return (
    <div className="widget">
      <RouterProvider router={router} />
    </div>
  );
};