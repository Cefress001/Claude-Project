import { useState, useEffect, useCallback } from 'react';

/**
 * State backed by localStorage that survives reloads and stays in sync
 * across every component instance using the same key (via a custom event).
 * Falls back to in-memory behaviour if storage is unavailable.
 */

const SYNC_EVENT = 'kabbalah:persist';

export function usePersistentState<T>(key: string, initial: T) {
  const read = useCallback((): T => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
    // `initial` is intentionally excluded — only the key identifies the slot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const [value, setValue] = useState<T>(read);

  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue(prev => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: T) => T)(prev)
            : updater;
        try {
          localStorage.setItem(key, JSON.stringify(next));
          window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: key }));
        } catch {
          /* storage unavailable (private mode / quota) — keep in-memory */
        }
        return next;
      });
    },
    [key],
  );

  useEffect(() => {
    const onSync = (e: Event) => {
      if (e instanceof CustomEvent && e.detail !== key) return;
      setValue(read());
    };
    window.addEventListener(SYNC_EVENT, onSync);
    window.addEventListener('storage', onSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, onSync);
      window.removeEventListener('storage', onSync);
    };
  }, [key, read]);

  return [value, set] as const;
}
