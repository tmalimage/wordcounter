export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  return text.replace(/\b([a-z])([a-z]*)/gi, (_, first, rest) => {
    return first.toUpperCase() + rest.toLowerCase();
  });
}

export function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(
    /(^|[.!?]\s+|\n+)([a-z])/g,
    (_, prefix: string, ch: string) => prefix + ch.toUpperCase()
  );
}

export function removeExtraSpaces(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/[^\S\n]+/g, " ").replace(/^ | $/g, ""))
    .join("\n");
}

export function removeEmptyLines(text: string): string {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .join("\n");
}

export function trimEdges(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join("\n");
}
