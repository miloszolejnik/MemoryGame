import { useMemoryGameStore } from '../store/store';

export function difficultyLevelGenerate() {
  const gameInfo = useMemoryGameStore.getState();
  const selectedTheme = gameInfo.cardTheme;
  if (!selectedTheme) {
    return;
  }
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
        ...shuffledDeck.slice(0, 18),
        ...shuffledDeck.slice(0, 18)
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
