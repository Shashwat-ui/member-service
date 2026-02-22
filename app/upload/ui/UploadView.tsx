"use client";

import * as React from "react";
import toast from "react-hot-toast";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Download,
  Eye,
  FileDown,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  SlidersHorizontal,
  UploadCloud,
} from "lucide-react";
import type { ModuleKey } from "../../_components/ModuleModal";

type SidebarItem = {
  key: string;
  title: string;
};

type SubmissionStatus = "Pending" | "Processing" | "Approved" | "Rejected";

type RecentSubmission = {
  fileName: string;
  submittedAt: string;
  status: SubmissionStatus;
};

const RECENT: RecentSubmission[] = [
  {
    fileName: "Participant_Data_02.csv",
    submittedAt: "Apr 18, 2026",
    status: "Approved",
  },
  {
    fileName: "Billing_Info_03.zip",
    submittedAt: "Apr 18, 2026",
    status: "Processing",
  },
  {
    fileName: "QI_Report_2026.xlsx",
    submittedAt: "Apr 17, 2026",
    status: "Pending",
  },
  {
    fileName: "Attachments_Package_01.zip",
    submittedAt: "Apr 16, 2026",
    status: "Rejected",
  },
];

function statusPill(status: SubmissionStatus) {
  switch (status) {
    case "Approved":
      return "bg-accent/25 text-slate-900 dark:text-white border-accent/35";
    case "Processing":
      return "bg-white/35 text-slate-900 dark:text-white border-accent/25 dark:bg-black/20";
    case "Pending":
      return "bg-white/35 text-slate-900 dark:text-white border-accent/25 dark:bg-black/20";
    case "Rejected":
      return "bg-white/35 text-slate-900 dark:text-white border-accent/25 dark:bg-black/20";
    default:
      return "bg-white/35 text-slate-900 dark:text-white border-accent/25 dark:bg-black/20";
  }
}

export function UploadView({
  sidebarItems,
  onOpenModule,
}: {
  sidebarItems: Array<{ key: string; title: string }>;
  onOpenModule?: (key: ModuleKey) => void;
}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [active, setActive] = React.useState("upload");

  const items: SidebarItem[] = sidebarItems.map((s) => ({
    key: s.key,
    title: s.title,
  }));

  function onSidebarClick(key: string) {
    if (key === "reports" || key === "resources" || key === "faq") {
      onOpenModule?.(key);
      toast(`${key[0].toUpperCase()}${key.slice(1)} opened.`, { icon: "✦" });
      return;
    }

    setActive(key);
  }

  function itemIcon(key: string) {
    switch (key) {
      case "upload":
        return UploadCloud;
      case "reports":
        return BarChart3;
      case "resources":
        return BookOpen;
      case "faq":
        return HelpCircle;
      default:
        return UploadCloud;
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      <aside
        className={
          "ms-glass shadow-glow rounded-[28px] border border-accent/25 p-4 transition-all " +
          (collapsed ? "lg:w-[86px]" : "lg:w-[280px]")
        }
      >
        <div className="flex items-center justify-between gap-3 px-2 py-2">
          <div className={"min-w-0 " + (collapsed ? "opacity-0" : "opacity-100")}>
            <div className="text-xs font-semibold  text-slate-600 dark:text-slate-400">
              MODULES
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-white/35 text-slate-900 transition hover:bg-accent/15 dark:bg-black/20 dark:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {items.map((it) => {
            const isActive = it.key === active;
            const isModal = it.key === "reports" || it.key === "resources" || it.key === "faq";
            const Icon = itemIcon(it.key);

            return (
              <button
                key={it.key}
                type="button"
                onClick={() => onSidebarClick(it.key)}
                className={
                  "group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition " +
                  (isActive
                    ? "border-accent/45 bg-accent/20 shadow-glow"
                    : "border-accent/20 bg-white/25 hover:bg-accent/10 dark:bg-black/15")
                }
              >
                <div
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-bold transition " +
                    (isActive
                      ? "border-accent/55 bg-accent/25 text-slate-900 dark:text-white"
                      : "border-accent/20 bg-white/20 text-slate-700 dark:bg-black/20 dark:text-slate-200")
                  }
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className={"min-w-0 flex-1 " + (collapsed ? "hidden" : "block")}>
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {it.title}
                  </div>
                  <div className="truncate text-xs text-slate-600 dark:text-slate-300">
                    {it.key === "upload"
                      ? "Member data submission"
                      : isModal
                        ? "Opens neo-modal"
                        : "Portal section"}
                  </div>
                </div>
                <ChevronRight
                  className={
                    "h-5 w-5 flex-none text-slate-600 transition dark:text-slate-300 " +
                    (collapsed ? "hidden" : "block")
                  }
                />
              </button>
            );
          })}
        </div>

        <div
          className={
            "mt-6 rounded-2xl border border-accent/20 bg-white/25 p-4 dark:bg-black/15 " +
            (collapsed ? "hidden" : "block")
          }
        >
          <div className="text-xs font-semibold  text-slate-600 dark:text-slate-400">
            QUICK STATUS
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Pending", value: "3" },
              { label: "Approved", value: "12" },
              { label: "Rejected", value: "1" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-accent/20 bg-white/30 px-3 py-3 dark:bg-black/20"
              >
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {m.value}
                </div>
                <div className="text-[9px] font-semibold  text-slate-600 dark:text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="ms-glass shadow-glow rounded-[28px] border border-accent/25 px-6 py-7 sm:px-8 sm:py-9">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold  text-slate-900 dark:text-slate-400">
            MEMBER DATA SUBMISSION PORTAL
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-600 dark:text-white">
                Upload Data Files
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Submit PHI and non-PHI datasets with an accent-first, glass
                interface. This view is UI-only — no backend upload yet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast("Upload is UI-only for now.", { icon: "⇪" })}
              className="rounded-2xl border border-accent/40 bg-accent/20 px-5 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/30 dark:text-white hidden"
            >
              <span className="inline-flexitems-center gap-2 hidden">
                <UploadCloud className="h-4 w-4" />
                Upload Files
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[26px] border border-accent/25 bg-white/30 p-6 dark:bg-black/20">
              <div className="text-xs font-semibold  text-slate-600 dark:text-slate-400">
                DROP ZONE
              </div>
              <div className="mt-4 rounded-[22px] border border-accent/25 bg-white/40 p-6 text-center dark:bg-black/25">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/25 text-slate-900 dark:text-white">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <div className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  Drag & Drop files here
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  or <span className="font-semibold underline decoration-accent/60 underline-offset-4">browse</span>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {["CSV, XLSX", "ZIP Packages", "Encrypted PHI"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-accent/20 bg-white/35 px-4 py-3 text-xs font-semibold tracking-[0.2em] text-slate-700 dark:bg-black/20 dark:text-slate-200"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-accent/25 bg-white/30 p-6 dark:bg-black/20">
              <div className="text-xs font-semibold  text-slate-600 dark:text-slate-400">
                SUBMISSION DETAILS
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="datasetType"
                    className="text-[11px] font-semibold  text-slate-600 dark:text-slate-400"
                  >
                    DATASET TYPE
                  </label>
                  <select
                    id="datasetType"
                    className="ms-glass w-full rounded-2xl px-4 py-3 text-sm text-slate-900 outline-none dark:text-white"
                  >
                    <option>Select dataset</option>
                    <option>Member Enrollment</option>
                    <option>Claims</option>
                    <option>Eligibility</option>
                    <option>Provider Directory</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="submissionMode"
                    className="text-[11px] font-semibold  text-slate-600 dark:text-slate-400"
                  >
                    SUBMISSION MODE
                  </label>
                  <select
                    id="submissionMode"
                    className="ms-glass w-full rounded-2xl px-4 py-3 text-sm text-slate-900 outline-none dark:text-white"
                  >
                    <option>Standard</option>
                    <option>High Priority</option>
                    <option>Retry (Resubmission)</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    SUBMISSION NOTES (OPTIONAL)
                  </label>
                  <textarea
                    rows={4}
                    className="ms-glass w-full resize-none rounded-2xl px-4 py-3 text-sm text-slate-900 outline-none dark:text-white"
                    placeholder="Enter any comments or instructions…"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[26px] border border-accent/25 bg-white/30 p-6 dark:bg-black/20">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                SUBMISSION STATUS
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  { label: "Pending Review", value: "3 files" },
                  { label: "Approved", value: "12 files" },
                  { label: "Rejected", value: "1 file" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-2xl border border-accent/20 bg-white/35 px-4 py-4 dark:bg-black/20"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {s.label}
                    </div>
                    <div className="rounded-full border border-accent/25 bg-accent/20 px-3 py-1 text-xs font-semibold text-slate-900 dark:text-white">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-accent/25 bg-white/30 p-6 dark:bg-black/20">
              <div className="text-xs font-semibold  text-slate-600 dark:text-slate-400">
                QUICK REPORT OVERVIEW
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { label: "Uploads Today", value: "04" },
                  { label: "Success Rate", value: "96%" },
                  { label: "Avg. Review", value: "2h" },
                  { label: "Queue Depth", value: "07" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className="rounded-2xl border border-accent/20 bg-white/35 px-4 py-4 dark:bg-black/20"
                  >
                    <div className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      {k.value}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[26px] border border-accent/25 bg-white/30 p-6 dark:bg-black/20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                RECENT SUBMISSIONS
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                A modern, card-like table optimized for scanning.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-2xl border border-accent/25 bg-white/35 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-accent/10 dark:bg-black/20 dark:text-slate-100"
                onClick={() => toast("Filters are UI-only for now.", { icon: "⛭" })}
              >
                <span className="inline-flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </span>
              </button>
              <button
                type="button"
                className="rounded-2xl border border-accent/40 bg-accent/20 px-4 py-2 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/30 dark:text-white"
                onClick={() => toast("Export is UI-only for now.", { icon: "⎙" })}
              >
                <span className="inline-flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  Export
                </span>
              </button>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-[22px] border border-accent/20">
            <div className="grid grid-cols-1 bg-white/35 px-5 py-4 text-[11px] font-semibold  text-slate-600 dark:bg-black/20 dark:text-slate-400 sm:grid-cols-[1.4fr_0.7fr_0.6fr_0.5fr]">
              <div>FILE NAME</div>
              <div className="mt-2 sm:mt-0">SUBMITTED</div>
              <div className="mt-2 sm:mt-0">STATUS</div>
              <div className="mt-2 text-right sm:mt-0">ACTIONS</div>
            </div>

            <div className="divide-y divide-accent/20 bg-white/25 dark:bg-black/10">
              {RECENT.map((r) => (
                <div
                  key={r.fileName}
                  className="grid grid-cols-1 gap-3 px-5 py-4 transition hover:bg-accent/10 sm:grid-cols-[1.4fr_0.7fr_0.6fr_0.5fr] sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {r.fileName}
                    </div>
                    <div className="mt-1 truncate text-xs text-slate-600 dark:text-slate-300">
                      Member secure submission package
                    </div>
                  </div>

                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {r.submittedAt}
                  </div>

                  <div>
                    <span
                      className={
                        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold " +
                        statusPill(r.status)
                      }
                    >
                      {r.status}
                    </span>
                  </div>

                  <div className="flex justify-end gap-3 text-sm font-semibold">
                    <button
                      type="button"
                      className="rounded-xl border border-accent/20 bg-white/30 px-3 py-2 text-slate-800 transition hover:bg-accent/10 dark:bg-black/15 dark:text-slate-100"
                      onClick={() => toast("View is UI-only for now.", { icon: "▣" })}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </span>
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-accent/35 bg-accent/18 px-3 py-2 text-slate-900 transition hover:bg-accent/28 dark:text-white"
                      onClick={() => toast("Download is UI-only for now.", { icon: "↓" })}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
