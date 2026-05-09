"use client";

import type { TextStats } from "@/types/textStats";

type Props = { stats: TextStats };

const DIFFICULTY_COLOR: Record<string, string> = {
  "Very Easy": "bg-emerald-500",
  Easy: "bg-green-500",
  Standard: "bg-blue-500",
  Difficult: "bg-amber-500",
  "Very Difficult": "bg-red-500",
  "N/A": "bg-gray-400",
};

export function ReadabilityPanel({ stats }: Props) {
  const color = DIFFICULTY_COLOR[stats.readingDifficulty] ?? "bg-gray-400";

  return (
    <section
      aria-labelledby="readability-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <h2 id="readability-heading" className="text-base font-semibold mb-3">
        Readability
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs uppercase tracking-wide text-muted">
            Avg words / sentence
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {stats.averageWordsPerSentence}
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs uppercase tracking-wide text-muted">
            Avg chars / word
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {stats.averageCharactersPerWord}
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs uppercase tracking-wide text-muted">
            Avg sentences / paragraph
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {stats.averageSentencesPerParagraph}
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs uppercase tracking-wide text-muted">
            Flesch Reading Ease
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {stats.fleschReadingEase}
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs uppercase tracking-wide text-muted">
            Flesch-Kincaid Grade
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {stats.fleschKincaidGrade}
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-xs uppercase tracking-wide text-muted">
            Difficulty
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span
              aria-hidden
              className={`inline-block h-2.5 w-2.5 rounded-full ${color}`}
            />
            <span className="text-base font-semibold">
              {stats.readingDifficulty}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
