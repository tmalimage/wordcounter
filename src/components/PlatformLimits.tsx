"use client";

import { useState } from "react";
import type { PlatformLimit } from "@/types/textStats";

type Props = {
  characterCount: number;
  limits: PlatformLimit[];
  onAddCustom: (label: string, max: number) => void;
  onRemoveCustom: (id: string) => void;
};

type Status = "OK" | "Near limit" | "Exceeded";

function getStatus(count: number, max: number): Status {
  const pct = (count / max) * 100;
  if (pct > 100) return "Exceeded";
  if (pct >= 80) return "Near limit";
  return "OK";
}

const STATUS_BADGE: Record<Status, string> = {
  OK: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "Near limit": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Exceeded: "bg-red-500/15 text-red-700 dark:text-red-400",
};

const BAR_COLOR: Record<Status, string> = {
  OK: "bg-emerald-500",
  "Near limit": "bg-amber-500",
  Exceeded: "bg-red-500",
};

export function PlatformLimits({
  characterCount,
  limits,
  onAddCustom,
  onRemoveCustom,
}: Props) {
  const [label, setLabel] = useState("");
  const [max, setMax] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(max);
    if (!label.trim() || !Number.isFinite(n) || n <= 0) return;
    onAddCustom(label.trim(), Math.floor(n));
    setLabel("");
    setMax("");
  }

  return (
    <section
      aria-labelledby="limits-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <h2 id="limits-heading" className="text-base font-semibold mb-3">
        Platform limits
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {limits.map((limit) => {
          const status = getStatus(characterCount, limit.maxCharacters);
          const remaining = limit.maxCharacters - characterCount;
          const pct = Math.min(
            100,
            (characterCount / limit.maxCharacters) * 100
          );
          return (
            <div
              key={limit.id}
              className="rounded-lg border border-border p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-sm flex items-center gap-2">
                  <span>{limit.label}</span>
                  {limit.custom ? (
                    <button
                      type="button"
                      onClick={() => onRemoveCustom(limit.id)}
                      aria-label={`Remove ${limit.label}`}
                      className="text-xs text-muted hover:text-red-500"
                    >
                      ✕
                    </button>
                  ) : null}
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${STATUS_BADGE[status]}`}
                >
                  {status}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted tabular-nums">
                {characterCount.toLocaleString()} /{" "}
                {limit.maxCharacters.toLocaleString()}{" "}
                <span className={remaining < 0 ? "text-red-500" : ""}>
                  ({remaining >= 0 ? `${remaining} left` : `${Math.abs(remaining)} over`})
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={limit.maxCharacters}
                aria-valuenow={characterCount}
                aria-label={`${limit.label} usage`}
                className="mt-2 h-2 rounded-full bg-accent overflow-hidden"
              >
                <div
                  className={`h-full ${BAR_COLOR[status]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleAdd} className="mt-4 flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs text-muted block mb-1" htmlFor="limit-label">
            Custom label
          </label>
          <input
            id="limit-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="My platform"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-32">
          <label className="text-xs text-muted block mb-1" htmlFor="limit-max">
            Max chars
          </label>
          <input
            id="limit-max"
            type="number"
            min="1"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="500"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="btn-primary">
          Add limit
        </button>
      </form>
    </section>
  );
}
