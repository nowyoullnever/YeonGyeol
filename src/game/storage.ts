import { newProgress } from "./engine";
import type { GameProgress, Puzzle } from "./types";

const keyFor = (puzzleId: string) => `yeongyeol:puzzle:${puzzleId}`;
export const loadProgress = (puzzle: Puzzle): GameProgress => {
  try {
    const saved = JSON.parse(localStorage.getItem(keyFor(puzzle.id)) ?? "null") as GameProgress | null;
    if (saved && Array.isArray(saved.solvedGroupIds) && Array.isArray(saved.wordOrder) && Array.isArray(saved.selectedWordIds) && typeof saved.mistakesRemaining === "number" && ["playing", "won", "lost"].includes(saved.status)) return saved;
  } catch { /* invalid saved state starts a new game */ }
  return newProgress(puzzle);
};
export const saveProgress = (puzzle: Puzzle, progress: GameProgress) => localStorage.setItem(keyFor(puzzle.id), JSON.stringify(progress));
