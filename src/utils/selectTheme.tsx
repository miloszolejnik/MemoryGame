import { useNavigate } from 'react-router-dom';
import { useMemoryGameStore } from '../store/store';
import { CardThemeSet } from '../types/gameSettings';

export const useSelectTheme = () => {
  const navigate = useNavigate();

  const changeTheme = (theme: CardThemeSet) => {
    useMemoryGameStore.setState({ cardTheme: theme });
    navigate('/game');
  };

  return changeTheme;
};
