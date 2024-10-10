import { useEffect } from 'react';
import { useMemoryGameStore } from '../../store/store';
import { CardStructure } from '../../types/gameSettings';
import { difficultyLevelGenerate } from '../../utils/difficultyLevelGenerate';
import { GameCard } from './GameCard';
import style from './style.module.scss';
export const GameScene = () => {
  let gridSize;
  switch (useMemoryGameStore.getState().difficulty) {
    case 'EASY':
      gridSize = 4;
      break;
    case 'MEDIUM':
      gridSize = 8;
      break;
    case 'HARD':
      gridSize = 16;
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

  if (!gameTable) {
    return null;
  }

  return (
    <div className={style.GameScene} data-grid-size={gridSize}>
      {gameTable.map((card: CardStructure, index: number) => (
        <GameCard key={index} card={card} />
      ))}
    </div>
  );
};
