import { ThemeCard } from '../../components/themeSelectorComponents/ThemeCard';
import { CardTheme } from '../../types/gameSettings';
import style from './style.module.scss';
export const ThemeSelector = () => {
  const themes = Object.values(CardTheme);

  return (
    <div className={style.ThemeSelector}>
      <h1>Select theme for your cards</h1>
      <div className={style.CardContainer}>
        {themes.map((theme) => (
          <ThemeCard key={theme} Theme={theme} />
        ))}
      </div>
    </div>
  );
};
