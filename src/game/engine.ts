import type { GameProgress, Puzzle, Submission } from "./types";

export const wordId = (groupId: string, index: number) => `${groupId}:${index}`;
export const allWordIds = (puzzle: Puzzle) => puzzle.groups.flatMap((group) => group.words.map((_, index) => wordId(group.id, index)));
export const shuffled = <T>(items: readonly T[], random = Math.random): T[] => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const next = Math.floor(random() * (index + 1));
    [result[index], result[next]] = [result[next], result[index]];
  }
  return result;
};
export const newProgress = (puzzle: Puzzle, random = Math.random): GameProgress => ({
  solvedGroupIds: [], status: "playing", wordOrder: shuffled(allWordIds(puzzle), random), selectedWordIds: []
});
export const isSolved = (progress: GameProgress, groupId: string) => progress.solvedGroupIds.includes(groupId);
export const availableWordIds = (puzzle: Puzzle, progress: GameProgress) => progress.wordOrder.filter((id) => !progress.solvedGroupIds.some((groupId) => id.startsWith(`${groupId}:`)));
export const toggleWord = (progress: GameProgress, id: string): GameProgress => {
  if (progress.status !== "playing") return progress;
  const selected = progress.selectedWordIds.includes(id)
    ? progress.selectedWordIds.filter((item) => item !== id)
    : progress.selectedWordIds.length < 4 ? [...progress.selectedWordIds, id] : progress.selectedWordIds;
  return { ...progress, selectedWordIds: selected };
};
export const clearSelection = (progress: GameProgress): GameProgress => ({ ...progress, selectedWordIds: [] });
export const shuffleAvailable = (puzzle: Puzzle, progress: GameProgress, random = Math.random): GameProgress => {
  if (progress.status !== "playing") return progress;
  const available = availableWordIds(puzzle, progress);
  const reordered = shuffled(available, random);
  let index = 0;
  return { ...progress, wordOrder: progress.wordOrder.map((id) => available.includes(id) ? reordered[index++] : id) };
};
export const submitSelection = (puzzle: Puzzle, progress: GameProgress): { progress: GameProgress; submission: Submission } => {
  if (progress.status !== "playing" || progress.selectedWordIds.length !== 4) return { progress, submission: { kind: "invalid" } };
  const selected = new Set(progress.selectedWordIds);
  const correct = puzzle.groups.find((group) => !isSolved(progress, group.id) && group.words.every((_, index) => selected.has(wordId(group.id, index))));
  if (correct) {
    const solvedGroupIds = [...progress.solvedGroupIds, correct.id];
    const status = solvedGroupIds.length === puzzle.groups.length ? "won" : "playing";
    return { progress: { ...progress, solvedGroupIds, status, selectedWordIds: [] }, submission: { kind: "correct", groupId: correct.id } };
  }
  const oneAway = puzzle.groups.some((group) => group.words.filter((_, index) => selected.has(wordId(group.id, index))).length === 3);
  return { progress: { ...progress, selectedWordIds: [] }, submission: { kind: "incorrect", oneAway } };
};
