import { useState } from 'react';
import { useMemoryGameStore } from '../../store/store';
import { CardStructure } from '../../types/gameSettings';
import { cardThemes } from '../../utils/cardDecs';
import style from './style.module.scss';
export const GameCard = ({
  card,
  disable,
  setDisable,
}: {
  card: CardStructure;
  disable: boolean;
  setDisable: (value: boolean) => void;
}) => {
  const [error, setError] = useState(false);
  const reverse =
    cardThemes[useMemoryGameStore((state) => state.cardTheme)].cardBackround;
  const currentCardsInUse = useMemoryGameStore((state) => state.cardsInUse);
  const selectedCard = useMemoryGameStore((state) => state.selectedCard);
  const moves = useMemoryGameStore((state) => state.moves);

  if (!card.id) {
    return null;
  }

  const handleClick = () => {
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
    } else if (card.isMatched || card.isFlipped || disable) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 500);
    }

    setDisable(false);
  };

  const isGradient = card.backgroundImage.startsWith('linear-gradient');
  const isImageUrl =
    card.backgroundImage.startsWith('http') ||
    card.backgroundImage.startsWith('data:image');

  const backgroundType = isGradient
    ? 'gradient'
    : isImageUrl
      ? 'image'
      : 'none';
  const backgroundValue = card.backgroundImage;

  const customStyle: React.CSSProperties = {
    '--background-value': backgroundValue,
  } as React.CSSProperties & { '--background-value'?: string };

  return (
    <div
      className={`${style.GameCardContainer} 
            ${card.isFlipped ? style.flipped : ''}`}
      data-card-error={error}
      onClick={() => {
        if (!disable) handleClick();
      }}
    >
      <div className={style.GameCardReverse}>
        <img src={reverse} />
      </div>
      <div
        className={style.GameCard}
        data-card-id={card.id}
        data-card-background-type={backgroundType}
        style={customStyle}
      >
        <span className={style.iconContainer}>{card.icon}</span>
      </div>
    </div>
  );
};
