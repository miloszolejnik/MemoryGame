import style from './style.module.scss';
import { Difficulty } from '../../types/gameSettings';
import { useChangeDifficulty } from '../../utils/changeDifficulty';

export const DifficultyLvlCard = ({
  difficulty,
}: {
  difficulty: Difficulty;
}) => {
  const changeDifficulty = useChangeDifficulty();
  const handleClick = () => {
    changeDifficulty(difficulty);
  };

  return (
    <div
      className={`${style.Card}`}
      data-difficulty={difficulty}
      onClick={handleClick}
    >
      <h2>{difficulty}</h2>
    </div>
  );
};
