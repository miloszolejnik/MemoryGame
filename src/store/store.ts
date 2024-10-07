import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MemoryGameState, CardTheme, Difficulty } from '../types/gameSettings';

export const useMemoryGameStore = create<MemoryGameState>()(
  devtools((set) => ({
    difficulty: Difficulty.EASY,
    time: 0,
    score: 0,
    moves: 0,
    cardTheme: CardTheme.SET_ONE,
    setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
    setTime: (time: number) => set({ time }),
    setScore: (score: number) => set({ score }),
    setMoves: (moves: number) => set({ moves }),
    setCardTheme: (cardTheme: CardTheme) => set({ cardTheme }),
  }))
);
