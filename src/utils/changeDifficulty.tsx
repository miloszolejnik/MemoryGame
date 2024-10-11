import { useNavigate } from 'react-router-dom';
import { useMemoryGameStore } from '../store/store';
import { Difficulty } from '../types/gameSettings';
import { saveGameState } from './gameSave';

export const useChangeDifficulty = () => {
  const navigate = useNavigate();

  const changeDifficulty = (difficulty: Difficulty) => {
    useMemoryGameStore.setState({ difficulty });
    saveGameState(useMemoryGameStore.getState());
    navigate('/theme-selection');
  };

  return changeDifficulty;
};
