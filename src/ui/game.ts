import { availableWordIds, clearSelection, shuffleAvailable, submitSelection, toggleWord } from "../game/engine";
import { loadProgress, saveProgress } from "../game/storage";
import type { GameProgress, Puzzle } from "../game/types";
import { puzzles } from "../data/puzzles";
import { createGamePicker } from "./gamePicker";

const colors = ["rose", "lime", "blue", "ochre"];
const wordFor = (puzzle: Puzzle, id: string) => {
  const [groupId, item] = id.split(":");
  return puzzle.groups.find((group) => group.id === groupId)?.words[Number(item)] ?? "";
};

export const mountGame = (root: HTMLElement, puzzle: Puzzle, choosePuzzle: (id: string) => void) => {
  let progress = loadProgress(puzzle);
  let shake = false;
  let notice = "";
  const persist = () => saveProgress(puzzle, progress);
  const render = () => {
    const solved = puzzle.groups.filter((group) => progress.solvedGroupIds.includes(group.id));
    const available = progress.status === "playing" ? availableWordIds(puzzle, progress) : [];
    root.innerHTML = `
      <header><h1>연결!</h1><p>네 단어씩, 네 개의 연결을 찾아보세요.</p></header>
      <section class="game" aria-label="${puzzle.title}">
        <p class="puzzle-title">#${puzzle.id} ${puzzle.title}</p>
        <div class="puzzle-board ${shake ? "shake" : ""}" aria-label="연결 단어 보드"></div>
        <p class="notice" role="status">${notice}</p>
        <div class="game-controls">
          <button type="button" data-action="shuffle" ${progress.status !== "playing" ? "disabled" : ""}>섞기</button>
          <button type="button" data-action="clear" ${progress.selectedWordIds.length === 0 || progress.status !== "playing" ? "disabled" : ""}>선택 해제</button>
          <button type="button" class="commit" data-action="submit" ${progress.selectedWordIds.length !== 4 || progress.status !== "playing" ? "disabled" : ""}>제출</button>
        </div>
        ${progress.status === "won" ? '<p class="outcome">연결 완료!</p>' : ""}
        <button type="button" class="other-games" data-action="picker">다른 게임 보기</button>
      </section>`;
    const board = root.querySelector<HTMLDivElement>(".puzzle-board")!;
    solved.forEach((group) => {
      const solution = document.createElement("section");
      solution.className = `solved-group ${colors[puzzle.groups.indexOf(group)]}`;
      solution.innerHTML = `<strong>${group.title}</strong><span>${group.words.join(" · ")}</span>`;
      board.append(solution);
    });
    available.forEach((id) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "word-tile";
      tile.textContent = wordFor(puzzle, id);
      const selected = progress.selectedWordIds.includes(id);
      tile.setAttribute("aria-pressed", String(selected));
      tile.addEventListener("click", () => { progress = toggleWord(progress, id); notice = ""; persist(); render(); });
      board.append(tile);
    });
    root.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((button) => button.addEventListener("click", () => {
      switch (button.dataset.action) {
        case "shuffle": progress = shuffleAvailable(puzzle, progress); notice = ""; persist(); render(); break;
        case "clear": progress = clearSelection(progress); notice = ""; persist(); render(); break;
        case "picker": createGamePicker(puzzles, puzzle.id, choosePuzzle).showModal(); break;
        case "submit": {
          const result = submitSelection(puzzle, progress);
          progress = result.progress;
          if (result.submission.kind === "correct") notice = "연결을 찾았어요.";
          if (result.submission.kind === "incorrect") {
            notice = result.submission.oneAway ? "하나만 바꾸면 돼요!" : "다시 생각해 보세요.";
            shake = true;
            window.setTimeout(() => { shake = false; render(); }, 260);
          }
          persist(); render();
        }
      }
    }));
  };
  render();
};
