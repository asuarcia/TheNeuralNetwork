"use client";

import { useEffect, useState } from "react";
import { loadProgress, levelInfo, type Progress } from "./store";

/**
 * Subscribe to the gamification store. `ready` is false until after mount so
 * components can avoid hydration mismatches (server renders the default state).
 */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setProgress(loadProgress());
    sync();
    setReady(true);
    window.addEventListener("tnn-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tnn-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { progress, ready, level: levelInfo(progress.xp) };
}
