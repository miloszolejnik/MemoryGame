import style from './style.module.scss';
import { CardThemeSet } from '../../types/gameSettings';
import { useSelectTheme } from '../../utils/selectTheme';

export const ThemeCard = ({ Theme }: { Theme: CardThemeSet }) => {
  const selectTheme = useSelectTheme();
  function handleClick() {
    selectTheme(Theme);
  }
  return (
    <div className={style.ThemeCard} onClick={handleClick}>
      <h2>{Theme.name}</h2>
    </div>
  );
};
