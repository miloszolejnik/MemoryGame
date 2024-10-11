import { useEffect, useState } from 'react';
import { useMemoryGameStore } from '../store/store';
import { saveGameState } from '../utils/gameSave';

export const useTimer = (onEnd: () => void) => {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const startTimer = () => {
    if (!intervalId || intervalId === null) {
      const id = window.setInterval(() => {
        const time = useMemoryGameStore.getState().time;
        useMemoryGameStore.setState({ time: time + 1 });
        saveGameState(useMemoryGameStore.getState());
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      onEnd();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return { startTimer, stopTimer };
};
