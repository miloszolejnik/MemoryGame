import { create } from 'zustand';

enum CardTheme {
  SET_ONE = 'SET_ONE',
  SET_TWO = 'SET_TWO',
  SET_THREE = 'SET_THREE',
  SET_CUSTOM = 'SET_CUSTOM',
}
type MemoryGameState = {
  difficulty: number;
  time: number;
  score: number;
  moves: number;
  cardTheme: CardTheme;
};

export const useMemoryGameStore = create<MemoryGameState>((set) => ({
  difficulty: 0,
  time: 0,
  score: 0,
  moves: 0,
  cardTheme: CardTheme.SET_ONE,
  setDifficulty: (difficulty: number) => set({ difficulty }),
  setTime: (time: number) => set({ time }),
  setScore: (score: number) => set({ score }),
  setMoves: (moves: number) => set({ moves }),
  setCardTheme: (cardTheme: CardTheme) => set({ cardTheme }),
}));
