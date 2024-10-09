import { useMemoryGameStore } from '../store/store';
import { CardTheme } from '../types/gameSettings';

export function selectTheme(theme: CardTheme) {
  useMemoryGameStore.setState({ cardTheme: theme });
  console.log(useMemoryGameStore.getState());
}
