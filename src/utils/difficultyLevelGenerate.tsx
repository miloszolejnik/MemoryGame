import { useMemoryGameStore } from '../store/store';
import { saveGameState } from '../utils/gameSave'; // Import saveGameState

export function difficultyLevelGenerate() {
  const gameInfo = useMemoryGameStore.getState();
  const selectedTheme = gameInfo.cardTheme;

  if (!selectedTheme) {
    return;
  }

  const shuffledDeck = [...selectedTheme.cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));

  const cardInUse = [];

  switch (gameInfo.difficulty) {
    case 'EASY':
      cardInUse.push(...shuffledDeck.slice(0, 8), ...shuffledDeck.slice(0, 8));
      break;
    case 'MEDIUM':
      cardInUse.push(
        ...shuffledDeck.slice(0, 18),
        ...shuffledDeck.slice(0, 18)
      );
      break;
    case 'HARD':
      cardInUse.push(
        ...shuffledDeck.slice(0, 32),
        ...shuffledDeck.slice(0, 32)
      );
      break;
    default:
      throw new Error(`Invalid difficulty level: ${gameInfo.difficulty}`);
  }

  const updatedDeck = [...cardInUse]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));

  useMemoryGameStore.setState({ cardsInUse: updatedDeck });

  saveGameState({ ...gameInfo, cardsInUse: updatedDeck });

  return cardInUse;
}
