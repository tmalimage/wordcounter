"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-md bg-foreground text-background px-4 py-2 text-sm shadow-lg"
    >
      {message}
    </div>
  );
}
