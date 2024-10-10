import { useMemoryGameStore } from '../../store/store';
import { CardStructure } from '../../types/gameSettings';
import { cardThemes } from '../../utils/cardDecs';
import style from './style.module.scss';
export const GameCard = ({ card }: { card: CardStructure }) => {
  const reverse =
    cardThemes[useMemoryGameStore((state) => state.cardTheme)].cardBackround;
  const currentCardsInUse = useMemoryGameStore((state) => state.cardsInUse);
  const selectedCard = useMemoryGameStore((state) => state.selectedCard);
  const moves = useMemoryGameStore((state) => state.moves);

  if (!card.id) {
    return null;
  }

  const handleClick = () => {
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
      // console.log(useMemoryGameStore.getState().selectedCard)
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
      }, 500);
    }
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
      className={`${style.GameCardContainer} ${card.isFlipped ? style.flipped : ''}`}
    >
      <div
        className={style.GameCard}
        data-card-id={card.id}
        data-card-background-type={backgroundType}
        style={customStyle}
      >
        <span className={style.iconContainer}>{card.icon}</span>
      </div>
      <div className={style.GameCardReverse} onClick={() => handleClick()}>
        <img src={reverse} />
      </div>
    </div>
  );
};
