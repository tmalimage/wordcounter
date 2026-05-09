"use client";

import type { KeywordDensityItem } from "@/types/textStats";

type Props = {
  items: KeywordDensityItem[];
  ngramSize: 1 | 2 | 3;
  removeStopWords: boolean;
  maxResults: number;
  minWordLength: number;
  onNgramSizeChange: (n: 1 | 2 | 3) => void;
  onRemoveStopWordsChange: (v: boolean) => void;
  onMaxResultsChange: (n: number) => void;
  onMinWordLengthChange: (n: number) => void;
};

export function KeywordDensityTable({
  items,
  ngramSize,
  removeStopWords,
  maxResults,
  minWordLength,
  onNgramSizeChange,
  onRemoveStopWordsChange,
  onMaxResultsChange,
  onMinWordLengthChange,
}: Props) {
  const max = items[0]?.count ?? 0;

  return (
    <section
      aria-labelledby="keyword-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h2 id="keyword-heading" className="text-base font-semibold">
          Keyword density
        </h2>
        <div className="flex flex-wrap gap-2 items-center">
          <label className="text-xs flex items-center gap-1">
            <span>Phrase</span>
            <select
              aria-label="N-gram size"
              value={ngramSize}
              onChange={(e) =>
                onNgramSizeChange(Number(e.target.value) as 1 | 2 | 3)
              }
              className="select-input"
            >
              <option value={1}>1 word</option>
              <option value={2}>2 words</option>
              <option value={3}>3 words</option>
            </select>
          </label>
          <label className="text-xs flex items-center gap-1">
            <span>Min length</span>
            <select
              aria-label="Minimum word length"
              value={minWordLength}
              onChange={(e) => onMinWordLengthChange(Number(e.target.value))}
              className="select-input"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
          <label className="text-xs flex items-center gap-1">
            <span>Show</span>
            <select
              aria-label="Max results"
              value={maxResults}
              onChange={(e) => onMaxResultsChange(Number(e.target.value))}
              className="select-input"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
          <label className="text-xs flex items-center gap-1 select-none">
            <input
              type="checkbox"
              checked={removeStopWords}
              onChange={(e) => onRemoveStopWordsChange(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <span>Hide stop words</span>
          </label>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted py-6 text-center">
          Add some text to see keyword density.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted border-b border-border">
                <th className="py-2 pr-2 font-medium">Keyword</th>
                <th className="py-2 px-2 font-medium tabular-nums">Count</th>
                <th className="py-2 px-2 font-medium tabular-nums">Density</th>
                <th className="py-2 pl-2 font-medium w-1/3">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const pct = max > 0 ? (it.count / max) * 100 : 0;
                return (
                  <tr key={it.keyword} className="border-b border-border/50">
                    <td className="py-2 pr-2 font-medium break-all">
                      {it.keyword}
                    </td>
                    <td className="py-2 px-2 tabular-nums">{it.count}</td>
                    <td className="py-2 px-2 tabular-nums">{it.density}%</td>
                    <td className="py-2 pl-2">
                      <div className="h-2 rounded-full bg-accent overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${pct}%` }}
                          aria-hidden
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
