import type { KeywordDensityItem, TextStats } from "@/types/textStats";

export function downloadFile(
  filename: string,
  content: string,
  mimeType: string
): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadTextFile(text: string, filename = "text.txt"): void {
  downloadFile(filename, text, "text/plain;charset=utf-8");
}

export function buildStatsExport(
  stats: TextStats,
  keywords: KeywordDensityItem[]
): {
  generatedAt: string;
  stats: TextStats;
  topKeywords: KeywordDensityItem[];
} {
  return {
    generatedAt: new Date().toISOString(),
    stats,
    topKeywords: keywords,
  };
}

export function downloadStatsJson(
  stats: TextStats,
  keywords: KeywordDensityItem[],
  filename = "wordcounter-stats.json"
): void {
  const data = buildStatsExport(stats, keywords);
  downloadFile(filename, JSON.stringify(data, null, 2), "application/json");
}

function escapeCsv(value: string | number): string {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function downloadStatsCsv(
  stats: TextStats,
  keywords: KeywordDensityItem[],
  filename = "wordcounter-stats.csv"
): void {
  const rows: string[] = [];
  rows.push("metric,value");
  rows.push(`generated_at,${escapeCsv(new Date().toISOString())}`);
  for (const [k, v] of Object.entries(stats)) {
    rows.push(`${escapeCsv(k)},${escapeCsv(v as string | number)}`);
  }
  rows.push("");
  rows.push("keyword,count,density");
  for (const kw of keywords) {
    rows.push(
      `${escapeCsv(kw.keyword)},${escapeCsv(kw.count)},${escapeCsv(kw.density)}`
    );
  }
  downloadFile(filename, rows.join("\n"), "text/csv;charset=utf-8");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function readFromClipboard(): Promise<string | null> {
  if (typeof navigator === "undefined" || !navigator.clipboard) return null;
  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}
