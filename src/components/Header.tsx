"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { getFromStorage, saveToStorage } from "@/lib/localStorage";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = getFromStorage<"light" | "dark" | null>(
      STORAGE_KEYS.theme,
      null
    );
    const initial: "light" | "dark" =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    saveToStorage(STORAGE_KEYS.theme, next);
  }

  return (
    <header className="border-b border-border bg-card/40 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white text-sm font-bold">
            W
          </span>
          <span>WordCounter</span>
        </Link>
        <nav className="flex items-center gap-3">
          <a
            href="#faq"
            className="text-sm text-muted hover:text-foreground hidden sm:inline"
          >
            FAQ
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent transition"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </nav>
      </div>
    </header>
  );
}
