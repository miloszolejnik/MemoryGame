import { useNavigate } from 'react-router-dom';
import { useMemoryGameStore } from '../store/store';
import { Difficulty } from '../types/gameSettings';

export const useChangeDifficulty = () => {
  const navigate = useNavigate();

  const changeDifficulty = (difficulty: Difficulty) => {
    useMemoryGameStore.setState({ difficulty });
    navigate('/theme-selection');
  };

  return changeDifficulty;
};
