import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import NotFoundPage from './pages/errorPages/NotFoundPage';
import { ThemeSelector } from './pages/themeSelector/ThemeSelector';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/theme-selection',
    element: <ThemeSelector />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
