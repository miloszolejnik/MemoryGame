import { DifficultyLvlCard } from '../../components/homePageComponents/DifficultyLvlCard';
import { Difficulty } from '../../types/gameSettings';
import style from './style.module.scss';

export function HomePage() {
  return (
    <div className={style.HomePage}>
      <h1>Memory Game</h1>
      <h2>Select Difficulty LvL</h2>
      <div className={style.CardContainer}>
        <DifficultyLvlCard difficulty={Difficulty.EASY} />
        <DifficultyLvlCard difficulty={Difficulty.MEDIUM} />
        <DifficultyLvlCard difficulty={Difficulty.HARD} />
      </div>
    </div>
  );
}
