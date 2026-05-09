import type { TextStats } from "@/types/textStats";
import {
  DEFAULT_READING_WPM,
  DEFAULT_SPEAKING_WPM,
} from "@/lib/constants";
import {
  calculateFleschReadingEase,
  calculateFleschKincaidGrade,
  countSyllables,
  getReadingDifficulty,
} from "@/lib/readability";

const WORD_REGEX = /[a-z0-9]+(?:['-][a-z0-9]+)*/gi;

export function extractWords(text: string): string[] {
  if (!text) return [];
  return text.toLowerCase().match(WORD_REGEX) ?? [];
}

export function countWords(text: string): number {
  return extractWords(text).length;
}

export function countCharactersWithSpaces(text: string): number {
  return text.length;
}

export function countCharactersWithoutSpaces(text: string): number {
  if (!text) return 0;
  let count = 0;
  for (const ch of text) {
    if (!/\s/.test(ch)) count++;
  }
  return count;
}

export function countSentences(text: string): number {
  if (!text || !text.trim()) return 0;
  const matches = text.match(/[^.!?\n]+[.!?]+|[^.!?\n]+$/g);
  if (!matches) return 0;
  return matches.filter((s) => s.trim().length > 0).length;
}

export function countParagraphs(text: string): number {
  if (!text || !text.trim()) return 0;
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;
}

export function countLines(text: string): number {
  if (!text) return 0;
  if (!text.trim()) return 0;
  return text.split(/\r?\n/).length;
}

export function countUniqueWords(text: string): number {
  const words = extractWords(text);
  return new Set(words).size;
}

function countWhitespaces(text: string): number {
  if (!text) return 0;
  const matches = text.match(/\s/g);
  return matches ? matches.length : 0;
}

function countLetters(text: string): number {
  if (!text) return 0;
  const matches = text.match(/[a-zA-Z]/g);
  return matches ? matches.length : 0;
}

function countNumbers(text: string): number {
  if (!text) return 0;
  const matches = text.match(/[0-9]/g);
  return matches ? matches.length : 0;
}

function countSymbols(text: string): number {
  if (!text) return 0;
  const matches = text.match(/[^\w\s]/g);
  return matches ? matches.length : 0;
}

function totalSyllables(words: string[]): number {
  let total = 0;
  for (const w of words) total += countSyllables(w);
  return total;
}

export function calculateTextStats(
  text: string,
  options?: { readingWpm?: number; speakingWpm?: number }
): TextStats {
  const readingWpm = options?.readingWpm ?? DEFAULT_READING_WPM;
  const speakingWpm = options?.speakingWpm ?? DEFAULT_SPEAKING_WPM;

  const wordList = extractWords(text);
  const words = wordList.length;
  const charactersWithSpaces = countCharactersWithSpaces(text);
  const charactersWithoutSpaces = countCharactersWithoutSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = countLines(text);
  const whitespaces = countWhitespaces(text);
  const letters = countLetters(text);
  const numbers = countNumbers(text);
  const symbols = countSymbols(text);
  const uniqueWords = new Set(wordList).size;
  const syllables = totalSyllables(wordList);

  const averageWordsPerSentence =
    sentences > 0 ? words / sentences : 0;
  const averageCharactersPerWord =
    words > 0 ? charactersWithoutSpaces / words : 0;
  const averageSentencesPerParagraph =
    paragraphs > 0 ? sentences / paragraphs : 0;

  const readingTimeSeconds =
    readingWpm > 0 ? Math.round((words / readingWpm) * 60) : 0;
  const speakingTimeSeconds =
    speakingWpm > 0 ? Math.round((words / speakingWpm) * 60) : 0;

  const fleschReadingEase = calculateFleschReadingEase(words, sentences, syllables);
  const fleschKincaidGrade = calculateFleschKincaidGrade(words, sentences, syllables);
  const readingDifficulty =
    words === 0 || sentences === 0
      ? "N/A"
      : getReadingDifficulty(fleschReadingEase);

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    whitespaces,
    letters,
    numbers,
    symbols,
    uniqueWords,
    averageWordsPerSentence: round(averageWordsPerSentence, 2),
    averageCharactersPerWord: round(averageCharactersPerWord, 2),
    averageSentencesPerParagraph: round(averageSentencesPerParagraph, 2),
    readingTimeSeconds,
    speakingTimeSeconds,
    fleschReadingEase: round(fleschReadingEase, 2),
    fleschKincaidGrade: round(fleschKincaidGrade, 2),
    readingDifficulty,
    syllables,
  };
}

function round(value: number, decimals: number): number {
  if (!Number.isFinite(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 60) return "Less than 1 min";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}
