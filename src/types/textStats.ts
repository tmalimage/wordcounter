export type TextStats = {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  whitespaces: number;
  letters: number;
  numbers: number;
  symbols: number;
  uniqueWords: number;
  averageWordsPerSentence: number;
  averageCharactersPerWord: number;
  averageSentencesPerParagraph: number;
  readingTimeSeconds: number;
  speakingTimeSeconds: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  readingDifficulty: string;
  syllables: number;
};

export type KeywordDensityItem = {
  keyword: string;
  count: number;
  density: number;
};

export type PlatformLimit = {
  id: string;
  label: string;
  maxCharacters: number;
  custom?: boolean;
};

export type GoalType = "words" | "characters";

export type WritingGoalData = {
  type: GoalType;
  target: number;
};

export type KeywordDensityOptions = {
  ngramSize?: 1 | 2 | 3;
  removeStopWords?: boolean;
  minWordLength?: number;
  maxResults?: number;
};
