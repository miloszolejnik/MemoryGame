import { useEffect, useState } from 'react';
import { useMemoryGameStore } from '../../store/store';
import { CardStructure } from '../../types/gameSettings';
import { difficultyLevelGenerate } from '../../utils/difficultyLevelGenerate';
import { GameCard } from './GameCard';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
export const GameScene = () => {
  const [disable, setDisable] = useState(false);

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
  useEffect(() => {
    difficultyLevelGenerate();
  }, []);

  const gameTable = useMemoryGameStore((state) => state.cardsInUse);
  const allCardsMatched = gameTable.every((c) => c.isMatched);
  const navigate = useNavigate();
  if (!gameTable) {
    return null;
  }

  return (
    <div>
      {allCardsMatched && (
        <div className={style.YouWin}>
          <h1>✨YOU WIN✨</h1>
          <button onClick={() => navigate('/')}>PLAY AGAIN</button>
        </div>
      )}
      <div className={style.GameScene} data-grid-size={gridSize}>
        {gameTable.map((card: CardStructure, index: number) => (
          <GameCard
            key={index}
            card={card}
            disable={disable}
            setDisable={setDisable}
            allCardsMatched={allCardsMatched}
          />
        ))}
      </div>
    </div>
  );
};
