"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BarChart3, BookOpen, HelpCircle, Search, UploadCloud } from "lucide-react";
import { ModuleModal, type ModuleKey } from "../../_components/ModuleModal";
import { PortalHeader } from "../../_components/PortalHeader";

type TopTab = "upload" | "reports" | "resources" | "faq";

type TabDef = {
  key: TopTab;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
};

const TABS: TabDef[] = [
  {
    key: "upload",
    Icon: UploadCloud,
    title: "Upload",
    subtitle: "Secure file submission",
  },
  {
    key: "reports",
    Icon: BarChart3,
    title: "Reports",
    subtitle: "Export and insights",
  },
  {
    key: "resources",
    Icon: BookOpen,
    title: "Resources",
    subtitle: "Reference library",
  },
  {
    key: "faq",
    Icon: HelpCircle,
    title: "FAQ",
    subtitle: "Quick answers",
  },
];

const SEARCH_CHIPS = [
  "Search with Files",
  "Search with Reports Name",
  "Search with Claim ID",
  "Search with Group ID",
];

export function HomeShell() {
  const router = useRouter();
  const [active, setActive] = React.useState<TopTab | null>(null);
  const [chip, setChip] = React.useState(SEARCH_CHIPS[0]);
  const [query, setQuery] = React.useState("");
  const [modalKey, setModalKey] = React.useState<ModuleKey | null>(null);

  const closeModal = React.useCallback(() => setModalKey(null), []);

  function openModuleModal(key: Exclude<TopTab, "upload">) {
    setActive(key);
    setModalKey(key);
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 ms-grid opacity-40" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-10">
        <PortalHeader />

        <main className="mt-10">
          <section className="ms-glass shadow-glow rounded-[28px] px-7 py-10 sm:px-10">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                HOME
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Welcome to Member Service Portal
              </h1>
              <p className="mt-1 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                Search fast, navigate cleanly, and submit member data securely — all
                with a consistent accent-first design.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div className="ms-glass rounded-[26px] border border-accent/25 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {SEARCH_CHIPS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setChip(c)}
                        className={
                          "rounded-full border px-3 py-1.5 text-xs font-semibold tracking-tight transition " +
                          (chip === c
                            ? "border-accent/50 bg-accent/25 text-slate-900 dark:text-white"
                            : "border-accent/20 bg-white/30 text-slate-700 hover:bg-accent/15 dark:bg-black/20 dark:text-slate-200")
                        }
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="ml-auto hidden text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400 lg:block">
                    SEARCH
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-accent/25 bg-white/40 px-4 py-4 dark:bg-black/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/25 text-slate-900 dark:text-white">
                    <Search className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                      {chip.toUpperCase()}
                    </div>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Type to search…"
                      className="mt-1 w-full bg-transparent text-base font-medium text-slate-900 outline-none placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast(
                        `Search (${chip}) is UI-only for now — query: ${
                          query.trim() ? `“${query.trim()}”` : "(empty)"
                        }`,
                        { icon: "⌕" }
                      )
                    }
                    className="rounded-2xl border border-accent/35 bg-accent/20 px-5 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/30 dark:text-white"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="ms-glass rounded-[26px] border border-accent/25 p-6">
                <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                  STATUS
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Pending", value: "03" },
                    { label: "In Review", value: "07" },
                    { label: "Approved", value: "12" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-accent/20 bg-white/35 px-4 py-4 dark:bg-black/25"
                    >
                      <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs font-semibold tracking-[0.2em] text-slate-600 dark:text-slate-400">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Your workspace is ready. Pick a module below.
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="ms-glass rounded-full border border-accent/25 bg-white/35 p-2 dark:bg-black/25">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {TABS.map((t) => {
                    const isActive = active === t.key;
                    const Icon = t.Icon;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => {
                          if (t.key === "upload") {
                            setActive("upload");
                            toast("Opening Upload…", { icon: "⇪" });
                            router.push("/upload");
                            return;
                          }

                          openModuleModal(t.key);
                        }}
                        className={
                          "group flex items-center gap-4 rounded-full px-5 py-4 text-left transition " +
                          (isActive
                            ? "bg-white/70 shadow-glow ring-1 ring-accent/30 dark:bg-black/35"
                            : "hover:bg-accent/10")
                        }
                      >
                        <div
                          className={
                            "flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold tracking-tight transition " +
                            (isActive
                              ? "border-accent/55 bg-accent/25 text-slate-900 dark:text-white"
                              : "border-accent/25 bg-white/30 text-slate-700 dark:bg-black/20 dark:text-slate-200")
                          }
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                            {t.title}
                          </div>
                          <div className="truncate text-sm text-slate-600 dark:text-slate-300">
                            {t.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>
        {modalKey ? (
          <ModuleModal open moduleKey={modalKey} onClose={closeModal} />
        ) : null}
      </div>
    </div>
  );
}
