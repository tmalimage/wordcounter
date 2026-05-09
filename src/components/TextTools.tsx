"use client";

import {
  removeEmptyLines,
  removeExtraSpaces,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toUpperCase,
  trimEdges,
} from "@/lib/textTools";

type Props = {
  text: string;
  onChange: (text: string) => void;
};

const TRANSFORMS: { label: string; fn: (s: string) => string }[] = [
  { label: "UPPERCASE", fn: toUpperCase },
  { label: "lowercase", fn: toLowerCase },
  { label: "Title Case", fn: toTitleCase },
  { label: "Sentence case", fn: toSentenceCase },
  { label: "Remove extra spaces", fn: removeExtraSpaces },
  { label: "Remove empty lines", fn: removeEmptyLines },
  { label: "Trim line edges", fn: trimEdges },
];

export function TextTools({ text, onChange }: Props) {
  return (
    <section
      aria-labelledby="tools-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <h2 id="tools-heading" className="text-base font-semibold mb-3">
        Text tools
      </h2>
      <div className="flex flex-wrap gap-2">
        {TRANSFORMS.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => onChange(t.fn(text))}
            disabled={!text}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}
