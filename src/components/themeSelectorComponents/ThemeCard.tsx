import style from './style.module.scss';
import { CardTheme } from '../../types/gameSettings';
import { selectTheme } from '../../utils/selectTheme';

export const ThemeCard = ({ Theme }: { Theme: CardTheme }) => {
  function handleClick() {
    selectTheme(Theme);
  }
  return (
    <div className={style.ThemeCard} onClick={handleClick}>
      <span>{Theme}</span>
    </div>
  );
};
