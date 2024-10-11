import { useNavigate } from 'react-router-dom';
import { useMemoryGameStore } from '../store/store';
import { CardThemeSet } from '../types/gameSettings';
import { saveGameState } from './gameSave';
import { difficultyLevelGenerate } from './difficultyLevelGenerate';

export const useSelectTheme = () => {
  const navigate = useNavigate();

  const changeTheme = (theme: CardThemeSet) => {
    useMemoryGameStore.setState({ cardTheme: theme });
    saveGameState(useMemoryGameStore.getState());
    difficultyLevelGenerate();
    navigate('/game');
  };

  return changeTheme;
};
