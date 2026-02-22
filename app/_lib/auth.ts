export const VALID_USERNAME = "admin123@memberservice.com";
export const VALID_PASSWORD = "admin@123";

export const AUTH_STORAGE_KEY = "ms_auth_v1";

export type AuthSession = {
  username: string;
  createdAt: number;
};

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw =
    window.localStorage.getItem(AUTH_STORAGE_KEY) ??
    window.sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeSession(session: AuthSession, remember: boolean) {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);

  const target = remember ? window.localStorage : window.sessionStorage;
  target.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
