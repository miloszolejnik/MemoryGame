import { useMemoryGameStore } from '../store/store';
import { cardThemes } from './cardDecs';

export function difficultyLevelGenerate() {
  const gameInfo = useMemoryGameStore.getState();
  const selectedTheme = cardThemes[gameInfo.cardTheme];
  let shuffledDeck = [...selectedTheme.cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
  const cardInUse = [];

  switch (gameInfo.difficulty) {
    case 'EASY':
      cardInUse.push(...shuffledDeck.slice(0, 8), ...shuffledDeck.slice(0, 8));
      shuffledDeck = [...cardInUse]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      useMemoryGameStore.setState({ cardsInUse: shuffledDeck });
      return cardInUse;
    case 'MEDIUM':
      cardInUse.push(
        ...shuffledDeck.slice(0, 16),
        ...shuffledDeck.slice(0, 16)
      );
      shuffledDeck = [...cardInUse]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      useMemoryGameStore.setState({ cardsInUse: shuffledDeck });
      return cardInUse;
    case 'HARD':
      cardInUse.push(
        ...shuffledDeck.slice(0, 32),
        ...shuffledDeck.slice(0, 32)
      );
      shuffledDeck = [...cardInUse]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      useMemoryGameStore.setState({ cardsInUse: shuffledDeck });
      return cardInUse;
    default:
      throw new Error(`Invalid difficulty level: ${gameInfo.difficulty}`);
  }
}
