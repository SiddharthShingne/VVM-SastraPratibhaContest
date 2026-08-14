import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const TIMEOUT_MS = 60 * 60 * 1000; // 1 hour
const EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "click",
];

export function useSessionTimeout() {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const logout = useCallback(() => {
    setShowDialog(true); // ← show dialog first, don't redirect yet
  }, []);

  const confirmLogout = useCallback(() => {
    setShowDialog(false);
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/login");
  }, [router]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, TIMEOUT_MS);
  }, [logout]);

  useEffect(() => {
    resetTimer();
    EVENTS.forEach((e) =>
      window.addEventListener(e, resetTimer, { passive: true }),
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      EVENTS.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer]);

  return { showDialog, confirmLogout };
}
