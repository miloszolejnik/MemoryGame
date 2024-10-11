import { useMemoryGameStore } from '../store/store';
import { MemoryGameState } from '../types/gameSettings';

const STORAGE_KEY = 'memoryGameState';

export const loadGameState = (): MemoryGameState | null => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  const parsedState = storedState ? JSON.parse(storedState) : null;

  if (parsedState) {
    const {
      difficulty,
      time,
      score,
      moves,
      cardTheme,
      selectedCard,
      cardsInUse,
    } = parsedState;
    useMemoryGameStore.setState({
      difficulty: difficulty || 0,
      time: time || 0,
      score: score || 0,
      moves: moves || 0,
      cardTheme: cardTheme || 0,
      selectedCard: selectedCard || null,
      cardsInUse: cardsInUse || [],
    });
  }

  return parsedState;
};

export const saveGameState = (state: MemoryGameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
