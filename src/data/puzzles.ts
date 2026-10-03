import type { Puzzle } from "../game/types";

export const puzzles: readonly Puzzle[] = [
  {
    id: "001", title: "첫 번째 연결",
    groups: [
      { id: "seasons", title: "계절", words: ["봄", "여름", "가을", "겨울"] },
      { id: "colors", title: "색", words: ["빨강", "파랑", "노랑", "초록"] },
      { id: "surnames", title: "성씨", words: ["김", "이", "박", "최"] },
      { id: "keys", title: "키보드 키", words: ["스페이스", "엔터", "시프트", "탭"] }
    ]
  },
  {
    id: "002", title: "음식",
    groups: [
      { id: "korean", title: "한식", words: ["비빔밥", "김치", "불고기", "된장찌개"] },
      { id: "fruits", title: "과일", words: ["사과", "배", "포도", "감"] },
      { id: "noodles", title: "면 요리", words: ["라면", "냉면", "칼국수", "우동"] },
      { id: "taste", title: "맛", words: ["단맛", "짠맛", "신맛", "쓴맛"] }
    ]
  },
  {
    id: "003", title: "음악",
    groups: [
      { id: "notes", title: "음계", words: ["도", "레", "미", "파"] },
      { id: "strings", title: "현악기", words: ["바이올린", "첼로", "비올라", "하프"] },
      { id: "tempo", title: "빠르기말", words: ["라르고", "안단테", "알레그로", "프레스토"] },
      { id: "genres", title: "음악 장르", words: ["재즈", "록", "발라드", "힙합"] }
    ]
  }
];

export const defaultPuzzle = puzzles[0];
export const findPuzzle = (id: string | null) => puzzles.find((puzzle) => puzzle.id === id) ?? defaultPuzzle;
