"use client";

import type { GoalType, WritingGoalData } from "@/types/textStats";

type Props = {
  goal: WritingGoalData | null;
  currentWords: number;
  currentCharacters: number;
  onChangeGoal: (goal: WritingGoalData | null) => void;
};

export function WritingGoal({
  goal,
  currentWords,
  currentCharacters,
  onChangeGoal,
}: Props) {
  const current =
    goal?.type === "characters" ? currentCharacters : currentWords;
  const target = goal?.target ?? 0;
  const remaining = target > 0 ? Math.max(0, target - current) : 0;
  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const reached = target > 0 && current >= target;

  function handleTypeChange(type: GoalType) {
    onChangeGoal({ type, target: goal?.target ?? 500 });
  }

  function handleTargetChange(value: string) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) return;
    onChangeGoal({ type: goal?.type ?? "words", target: Math.floor(n) });
  }

  function handleClear() {
    onChangeGoal(null);
  }

  return (
    <section
      aria-labelledby="goal-heading"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 id="goal-heading" className="text-base font-semibold">
          Writing goal
        </h2>
        {goal ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-muted hover:text-red-500"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 items-end">
        <div>
          <label className="text-xs text-muted block mb-1" htmlFor="goal-type">
            Goal type
          </label>
          <select
            id="goal-type"
            value={goal?.type ?? "words"}
            onChange={(e) => handleTypeChange(e.target.value as GoalType)}
            className="select-input"
          >
            <option value="words">Words</option>
            <option value="characters">Characters</option>
          </select>
        </div>
        <div className="flex-1 min-w-[100px]">
          <label className="text-xs text-muted block mb-1" htmlFor="goal-target">
            Target
          </label>
          <input
            id="goal-target"
            type="number"
            min="0"
            placeholder="500"
            value={goal?.target ?? ""}
            onChange={(e) => handleTargetChange(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {goal && goal.target > 0 ? (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="tabular-nums">
              {current.toLocaleString()} / {goal.target.toLocaleString()}{" "}
              {goal.type}
            </span>
            <span className="tabular-nums">
              {reached ? "Goal reached" : `${remaining.toLocaleString()} to go`}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={goal.target}
            aria-valuenow={current}
            aria-label="Writing goal progress"
            className="mt-2 h-2 rounded-full bg-accent overflow-hidden"
          >
            <div
              className={`h-full ${reached ? "bg-emerald-500" : "bg-blue-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
