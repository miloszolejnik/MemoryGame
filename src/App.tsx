import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import NotFoundPage from './pages/errorPages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
