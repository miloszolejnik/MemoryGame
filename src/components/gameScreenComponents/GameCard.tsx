import { useEffect, useState } from 'react';
import { useMemoryGameStore } from '../../store/store';
import { CardStructure, CardThemeSet } from '../../types/gameSettings';
import { useTimer } from '../../utils/useTimer';
import { handleCardClick } from '../../utils/gameLogic';
import style from './style.module.scss';
import { getIconElement } from '../../utils/iconUtils';

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
  const { cardBackround } = useMemoryGameStore(
    (state) => state.cardTheme
  ) as CardThemeSet;
  const reverse = cardBackround;
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

  let backgroundStyle: React.CSSProperties = {};

  if (card.backgroundImage.startsWith('linear-gradient')) {
    backgroundStyle = {
      background: card.backgroundImage,
    };
  } else if (
    card.backgroundImage.startsWith('http') ||
    card.backgroundImage.startsWith('/src/assets')
  ) {
    backgroundStyle = {
      backgroundImage: `url(${card.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

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
        <img src={reverse} alt="Card reverse" />
      </div>
      <div
        className={style.GameCard}
        data-card-id={card.id}
        style={backgroundStyle}
      >
        <span className={style.iconContainer}>{getIconElement(card.icon)}</span>
      </div>
    </div>
  );
};
