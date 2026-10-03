import "./style.css";
import { findPuzzle } from "./data/puzzles";
import { mountGame } from "./ui/game";

const root = document.querySelector<HTMLElement>("#app")!;
const openPuzzle = (id: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("game", id);
  history.pushState({}, "", url);
  mountGame(root, findPuzzle(id), openPuzzle);
};
mountGame(root, findPuzzle(new URLSearchParams(window.location.search).get("game")), openPuzzle);
window.addEventListener("popstate", () => mountGame(root, findPuzzle(new URLSearchParams(window.location.search).get("game")), openPuzzle));
