import type { KeywordDensityItem, KeywordDensityOptions } from "@/types/textStats";
import { STOP_WORDS } from "@/lib/constants";

const TOKEN_REGEX = /[a-z0-9]+(?:['-][a-z0-9]+)*/gi;

function tokenize(text: string): string[] {
  if (!text) return [];
  return text.toLowerCase().match(TOKEN_REGEX) ?? [];
}

export function calculateKeywordDensity(
  text: string,
  options?: KeywordDensityOptions
): KeywordDensityItem[] {
  const ngramSize = options?.ngramSize ?? 1;
  const removeStopWords = options?.removeStopWords ?? false;
  const minWordLength = options?.minWordLength ?? 2;
  const maxResults = options?.maxResults ?? 20;

  const allTokens = tokenize(text);
  const totalWords = allTokens.length;
  if (totalWords === 0) return [];

  const filtered = allTokens.filter((tok) => {
    if (tok.length < minWordLength) return false;
    if (removeStopWords && STOP_WORDS.has(tok)) return false;
    return true;
  });

  const counts = new Map<string, number>();

  if (ngramSize === 1) {
    for (const tok of filtered) {
      counts.set(tok, (counts.get(tok) ?? 0) + 1);
    }
  } else {
    for (let i = 0; i <= filtered.length - ngramSize; i++) {
      const slice = filtered.slice(i, i + ngramSize);
      const phrase = slice.join(" ");
      counts.set(phrase, (counts.get(phrase) ?? 0) + 1);
    }
  }

  const items: KeywordDensityItem[] = [];
  for (const [keyword, count] of counts) {
    const density = Math.round((count / totalWords) * 100 * 100) / 100;
    items.push({ keyword, count, density });
  }

  items.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.keyword.localeCompare(b.keyword);
  });

  return items.slice(0, maxResults);
}
