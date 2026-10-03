export type ConnectionGroup = { id: string; title: string; words: readonly [string, string, string, string] };
export type Puzzle = { id: string; title: string; date?: string; groups: readonly [ConnectionGroup, ConnectionGroup, ConnectionGroup, ConnectionGroup] };
export type GameStatus = "playing" | "won";
export type GameProgress = {
  solvedGroupIds: string[];
  status: GameStatus;
  wordOrder: string[];
  selectedWordIds: string[];
};
export type Submission = { kind: "correct"; groupId: string } | { kind: "incorrect"; oneAway: boolean } | { kind: "invalid" };
