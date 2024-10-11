import { useEffect, useState } from 'react';
import { useMemoryGameStore } from '../../store/store';
import { CardStructure } from '../../types/gameSettings';
import { GameCard } from './GameCard';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { loadGameState } from '../../utils/gameSave';
import { CongarulationsMessage } from './congarulationsMessage';

export const GameScene = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const localdata = loadGameState();

    if (localdata && localdata.cardsInUse && localdata.cardsInUse.length > 0) {
      useMemoryGameStore.setState({ cardsInUse: localdata.cardsInUse });
    } else {
      navigate('/');
    }

    setIsLoading(false);
  }, [navigate]);

  const gameTable = useMemoryGameStore((state) => state.cardsInUse);
  const allCardsMatched = gameTable.every((c) => c.isMatched);

  let gridSize;
  switch (useMemoryGameStore.getState().difficulty) {
    case 'EASY':
      gridSize = 4;
      break;
    case 'MEDIUM':
      gridSize = 6;
      break;
    case 'HARD':
      gridSize = 8;
      break;
    default:
      throw new Error(
        `Invalid difficulty level: ${useMemoryGameStore.getState().difficulty}`
      );
  }

  if (isLoading || !gameTable) {
    return null;
  }

  return (
    <div>
      {allCardsMatched && <CongarulationsMessage />}
      <div className={style.GameScene} data-grid-size={gridSize}>
        {gameTable.map((card: CardStructure, index: number) => (
          <GameCard
            key={index}
            card={card}
            disable={disable}
            setDisable={setDisable}
            allCardsMatched={allCardsMatched}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        ))}
      </div>
    </div>
  );
};
