# Project Context

## Tech Stack
- Next.js 16.2.1 (App Router ONLY — Pages Router 사용 금지)
- React 19.2.4
- Tailwind CSS 4.x
- TypeScript 5.x
- Vercel 배포

## Coding Conventions
- Server Component 기본, "use client"는 필요할 때만 사용
- async/await 패턴 (then 체이닝 금지)
- Tailwind CSS 유틸리티 클래스만 사용 (CSS Modules, styled-components 금지)
- 파일 확장자: .tsx (TypeScript)
- 컴포넌트명은 PascalCase, 변수는 camelCase

## Known AI Mistakes (DO NOT)
- `next/router` 사용 금지 → `next/navigation` 사용할 것
- `pages/` 폴더 사용 금지 → `app/` 폴더의 App Router 구조 사용
- `getServerSideProps`, `getStaticProps` 사용 금지 → Server Components 사용
- `params`를 동기로 읽지 말 것 → `const { id } = await params` 로 async 처리
- CSS Modules 생성 금지 → Tailwind CSS만 사용
- 모든 파일에 "use client" 추가 금지 → Server Component가 기본
- `@supabase/auth-helpers` 사용 금지 → `@supabase/ssr` 사용
