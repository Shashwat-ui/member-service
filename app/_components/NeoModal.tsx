"use client";

import * as React from "react";
import { X } from "lucide-react";
import { LogoMark } from "./icons";

export function NeoModal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-[4px]"
        onMouseDown={onClose}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
        <div
          className="relative w-full overflow-hidden rounded-[34px] border border-accent/35 bg-white/70 shadow-glow backdrop-blur-2xl dark:bg-black/45"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/35 blur-3xl" />
            <div className="absolute -right-20 -top-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(216,191,216,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(216,191,216,0.18)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_72%)]" />
          </div>

          <div className="relative border-b border-accent/25 bg-accent/15 px-7 py-6 sm:px-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/35 bg-white/40 text-accent dark:bg-black/30">
                  <LogoMark className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-300">
                    {/* MODULE */}
                  </div>
                  <div
                    id={titleId}
                    className="mt-1 truncate text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
                  >
                    {title}
                  </div>
                  {subtitle ? (
                    <div className="mt-1 max-w-3xl text-sm text-slate-700 dark:text-slate-200">
                      {subtitle}
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-2xl border border-accent/30 bg-white/40 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-accent/10 dark:bg-black/25 dark:text-white"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </div>

          <div className="relative max-h-[78vh] overflow-auto px-7 py-7 sm:px-10 sm:py-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
