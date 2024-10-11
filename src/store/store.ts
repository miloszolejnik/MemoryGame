import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  MemoryGameState,
  CardTheme,
  Difficulty,
  CardStructure,
} from '../types/gameSettings';
import { cardThemes } from '../utils/cardDecs';

export const useMemoryGameStore = create<MemoryGameState>()(
  devtools((set) => ({
    difficulty: Difficulty.EASY,
    time: 0,
    score: 0,
    moves: 0,
    cardTheme: cardThemes[CardTheme.SET_ONE],
    selectedCard: null,
    cardsInUse: [],
    setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
    setTime: (time: number) => set({ time }),
    setScore: (score: number) => set({ score }),
    setMoves: (moves: number) => set({ moves }),
    setCardTheme: (cardTheme: CardTheme) =>
      set({ cardTheme: cardThemes[cardTheme] }),
    setSelectedCard: (selectedCard: string | null) => set({ selectedCard }),
    setCardsInUse: (cardsInUse: CardStructure[]) => set({ cardsInUse }),
  }))
);
