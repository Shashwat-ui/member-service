"use client";

import toast from "react-hot-toast";
import { CircleHelp, Shield, UserRound, LogOut } from "lucide-react";
import { LogoMark } from "./icons";
import { useAuth } from "./AuthGate";

export function PortalHeader() {
  const { session, logout } = useAuth();

  return (
    <header className="ms-glass shadow-glow flex flex-wrap items-center justify-between gap-6 rounded-[28px] px-6 py-4 sm:px-8">
      <div className="flex items-center gap-4">
        <div className="ms-glass flex h-11 w-11 items-center justify-center rounded-2xl text-accent">
          <LogoMark className="h-6 w-6" />
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
            MEMBER SERVICE
          </div>
          <div className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Member Service Portal
          </div>
        </div>
      </div>

      <nav className="ms-glass flex items-center overflow-hidden rounded-2xl border border-accent/25 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {[
          {
            label: "Help",
            icon: CircleHelp,
            onClick: () =>
              toast(
                "Help center is demo-only right now — ask me to wire real routes.",
                { icon: "?" }
              ),
          },
          {
            label: "Admin",
            icon: Shield,
            onClick: () => toast("Admin console is UI-only for now.", { icon: "⚙" }),
          },
          { label: `Welcome : ${session.username}`, icon: UserRound, onClick: undefined },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            disabled={!item.onClick}
            className={
              "flex items-center gap-2 px-4 py-3 transition hover:bg-accent/15 disabled:cursor-default disabled:hover:bg-transparent " +
              (idx > 0 ? "border-l border-accent/20" : "")
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
          );
        })}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 border-l border-accent/20 px-4 py-3 transition hover:bg-accent/15"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </header>
  );
}
