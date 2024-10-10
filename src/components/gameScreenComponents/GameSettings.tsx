import { useMemoryGameStore } from '../../store/store';
import style from './style.module.scss';
export const GameSettings = () => {
  const gameInfo = useMemoryGameStore((state) => state);

  return (
    <div className={style.GameSettings}>
      <div className={style.Setting}>
        <span>Difficulty:</span>
        <span>{gameInfo.difficulty}</span>
      </div>
      <div className={style.Setting}>
        <span>Moves:</span>
        <span>{gameInfo.moves}</span>
      </div>
      <div className={style.Setting}>
        <span>Time:</span>
        <span>{gameInfo.time}</span>
      </div>
    </div>
  );
};
