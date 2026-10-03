import type { Puzzle } from "../game/types";

export const createGamePicker = (puzzles: readonly Puzzle[], currentId: string, onChoose: (id: string) => void) => {
  const dialog = document.createElement("dialog");
  dialog.className = "game-picker";
  dialog.innerHTML = `<button class="dialog-close" aria-label="닫기">×</button><h2>다른 연결</h2><div class="game-list"></div>`;
  const list = dialog.querySelector<HTMLDivElement>(".game-list")!;
  for (const puzzle of puzzles) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `#${puzzle.id} ${puzzle.title}`;
    button.disabled = puzzle.id === currentId;
    button.addEventListener("click", () => { dialog.close(); onChoose(puzzle.id); });
    list.append(button);
  }
  dialog.querySelector(".dialog-close")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.body.append(dialog);
  return dialog;
};
