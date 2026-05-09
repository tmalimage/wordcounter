"use client";

import { ChangeEvent } from "react";

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDownload: () => void;
  onLoadSample: () => void;
};

export function TextEditor({
  value,
  onChange,
  onClear,
  onCopy,
  onPaste,
  onDownload,
  onLoadSample,
}: TextEditorProps) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  return (
    <section
      aria-labelledby="editor-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 id="editor-heading" className="text-base font-semibold">
          Your text
        </h2>
        <span className="text-xs text-muted">
          Processed locally in your browser
        </span>
      </div>
      <label htmlFor="text-input" className="sr-only">
        Text to analyze
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={handleChange}
        spellCheck
        placeholder="Type or paste your text here..."
        className="w-full min-h-[280px] sm:min-h-[360px] resize-y rounded-lg border border-border bg-background p-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={onClear} className="btn-secondary">
          Clear text
        </button>
        <button type="button" onClick={onCopy} className="btn-secondary">
          Copy text
        </button>
        <button type="button" onClick={onPaste} className="btn-secondary">
          Paste from clipboard
        </button>
        <button type="button" onClick={onDownload} className="btn-secondary">
          Download .txt
        </button>
        <button type="button" onClick={onLoadSample} className="btn-secondary">
          Load sample
        </button>
      </div>
    </section>
  );
}
