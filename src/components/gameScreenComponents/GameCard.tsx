import { useEffect, useState } from 'react';
import { useMemoryGameStore } from '../../store/store';
import { CardStructure } from '../../types/gameSettings';
import { cardThemes } from '../../utils/cardDecs';
import { useTimer } from '../../utils/useTimer';
import { handleCardClick } from '../../utils/gameLogic';
import style from './style.module.scss';

export const GameCard = ({
  card,
  disable,
  setDisable,
  allCardsMatched,
}: {
  card: CardStructure;
  disable: boolean;
  setDisable: (value: boolean) => void;
  allCardsMatched: boolean;
}) => {
  const [error, setError] = useState(false);
  const reverse =
    cardThemes[useMemoryGameStore((state) => state.cardTheme)].cardBackround;
  const currentCardsInUse = useMemoryGameStore((state) => state.cardsInUse);
  const selectedCard = useMemoryGameStore((state) => state.selectedCard);
  const time = useMemoryGameStore((state) => state.time);
  const { startTimer, stopTimer } = useTimer(() => {});

  useEffect(() => {
    if (allCardsMatched) {
      stopTimer();
    }
  }, [allCardsMatched, stopTimer]);

  const handleClick = () => {
    if (time === 0) {
      startTimer();
    }

    handleCardClick(
      card,
      disable,
      currentCardsInUse,
      selectedCard,
      setDisable,
      setError
    );
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
