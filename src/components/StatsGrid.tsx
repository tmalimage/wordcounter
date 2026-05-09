"use client";

import type { TextStats } from "@/types/textStats";
import { formatDuration } from "@/lib/textStats";

type StatsGridProps = {
  stats: TextStats;
  readingWpm: number;
  speakingWpm: number;
  onReadingWpmChange: (value: number) => void;
  onSpeakingWpmChange: (value: number) => void;
  readingOptions: readonly number[];
  speakingOptions: readonly number[];
};

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
      {hint ? <div className="text-xs text-muted mt-1">{hint}</div> : null}
    </div>
  );
}

export function StatsGrid({
  stats,
  readingWpm,
  speakingWpm,
  onReadingWpmChange,
  onSpeakingWpmChange,
  readingOptions,
  speakingOptions,
}: StatsGridProps) {
  return (
    <section
      aria-labelledby="stats-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <h2 id="stats-heading" className="text-base font-semibold mb-3">
        Statistics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Words" value={stats.words.toLocaleString()} />
        <StatCard
          label="Characters"
          value={stats.charactersWithSpaces.toLocaleString()}
          hint="with spaces"
        />
        <StatCard
          label="Characters"
          value={stats.charactersWithoutSpaces.toLocaleString()}
          hint="no spaces"
        />
        <StatCard label="Sentences" value={stats.sentences.toLocaleString()} />
        <StatCard label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
        <StatCard label="Lines" value={stats.lines.toLocaleString()} />
        <StatCard label="Unique words" value={stats.uniqueWords.toLocaleString()} />
        <StatCard label="Letters" value={stats.letters.toLocaleString()} />
        <StatCard label="Digits" value={stats.numbers.toLocaleString()} />
        <StatCard label="Symbols" value={stats.symbols.toLocaleString()} />
        <StatCard label="Whitespace" value={stats.whitespaces.toLocaleString()} />
        <StatCard label="Syllables" value={stats.syllables.toLocaleString()} />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs uppercase tracking-wide text-muted">
              Reading time
            </div>
            <select
              aria-label="Reading speed (words per minute)"
              value={readingWpm}
              onChange={(e) => onReadingWpmChange(Number(e.target.value))}
              className="select-input"
            >
              {readingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} wpm
                </option>
              ))}
            </select>
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {formatDuration(stats.readingTimeSeconds)}
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs uppercase tracking-wide text-muted">
              Speaking time
            </div>
            <select
              aria-label="Speaking speed (words per minute)"
              value={speakingWpm}
              onChange={(e) => onSpeakingWpmChange(Number(e.target.value))}
              className="select-input"
            >
              {speakingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} wpm
                </option>
              ))}
            </select>
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {formatDuration(stats.speakingTimeSeconds)}
          </div>
        </div>
      </div>
    </section>
  );
}
