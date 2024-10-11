import { useNavigate } from 'react-router-dom';
import { useMemoryGameStore } from '../store/store';
import { CardTheme } from '../types/gameSettings';

export const useSelectTheme = () => {
  const navigate = useNavigate();

  const changeTheme = (theme: CardTheme) => {
    useMemoryGameStore.setState({ cardTheme: theme });
    navigate('/game');
  };

  return changeTheme;
};
