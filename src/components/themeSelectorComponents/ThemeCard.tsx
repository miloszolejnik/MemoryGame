import style from './style.module.scss';
import { CardTheme } from '../../types/gameSettings';
import { useSelectTheme } from '../../utils/selectTheme';

export const ThemeCard = ({ Theme }: { Theme: CardTheme }) => {
  const selectTheme = useSelectTheme();
  function handleClick() {
    selectTheme(Theme);
  }
  return (
    <div className={style.ThemeCard} onClick={handleClick}>
      <span>{Theme}</span>
    </div>
  );
};
