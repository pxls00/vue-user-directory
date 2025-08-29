export const local = {
  get: (key: string): string | null => {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set: (key: string, value: string): void => {
    try { window.localStorage.setItem(key, value); } catch { /* noop */ }
  },
  remove: (key: string): void => {
    try { window.localStorage.removeItem(key); } catch { /* noop */ }
  },
};

export function getJSON<T>(key: string, fallback: T): T {
  const raw = local.get(key);
  if (raw == null) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export function setJSON<T>(key: string, value: T): void {
  try { local.set(key, JSON.stringify(value)); } catch { /* noop */ }
}

