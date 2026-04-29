## Tech Stack

- Next.js 16.2.1 (App Router only)
- React 19.2.4
- Tailwind CSS 4
- shadcn/ui (components/ui/ 경로에 설치됨)

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.

## Design Tokens

- Primary color: shadcn/ui --primary
- Background: --background
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto (메인 컨텐츠)
- 반응형: md 이상 2열 그리드, 모바일 1열

추가 지침 (과제 요구사항 대응)
- 주요 CSS 변수 (app/globals.css)에 아래 값을 정의하세요:
	- `--primary`: 220 70% 50% (H S L 또는 RGB 기반 사용 가능)
	- `--primary-foreground`: 0 0% 100%
	예시:
	:root { --primary: 220 70% 50%; --primary-foreground: 0 0% 100%; }

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용

과제 추가 규칙
- `npx shadcn@latest init`을 실행해 초기화를 진행하세요.
- 초기로 추가할 컴포넌트: `button`, `card`, `input` (`npx shadcn@latest add button card input`).
- 서버/클라이언트 컴포넌트 규칙: 가능한 Server Component로 구현하고, 클라이언트 기능(이벤트, 상태)이 필요한 컴포넌트에만 `"use client"`를 추가하세요.

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.
