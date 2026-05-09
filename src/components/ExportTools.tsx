"use client";

import type { KeywordDensityItem, TextStats } from "@/types/textStats";
import {
  downloadStatsCsv,
  downloadStatsJson,
  downloadTextFile,
} from "@/lib/exportUtils";

type Props = {
  text: string;
  stats: TextStats;
  keywords: KeywordDensityItem[];
};

export function ExportTools({ text, stats, keywords }: Props) {
  return (
    <section
      aria-labelledby="export-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <h2 id="export-heading" className="text-base font-semibold mb-3">
        Export
      </h2>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => downloadTextFile(text)}
          disabled={!text}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download .txt
        </button>
        <button
          type="button"
          onClick={() => downloadStatsJson(stats, keywords)}
          className="btn-secondary"
        >
          Download .json
        </button>
        <button
          type="button"
          onClick={() => downloadStatsCsv(stats, keywords)}
          className="btn-secondary"
        >
          Download .csv
        </button>
      </div>
    </section>
  );
}
