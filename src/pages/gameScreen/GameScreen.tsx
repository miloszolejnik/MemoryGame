import { GameScene } from '../../components/gameScreenComponents/GameScene';
import { GameSettings } from '../../components/gameScreenComponents/GameSettings';
import style from './style.module.scss';
export const GameScreen = () => {
  return (
    <div className={style.GameScreen}>
      <GameSettings />
      <GameScene />
    </div>
  );
};
