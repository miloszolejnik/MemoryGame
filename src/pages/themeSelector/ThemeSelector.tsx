import { ThemeCard } from '../../components/themeSelectorComponents/ThemeCard';
import { cardThemes } from '../../utils/cardDecs';
import style from './style.module.scss';
export const ThemeSelector = () => {
  const themes = Object.values(cardThemes);

  return (
    <div className={style.ThemeSelector}>
      <h1>Select theme for your cards</h1>
      <div className={style.CardContainer}>
        {themes.map((theme) => (
          <ThemeCard key={theme.name} Theme={theme} />
        ))}
      </div>
    </div>
  );
};
