"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, KeyRound, Sparkles, User2 } from "lucide-react";
import { LogoMark } from "./_components/icons";
import {
  VALID_PASSWORD,
  VALID_USERNAME,
  writeSession,
} from "./_lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState(VALID_USERNAME);
  const [password, setPassword] = React.useState(VALID_PASSWORD);
  const [remember, setRemember] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const normalized = username.trim();
    if (!normalized || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setBusy(true);
    try {
      if (normalized !== VALID_USERNAME || password !== VALID_PASSWORD) {
        setError("Invalid credentials. Use the provided admin login.");
        return;
      }

      writeSession({ username: normalized, createdAt: Date.now() }, remember);
      router.push("/home");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 ms-grid opacity-50" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <section className="relative flex flex-col justify-center">
            <div className="inline-flex items-center gap-4">
              <div className="ms-glass shadow-glow flex h-14 w-14 items-center justify-center rounded-2xl text-accent">
                <LogoMark className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-semibold tracking-[0.35em] text-slate-600 dark:text-slate-400">
                  SECURE ACCESS
                </div>
                <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Member Service Portal
                </div>
              </div>
            </div>

            <h4 className="mt-10 max-w-xl text-xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-2xl">
                Welcome to Your Member Portal.
              <span className="text-accent"> </span>
                Secure, Simple, Seamless Access
              <span className="text-accent"> </span>
               Empowering Your Experience
            </h4>

            <p className="mt-6 max-w-xl text-xs leading-7 text-slate-600 dark:text-slate-300 ">
               Access personalized member services and manage your account securely. Enjoy a seamless experience designed to support your needs every step of the way.
              {/* <span className="font-semibold text-slate-900 dark:text-white">
                {" "}
                #D8BFD8
              </span> */}
              .
            </p>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 hidden">
              <div className="ms-glass rounded-xl2 p-5">
                <div className="text-xs font-semibold tracking-[0.3em] text-slate-600 dark:text-slate-400">
                  USERNAME
                </div>
                <div className="mt-2 select-all break-all text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                  {VALID_USERNAME}
                </div>
              </div>
              <div className="ms-glass rounded-xl2 p-5">
                <div className="text-xs font-semibold tracking-[0.3em] text-slate-600 dark:text-slate-400">
                  PASSWORD
                </div>
                <div className="mt-2 select-all text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                  {VALID_PASSWORD}
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex items-center justify-center">
            <div className="ms-glass shadow-glow w-full max-w-lg rounded-[28px] p-8 sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-sm font-semibold  text-slate-600 dark:text-slate-400">
                    LOGIN
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    Sign in to continue
                  </div>
                </div>
                <div className="ms-glass flex h-12 w-12 items-center justify-center rounded-2xl text-accent">
                  <User2 className="h-6 w-6" />
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-10 space-y-7">
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-[0.28em] text-slate-600 dark:text-slate-400">
                    USERNAME
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 dark:text-slate-300" />
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="ms-glass w-full rounded-2xl py-4 pl-12 pr-5 text-base text-slate-900 placeholder:text-slate-500 outline-none ring-0 focus:border-accent/60 dark:text-white dark:placeholder:text-slate-400"
                      placeholder="admin123@memberservice.com"
                      autoComplete="username"
                      spellCheck={false}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-[0.28em] text-slate-600 dark:text-slate-400">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 dark:text-slate-300" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="ms-glass w-full rounded-2xl py-4 pl-12 pr-5 text-base text-slate-900 placeholder:text-slate-500 outline-none ring-0 focus:border-accent/60 dark:text-white dark:placeholder:text-slate-400"
                      placeholder="admin@123"
                      autoComplete="current-password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <label className="group inline-flex cursor-pointer select-none items-center gap-3">
                    <span className="ms-glass flex h-5 w-9 items-center rounded-full px-1">
                      <span
                        className={
                          "h-3 w-3 rounded-full bg-accent transition-transform " +
                          (remember ? "translate-x-4" : "translate-x-0")
                        }
                      />
                    </span>
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      toast(
                        "Password recovery is demo-only (static credentials).",
                        { icon: "✦" }
                      )
                    }
                    className="text-sm font-semibold tracking-tight text-slate-700 underline decoration-accent/60 underline-offset-4 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                  >
                    Forgot password?
                  </button>
                </div>

                {error ? (
                  <div className="ms-glass rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-700 dark:text-red-200">
                    {error}
                  </div>
                ) : null}

                <button
                  disabled={busy}
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl border border-accent/40 bg-accent/20 px-6 py-4 text-base font-semibold tracking-tight text-slate-900 shadow-glow transition hover:bg-accent/30 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white"
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="absolute -left-12 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-accent/35 blur-2xl" />
                    <span className="absolute -right-12 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-accent/25 blur-2xl" />
                  </span>
                  <span className="relative">
                    {busy ? "Signing in…" : "Login"}
                  </span>
                </button>

                <div className="pt-2 text-center text-xs text-slate-600 dark:text-slate-400 hidden">
                  Demo only • Static credentials • Accent-first UI
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
