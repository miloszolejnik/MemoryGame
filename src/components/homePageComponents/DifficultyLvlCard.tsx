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

  const bacground =
    difficulty === Difficulty.EASY
      ? style['Card--easy']
      : difficulty === Difficulty.MEDIUM
        ? style['Card--medium']
        : style['Card--hard'];

  return (
    <div className={`${style.Card} ${bacground}`} onClick={handleClick}>
      <h2>
        {difficulty
          ? difficulty === Difficulty.EASY
            ? 'Easy'
            : difficulty === Difficulty.MEDIUM
              ? 'Medium'
              : 'Hard'
          : ''}
      </h2>
    </div>
  );
};
