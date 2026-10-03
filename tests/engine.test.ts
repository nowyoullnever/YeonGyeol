import { describe, expect, it } from "vitest";
import { defaultPuzzle } from "../src/data/puzzles";
import { newProgress, submitSelection, toggleWord, wordId } from "../src/game/engine";

describe("Connections engine", () => {
  it("limits a selection to four words", () => {
    let progress = newProgress(defaultPuzzle, () => .5);
    for (const id of progress.wordOrder.slice(0, 5)) progress = toggleWord(progress, id);
    expect(progress.selectedWordIds).toHaveLength(4);
  });
  it("solves a selected group", () => {
    let progress = newProgress(defaultPuzzle, () => .5);
    progress = { ...progress, selectedWordIds: [0, 1, 2, 3].map((index) => wordId("seasons", index)) };
    const result = submitSelection(defaultPuzzle, progress);
    expect(result.submission).toMatchObject({ kind: "correct", groupId: "seasons" });
    expect(result.progress.solvedGroupIds).toEqual(["seasons"]);
  });
  it("reports one-away mistakes and loses after four mistakes", () => {
    let progress = newProgress(defaultPuzzle, () => .5);
    const near = [wordId("seasons", 0), wordId("seasons", 1), wordId("seasons", 2), wordId("colors", 0)];
    for (let count = 0; count < 4; count += 1) {
      progress = { ...progress, selectedWordIds: near };
      const result = submitSelection(defaultPuzzle, progress);
      expect(result.submission).toMatchObject({ kind: "incorrect", oneAway: true });
      progress = result.progress;
    }
    expect(progress.status).toBe("lost");
    expect(progress.mistakesRemaining).toBe(0);
  });
});
