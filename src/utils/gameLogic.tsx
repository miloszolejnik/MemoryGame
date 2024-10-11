import { CardStructure } from '../types/gameSettings';
import { useMemoryGameStore } from '../store/store';

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

    if (!selectedCard) {
      useMemoryGameStore.setState({ selectedCard: card.backgroundImage });
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
