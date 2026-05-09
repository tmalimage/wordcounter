export function countSyllables(word: string): number {
  if (!word) return 0;
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;

  let working = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  working = working.replace(/^y/, "");

  const matches = working.match(/[aeiouy]+/g);
  const count = matches ? matches.length : 0;
  return count > 0 ? count : 1;
}

export function calculateFleschReadingEase(
  words: number,
  sentences: number,
  syllables: number
): number {
  if (words === 0 || sentences === 0) return 0;
  const score =
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return score;
}

export function calculateFleschKincaidGrade(
  words: number,
  sentences: number,
  syllables: number
): number {
  if (words === 0 || sentences === 0) return 0;
  const grade =
    0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  return grade;
}

export function getReadingDifficulty(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 60) return "Standard";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}
