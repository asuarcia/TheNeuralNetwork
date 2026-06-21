// Client-side gamification store (localStorage). This powers XP, levels,
// streaks, and lesson completion for the interactive-overhaul branch. It works
// without a backend; if Supabase progress is wired later, this can mirror it.
// All functions are SSR-safe (no-op / defaults on the server).

const KEY = "tnn:progress:v1";
export const XP_PER_LESSON = 50;
export const XP_PER_QUIZ = 10;
export const XP_PER_EXERCISE = 15;
const XP_PER_LEVEL = 200;

export interface Progress {
  xp: number;
  completed: string[]; // "course/lesson" ids
  streak: number;
  lastActive: string; // YYYY-MM-DD (local)
  badges: string[];
}

const DEFAULT: Progress = { xp: 0, completed: [], streak: 0, lastActive: "", badges: [] };

const LEVEL_TITLES = [
  "Newcomer", "Initiate", "Apprentice", "Practitioner", "Analyst",
  "Engineer", "Architect", "Specialist", "Researcher", "Pioneer",
  "Visionary", "AI Sage",
];

function todayStr(): string {
  return new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

function save(p: Progress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new CustomEvent("tnn-progress"));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function levelInfo(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const intoLevel = xp % XP_PER_LEVEL;
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return { level, intoLevel, perLevel: XP_PER_LEVEL, title, pct: (intoLevel / XP_PER_LEVEL) * 100 };
}

/** Update the daily streak based on last-active date. */
function bumpStreak(p: Progress): Progress {
  const today = todayStr();
  if (p.lastActive === today) return p;
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");
  const streak = p.lastActive === yesterday ? p.streak + 1 : 1;
  return { ...p, streak, lastActive: today };
}

export function addXp(amount: number): Progress {
  const p = bumpStreak(loadProgress());
  const next = { ...p, xp: p.xp + amount };
  save(next);
  return next;
}

export function completeLesson(id: string, xp: number = XP_PER_LESSON): Progress {
  const p = bumpStreak(loadProgress());
  const firstTime = !p.completed.includes(id);
  const next: Progress = {
    ...p,
    xp: p.xp + (firstTime ? xp : 0),
    completed: firstTime ? [...p.completed, id] : p.completed,
  };
  save(next);
  return next;
}

export function isCompleted(id: string): boolean {
  return loadProgress().completed.includes(id);
}

/** Lessons completed for a given course slug (ids look like "course/lesson"). */
export function courseCompletedCount(courseSlug: string): number {
  return loadProgress().completed.filter((id) => id.startsWith(courseSlug + "/")).length;
}

export function recordActivity(): Progress {
  const next = bumpStreak(loadProgress());
  save(next);
  return next;
}
