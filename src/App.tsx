import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import NotFoundPage from './pages/errorPages/NotFoundPage';
import { ThemeSelector } from './pages/themeSelector/ThemeSelector';
import { GameScreen } from './pages/gameScreen/GameScreen';

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
  {
    path: '/game',
    element: <GameScreen />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
