export enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export enum CardTheme {
  SET_ONE = 'SET_ONE',
  SET_TWO = 'SET_TWO',
  SET_THREE = 'SET_THREE',
  SET_CUSTOM = 'SET_CUSTOM',
}
export type MemoryGameState = {
  difficulty: Difficulty;
  time: number;
  score: number;
  moves: number;
  cardTheme: CardTheme;
};
