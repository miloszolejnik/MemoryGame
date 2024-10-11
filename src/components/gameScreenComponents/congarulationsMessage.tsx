import { useMemoryGameStore } from '../../store/store';
import { CardTheme, Difficulty } from '../../types/gameSettings';
import { cardThemes } from '../../utils/cardDecs';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

export const CongarulationsMessage = () => {
  const navigate = useNavigate();

  function handlePlayAgain() {
    const { time, difficulty, moves, cardTheme, cardsInUse } =
      useMemoryGameStore.getState();

    const newGame = {
      time,
      difficulty,
      moves,
      cardTheme,
      cardsInUse,
      date: new Date().toISOString(),
    };

    const savedGames = JSON.parse(localStorage.getItem('memoryGames') || '[]');

    savedGames.push(newGame);

    localStorage.setItem('memoryGames', JSON.stringify(savedGames));
    localStorage.removeItem('memoryGameState');
    useMemoryGameStore.setState({
      time: 0,
      difficulty: Difficulty.EASY,
      score: 0,
      moves: 0,
      cardTheme: cardThemes[CardTheme.SET_ONE],
      selectedCard: null,
      cardsInUse: [],
    });
    navigate('/');
  }

  return (
    <div className={style.CongarulationsMessage}>
      <div className={style.YouWin}>
        <h1>✨YOU WIN✨</h1>
        <button onClick={handlePlayAgain}>PLAY AGAIN</button>
      </div>
    </div>
  );
};
