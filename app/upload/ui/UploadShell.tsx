"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortalHeader } from "../../_components/PortalHeader";
import { ModuleModal, type ModuleKey } from "../../_components/ModuleModal";
import { UploadView } from "./UploadView";

const SIDEBAR_ITEMS = [
  { key: "upload", title: "Upload" },
  { key: "reports", title: "Reports" },
  { key: "resources", title: "Resources" },
  { key: "faq", title: "FAQ" },
] as const;

export function UploadShell() {
  const router = useRouter();
  const [modalKey, setModalKey] = React.useState<ModuleKey | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 ms-grid opacity-40" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-10">
        <PortalHeader />

        <main className="mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                toast("Back to Home", { icon: "←" });
                router.push("/home");
              }}
              className="rounded-2xl border border-accent/25 bg-white/35 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-accent/10 dark:bg-black/20 dark:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </span>
            </button>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              UPLOAD MODULE
            </div>
          </div>

          <UploadView
            sidebarItems={SIDEBAR_ITEMS as any}
            onOpenModule={(key) => setModalKey(key)}
          />
        </main>

        {modalKey ? (
          <ModuleModal open moduleKey={modalKey} onClose={() => setModalKey(null)} />
        ) : null}
      </div>
    </div>
  );
}
