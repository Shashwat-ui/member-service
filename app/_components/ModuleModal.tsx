"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { NeoModal } from "./NeoModal";

export type ModuleKey = "reports" | "resources" | "faq";

export function ModuleModal({
  open,
  moduleKey,
  onClose,
}: {
  open: boolean;
  moduleKey: ModuleKey;
  onClose: () => void;
}) {
  const title =
    moduleKey === "reports"
      ? "Reports"
      : moduleKey === "resources"
        ? "Resources"
        : "FAQ";

  const subtitle =
    moduleKey === "reports"
      ? "A glass-dash view of exports, metrics, and timelines"
      : moduleKey === "resources"
        ? "Reference library for formats, policies, and templates"
        : "Quick answers, optimized for audit-speed workflows";

  return (
    <NeoModal open={open} onClose={onClose} title={title} subtitle={subtitle}>
      {moduleKey === "reports" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
            <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
              KPI SNAPSHOT
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Exports", value: "18" },
                { label: "Success", value: "96%" },
                { label: "Latency", value: "1.7s" },
                { label: "Errors", value: "02" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl border border-accent/20 bg-white/35 px-4 py-4 dark:bg-black/20"
                >
                  <div className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {k.value}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-slate-600 dark:text-slate-400">
                    {k.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[22px] border border-accent/20 bg-white/30 p-5 dark:bg-black/15">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                RECENT EXPORTS
              </div>
              <div className="mt-4 space-y-3">
                {[
                  {
                    name: "Submission Summary — Weekly",
                    time: "Generated 11m ago",
                    tag: "PDF",
                  },
                  {
                    name: "PHI Audit Trail — Q1",
                    time: "Generated 2h ago",
                    tag: "CSV",
                  },
                  {
                    name: "Upload Throughput — 30 days",
                    time: "Generated yesterday",
                    tag: "XLSX",
                  },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-white/35 px-4 py-4 dark:bg-black/20"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {r.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {r.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-accent/25 bg-accent/20 px-3 py-1 text-xs font-semibold text-slate-900 dark:text-white">
                        {r.tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => toast("Export download is UI-only.", { icon: "↓" })}
                        className="rounded-2xl border border-accent/30 bg-white/40 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-accent/10 dark:bg-black/20 dark:text-white"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                TIMELINE
              </div>
              <div className="mt-5 space-y-3">
                {[
                  {
                    step: "Ingest",
                    note: "Files validated + normalized",
                    at: "00:00 — 00:02",
                  },
                  {
                    step: "Encrypt",
                    note: "Secure envelope applied",
                    at: "00:02 — 00:03",
                  },
                  {
                    step: "Review",
                    note: "Rules + sampling checks",
                    at: "00:03 — 00:19",
                  },
                  {
                    step: "Archive",
                    note: "Immutable log recorded",
                    at: "00:19 — 00:20",
                  },
                ].map((t) => (
                  <div
                    key={t.step}
                    className="rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 dark:bg-black/15"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t.step}
                      </div>
                      <div className="text-xs font-semibold tracking-[0.2em] text-slate-600 dark:text-slate-400">
                        {t.at}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {t.note}
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-accent/15">
                      <div className="h-full w-2/3 rounded-full bg-accent/40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                ACTIONS
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["Generate Report", "Schedule Export", "Share Link", "Open Audit Trail"].map(
                  (a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toast(`${a} is UI-only for now.`, { icon: "✦" })}
                      className="rounded-2xl border border-accent/35 bg-accent/20 px-4 py-4 text-left text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/30 dark:text-white"
                    >
                      {a}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {moduleKey === "resources" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
            <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
              FORMAT GUIDES
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  title: "Member Enrollment — CSV Schema",
                  note: "Columns, validation rules, examples",
                },
                {
                  title: "Claims — Batch ZIP Packaging",
                  note: "Folder structure + naming standard",
                },
                {
                  title: "PHI Encryption Envelope",
                  note: "Key rotation + metadata policy",
                },
                {
                  title: "Submission SLA & Retention",
                  note: "Review windows + retention tiers",
                },
              ].map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 dark:bg-black/15"
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {r.title}
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {r.note}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Open", "Download", "Copy Link"].map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toast(`${a} is UI-only for now.`, { icon: "⧉" })}
                        className="rounded-full border border-accent/25 bg-white/40 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-accent/10 dark:bg-black/20 dark:text-white"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                TEMPLATE VAULT
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {[
                  {
                    name: "Submission Notes — Standard",
                    meta: "Tone + required details",
                  },
                  {
                    name: "Issue Escalation — CAP",
                    meta: "Corrective action plan skeleton",
                  },
                  {
                    name: "Weekly Metrics — Executive",
                    meta: "Single page, KPI-forward",
                  },
                ].map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => toast("Template preview is UI-only.", { icon: "▦" })}
                    className="rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 text-left transition hover:bg-accent/10 dark:bg-black/15"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {t.meta}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                PORTAL PLAYBOOK
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "How to submit PHI safely",
                  "How review status is computed",
                  "How re-submissions are handled",
                  "How to interpret rejection reasons",
                ].map((p) => (
                  <div
                    key={p}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 dark:bg-black/15"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {p}
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Opening playbook is UI-only.", { icon: "→" })}
                      className="rounded-xl border border-accent/25 bg-accent/20 px-3 py-2 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/30 dark:text-white"
                    >
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {moduleKey === "faq" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
            <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
              TOP QUESTIONS
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  q: "What file types are accepted?",
                  a: "CSV, XLSX, and ZIP packages. PHI packages should use the encrypted envelope mode.",
                },
                {
                  q: "Why was my submission rejected?",
                  a: "Most rejections are schema mismatches, missing required columns, or invalid member identifiers.",
                },
                {
                  q: "How long does review take?",
                  a: "Typical review completes within 2 hours during business days. Priority mode can reduce queue time.",
                },
                {
                  q: "Can I resubmit the same dataset?",
                  a: "Yes. Use “Retry (Resubmission)” to preserve traceability and avoid duplicate tracking noise.",
                },
              ].map((x) => (
                <div
                  key={x.q}
                  className="rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 dark:bg-black/15"
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {x.q}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {x.a}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Copy Answer", "Open Guide", "Contact Support"].map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toast(`${a} is UI-only for now.`, { icon: "✦" })}
                        className="rounded-full border border-accent/25 bg-white/40 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-accent/10 dark:bg-black/20 dark:text-white"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                FAST CHECK
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { label: "Encryption", value: "Enabled" },
                  { label: "Schema", value: "Verified" },
                  { label: "SLA", value: "Active" },
                  { label: "Retention", value: "Tier-2" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className="rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 dark:bg-black/15"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {k.value}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-slate-600 dark:text-slate-400">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-accent/25 bg-white/35 p-6 dark:bg-black/25">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                SUPPORT CHANNELS
              </div>
              <div className="mt-5 space-y-3">
                {[
                  {
                    name: "Portal Support",
                    meta: "Response target: 30 minutes",
                    action: "Open Ticket",
                  },
                  {
                    name: "Security Desk",
                    meta: "PHI concerns + access issues",
                    action: "Notify",
                  },
                  {
                    name: "Submission Ops",
                    meta: "Schema + dataset validation",
                    action: "Ping",
                  },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-white/30 px-4 py-4 dark:bg-black/15"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {c.name}
                      </div>
                      <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {c.meta}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Support actions are UI-only.", { icon: "✉" })}
                      className="rounded-2xl border border-accent/35 bg-accent/20 px-4 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/30 dark:text-white"
                    >
                      {c.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </NeoModal>
  );
}
