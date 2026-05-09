import type { PlatformLimit } from "@/types/textStats";

export const SITE_URL = "https://wordcounter-sandy-pi.vercel.app";
export const SITE_NAME = "Free Word Counter";

export const DEFAULT_READING_WPM = 200;
export const DEFAULT_SPEAKING_WPM = 130;

export const READING_WPM_OPTIONS = [150, 200, 250, 300] as const;
export const SPEAKING_WPM_OPTIONS = [100, 130, 160] as const;

export const STOP_WORDS = new Set<string>([
  "the", "is", "and", "a", "an", "to", "of", "in", "for", "on",
  "with", "as", "by", "at", "from", "this", "that", "it", "be",
  "are", "was", "were", "or", "but", "not", "have", "has", "had",
  "do", "does", "did", "will", "would", "could", "should", "may",
  "might", "can", "i", "you", "he", "she", "we", "they", "them",
  "his", "her", "their", "our", "my", "your", "its", "if", "so",
  "than", "then", "there", "here", "what", "which", "who", "whom",
  "how", "when", "where", "why", "all", "any", "some", "no", "nor",
  "too", "very", "just", "only", "own", "same", "such", "into",
  "about", "after", "before", "between", "out", "up", "down", "off",
]);

export const DEFAULT_PLATFORM_LIMITS: PlatformLimit[] = [
  { id: "twitter", label: "X / Twitter post", maxCharacters: 280 },
  { id: "meta", label: "Meta description", maxCharacters: 160 },
  { id: "instagram", label: "Instagram caption", maxCharacters: 2200 },
  { id: "youtube-title", label: "YouTube title", maxCharacters: 100 },
  { id: "youtube-desc", label: "YouTube description", maxCharacters: 5000 },
  { id: "linkedin", label: "LinkedIn post", maxCharacters: 3000 },
  { id: "sms", label: "SMS message", maxCharacters: 160 },
];

export const STORAGE_KEYS = {
  draft: "wc_draft_text",
  readingWpm: "wc_reading_wpm",
  speakingWpm: "wc_speaking_wpm",
  removeStopWords: "wc_remove_stop_words",
  keywordMaxResults: "wc_keyword_max_results",
  ngramSize: "wc_ngram_size",
  minWordLength: "wc_min_word_length",
  writingGoal: "wc_writing_goal",
  customLimits: "wc_custom_limits",
  theme: "wc_theme",
} as const;

export const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.

Writing well requires practice, patience, and persistence. Whether you're crafting a blog post, drafting an essay, or composing a social media update, knowing your word count and reading time helps you communicate effectively.

A good word counter does more than just tally letters. It tells you how readable your text is, which keywords appear most often, and whether your message fits the platform you're targeting. Use this tool to refine your writing, hit your length goals, and ship clearer copy.`;
