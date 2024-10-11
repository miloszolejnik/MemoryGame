import { CardStructure } from '../types/gameSettings';
import { useMemoryGameStore } from '../store/store';
import { saveGameState } from '../utils/gameSave';

export const handleCardClick = (
  card: CardStructure,
  disable: boolean,
  currentCardsInUse: CardStructure[],
  selectedCard: string | null,
  setDisable: (value: boolean) => void,
  setError: (value: boolean) => void
) => {
  const moves = useMemoryGameStore.getState().moves;

  if (disable) return;

  setDisable(true);

  if (!card.isFlipped || !card.isMatched) {
    const updatedCardsInUse = currentCardsInUse.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      }
      return c;
    });

    useMemoryGameStore.setState({
      cardsInUse: updatedCardsInUse,
      moves: moves + 1,
    });

    saveGameState(useMemoryGameStore.getState());

    if (!selectedCard) {
      useMemoryGameStore.setState({ selectedCard: card.backgroundImage });
      saveGameState(useMemoryGameStore.getState());
      setDisable(false);
      return;
    }

    if (selectedCard === card.backgroundImage) {
      const matchedCards = currentCardsInUse.map((c) => {
        if (
          c.backgroundImage === selectedCard ||
          c.backgroundImage === card.backgroundImage
        ) {
          return { ...c, isMatched: true, isFlipped: true };
        }
        return c;
      });
      useMemoryGameStore.setState({
        cardsInUse: matchedCards,
        selectedCard: null,
      });

      saveGameState(useMemoryGameStore.getState());

      setDisable(false);
      return;
    }

    if (selectedCard !== card.backgroundImage) {
      setTimeout(() => {
        const resetFlippedCards = currentCardsInUse.map((c) => {
          if (
            c.backgroundImage === selectedCard ||
            c.backgroundImage === card.backgroundImage
          ) {
            return { ...c, isFlipped: false };
          }
          return c;
        });
        useMemoryGameStore.setState({
          cardsInUse: resetFlippedCards,
          selectedCard: null,
        });
        saveGameState(useMemoryGameStore.getState());
        setDisable(false);
      }, 1000);
      return;
    }
  } else {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 500);
    setDisable(false);
  }
};
