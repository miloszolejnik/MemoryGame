export type CardStructure = {
  backgroundImage: string;
  icon: string;
  id?: number;
  isMatched: boolean;
  isFlipped: boolean;
};

export type CardThemeSet = {
  name: string;
  cardBackround: string;
  cards: CardStructure[];
};

export type CardThemes = {
  [key in CardTheme]: CardThemeSet;
};

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum CardTheme {
  SET_ONE = 'SET_ONE',
  SET_TWO = 'SET_TWO',
  // SET_THREE = 'SET_THREE',
  // SET_CUSTOM = 'SET_CUSTOM',
}

export type MemoryGameState = {
  difficulty: Difficulty;
  time: number;
  score: number;
  moves: number;
  cardTheme: CardThemeSet | null;
  selectedCard: string | null;
  cardsInUse: CardStructure[];
  setDifficulty?: (difficulty: Difficulty) => void;
  setTime?: (time: number) => void;
  setScore?: (score: number) => void;
  setMoves?: (moves: number) => void;
  setCardTheme?: (cardTheme: CardTheme) => void;
  setSelectedCard?: (selectedCard: string | null) => void;
  setCardsInUse?: (cardsInUse: CardStructure[]) => void;
};
