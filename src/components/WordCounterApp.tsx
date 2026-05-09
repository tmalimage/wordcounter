"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TextEditor } from "@/components/TextEditor";
import { StatsGrid } from "@/components/StatsGrid";
import { ReadabilityPanel } from "@/components/ReadabilityPanel";
import { KeywordDensityTable } from "@/components/KeywordDensityTable";
import { PlatformLimits } from "@/components/PlatformLimits";
import { WritingGoal } from "@/components/WritingGoal";
import { TextTools } from "@/components/TextTools";
import { ExportTools } from "@/components/ExportTools";
import { Toast } from "@/components/Toast";
import { calculateTextStats } from "@/lib/textStats";
import { calculateKeywordDensity } from "@/lib/keywordDensity";
import { getFromStorage, saveToStorage } from "@/lib/localStorage";
import {
  copyToClipboard,
  downloadTextFile,
  readFromClipboard,
} from "@/lib/exportUtils";
import {
  DEFAULT_PLATFORM_LIMITS,
  DEFAULT_READING_WPM,
  DEFAULT_SPEAKING_WPM,
  READING_WPM_OPTIONS,
  SAMPLE_TEXT,
  SPEAKING_WPM_OPTIONS,
  STORAGE_KEYS,
} from "@/lib/constants";
import type {
  PlatformLimit,
  WritingGoalData,
} from "@/types/textStats";

export function WordCounterApp() {
  const [hydrated, setHydrated] = useState(false);
  const [text, setText] = useState("");
  const [readingWpm, setReadingWpm] = useState<number>(DEFAULT_READING_WPM);
  const [speakingWpm, setSpeakingWpm] = useState<number>(DEFAULT_SPEAKING_WPM);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [keywordMaxResults, setKeywordMaxResults] = useState(20);
  const [ngramSize, setNgramSize] = useState<1 | 2 | 3>(1);
  const [minWordLength, setMinWordLength] = useState(2);
  const [goal, setGoal] = useState<WritingGoalData | null>(null);
  const [customLimits, setCustomLimits] = useState<PlatformLimit[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setText(getFromStorage(STORAGE_KEYS.draft, ""));
    setReadingWpm(getFromStorage(STORAGE_KEYS.readingWpm, DEFAULT_READING_WPM));
    setSpeakingWpm(
      getFromStorage(STORAGE_KEYS.speakingWpm, DEFAULT_SPEAKING_WPM)
    );
    setRemoveStopWords(getFromStorage(STORAGE_KEYS.removeStopWords, false));
    setKeywordMaxResults(getFromStorage(STORAGE_KEYS.keywordMaxResults, 20));
    setNgramSize(getFromStorage<1 | 2 | 3>(STORAGE_KEYS.ngramSize, 1));
    setMinWordLength(getFromStorage(STORAGE_KEYS.minWordLength, 2));
    setGoal(getFromStorage<WritingGoalData | null>(STORAGE_KEYS.writingGoal, null));
    setCustomLimits(getFromStorage<PlatformLimit[]>(STORAGE_KEYS.customLimits, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.draft, text);
  }, [text, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.readingWpm, readingWpm);
  }, [readingWpm, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.speakingWpm, speakingWpm);
  }, [speakingWpm, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.removeStopWords, removeStopWords);
  }, [removeStopWords, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.keywordMaxResults, keywordMaxResults);
  }, [keywordMaxResults, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.ngramSize, ngramSize);
  }, [ngramSize, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.minWordLength, minWordLength);
  }, [minWordLength, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.writingGoal, goal);
  }, [goal, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage(STORAGE_KEYS.customLimits, customLimits);
  }, [customLimits, hydrated]);

  const stats = useMemo(
    () => calculateTextStats(text, { readingWpm, speakingWpm }),
    [text, readingWpm, speakingWpm]
  );

  const keywordDensity = useMemo(
    () =>
      calculateKeywordDensity(text, {
        ngramSize,
        removeStopWords,
        minWordLength,
        maxResults: keywordMaxResults,
      }),
    [text, ngramSize, removeStopWords, minWordLength, keywordMaxResults]
  );

  const allLimits = useMemo<PlatformLimit[]>(
    () => [...DEFAULT_PLATFORM_LIMITS, ...customLimits],
    [customLimits]
  );

  const handleCopy = useCallback(async () => {
    if (!text) {
      setToast("Nothing to copy");
      return;
    }
    const ok = await copyToClipboard(text);
    setToast(ok ? "Copied to clipboard" : "Copy failed");
  }, [text]);

  const handlePaste = useCallback(async () => {
    const pasted = await readFromClipboard();
    if (pasted == null) {
      setToast("Clipboard read not allowed");
      return;
    }
    setText(pasted);
    setToast("Pasted from clipboard");
  }, []);

  const handleDownload = useCallback(() => {
    if (!text) {
      setToast("Nothing to download");
      return;
    }
    downloadTextFile(text);
    setToast("Downloaded text file");
  }, [text]);

  function handleClear() {
    setText("");
  }

  function handleLoadSample() {
    setText(SAMPLE_TEXT);
  }

  function handleAddCustomLimit(label: string, max: number) {
    const id = `custom-${Date.now()}`;
    setCustomLimits((prev) => [...prev, { id, label, maxCharacters: max, custom: true }]);
  }

  function handleRemoveCustomLimit(id: string) {
    setCustomLimits((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <TextEditor
            value={text}
            onChange={setText}
            onClear={handleClear}
            onCopy={handleCopy}
            onPaste={handlePaste}
            onDownload={handleDownload}
            onLoadSample={handleLoadSample}
          />
          <TextTools text={text} onChange={setText} />
          <ExportTools text={text} stats={stats} keywords={keywordDensity} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <StatsGrid
            stats={stats}
            readingWpm={readingWpm}
            speakingWpm={speakingWpm}
            onReadingWpmChange={setReadingWpm}
            onSpeakingWpmChange={setSpeakingWpm}
            readingOptions={READING_WPM_OPTIONS}
            speakingOptions={SPEAKING_WPM_OPTIONS}
          />
          <WritingGoal
            goal={goal}
            currentWords={stats.words}
            currentCharacters={stats.charactersWithSpaces}
            onChangeGoal={setGoal}
          />
        </div>
      </div>

      <ReadabilityPanel stats={stats} />

      <KeywordDensityTable
        items={keywordDensity}
        ngramSize={ngramSize}
        removeStopWords={removeStopWords}
        maxResults={keywordMaxResults}
        minWordLength={minWordLength}
        onNgramSizeChange={setNgramSize}
        onRemoveStopWordsChange={setRemoveStopWords}
        onMaxResultsChange={setKeywordMaxResults}
        onMinWordLengthChange={setMinWordLength}
      />

      <PlatformLimits
        characterCount={stats.charactersWithSpaces}
        limits={allLimits}
        onAddCustom={handleAddCustomLimit}
        onRemoveCustom={handleRemoveCustomLimit}
      />

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
