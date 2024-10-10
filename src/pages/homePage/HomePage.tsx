import { DifficultyLvlCard } from '../../components/homePageComponents/DifficultyLvlCard';
import { Difficulty } from '../../types/gameSettings';
import style from './style.module.scss';

export function HomePage() {
  const difficulty = Object.values(Difficulty);

  return (
    <div className={style.HomePage}>
      <h1>Memory Game</h1>
      <h2>Select Difficulty LvL</h2>
      <div className={style.CardContainer}>
        {difficulty.map((lvl) => (
          <DifficultyLvlCard key={lvl} difficulty={lvl} />
        ))}
      </div>
    </div>
  );
}
