# YeonGyeol / 연결!

한국어 Connections 스타일의 싱글 플레이 단어 연결 게임입니다. 네 단어로 이루어진 네 개의 연결을 찾습니다. 접속 즉시 현재 퍼즐을 플레이할 수 있으며, 진행 상황은 브라우저 `localStorage`에 퍼즐별로 저장됩니다.

## 실행과 개발

```bash
npm install
npm run dev
```

검증과 배포용 빌드는 다음 명령으로 만듭니다.

```bash
npm test
npm run build
```

## 퍼즐 추가

`src/data/puzzles.ts`의 `puzzles` 배열에 다음 형태의 항목 하나만 추가합니다. 엔진이나 UI 수정은 필요하지 않습니다.

```ts
{
  id: "004",
  title: "새 퍼즐",
  groups: [
    { id: "group-a", title: "분류", words: ["단어 1", "단어 2", "단어 3", "단어 4"] },
    // 정확히 네 그룹이 필요합니다.
  ]
}
```

각 퍼즐은 `?game=004`처럼 직접 열 수 있습니다. 존재하지 않는 ID는 기본 퍼즐(`001`)을 엽니다.

## 구조

- `src/data/puzzles.ts`: 퍼즐 데이터
- `src/game/engine.ts`: 선택, 제출, 오답, one-away, 섞기 규칙
- `src/game/storage.ts`: 퍼즐별 localStorage 저장/복원
- `src/ui/`: 게임 보드와 퍼즐 선택 dialog

## GitHub Pages

Vite `base`는 `/YeonGyeol/`로 설정되어 있습니다. `main` 브랜치 push 시 `.github/workflows/deploy-pages.yml`이 빌드 결과물 `dist`를 GitHub Pages에 배포합니다. 저장소 Settings의 Pages Source를 **GitHub Actions**로 설정하면 됩니다.

## 글꼴 및 라이선스

전체 UI에 Gowun Batang을 내장하여 사용합니다. 폰트 파일은 `public/fonts/`에 있으며, OFL 라이선스 전문은 `THIRD_PARTY_LICENSES.md`에 포함되어 있습니다.
