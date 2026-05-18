# Context — my-first-web 프로젝트 상태

## 현재 요약

- 프로젝트: 개인 블로그 템플릿 (Next.js App Router + Tailwind CSS + shadcn/ui + Supabase 예정)
- 진행 상황(요약): 홈, 헤더/푸터 레이아웃, 포스트 목록 페이지 구현 완료. 포스트 상세 페이지 UI는 완료되었고 데이터 페칭(`getPostById`)이 연결되어 동작합니다. shadcn/ui 기반 컴포넌트들이 `components/ui/`에 존재합니다. 아키텍처·가이드 문서(`ARCHITECTURE.md`, `copilot-instructions.md`) 초안 작성 완료.

## 상세 상태

- 완료:
  - 홈 페이지 (`/`) — 포스트 목록(서버에서 초기 데이터 로드)
  - 헤더/푸터 레이아웃
  - 포스트 목록 페이지 (`/posts`) — `getPosts`로 외부/로컬 데이터 페칭
  - shadcn/ui 초기화 및 주요 UI primitives 추가 (`components/ui/button.tsx`, `card.tsx`, `input.tsx` 등)
  - `ARCHITECTURE.md`, `copilot-instructions.md` 문서 보강

- 진행/완료 직전:
  - 포스트 상세 페이지 (`/posts/[id]`) — `getPostById`로 데이터 연결 완료

- 미완/보류:
  - 마이페이지(`/mypage`), 로그인/회원가입 UI(페이지는 아직 구현 예정)
  - Supabase 연동(환경변수 설정 및 서비스 연결)은 다음 챕터(Ch8)에서 진행 예정

 # Context — my-first-web 프로젝트 상태

 ## 현재 요약

 - 프로젝트: 개인 블로그 템플릿 (Next.js App Router + Tailwind CSS + shadcn/ui + Supabase 연동)
 - 진행 상황(요약): 홈, 헤더/푸터, 포스트 목록/상세 페이지 UI는 구현되어 있고 데이터 연동은 `lib/posts.ts` 및 샘플 데이터로 동작합니다. Supabase 연결은 Ch8/Ch9 작업으로 점진 반영됩니다.

 ## 상세 상태

 - 완료:
   - 홈 페이지 (`/`) — 포스트 목록
   - 헤더/푸터 레이아웃
   - 포스트 목록/상세 UI (`/posts`, `/posts/[id]`)
   - shadcn/ui 초기 컴포넌트 구성 (`components/ui/*`)
   - `contexts/AuthContext.tsx`(AuthProvider/`useAuth`) 초기 구현

 - 진행/완료 직전:
   - Supabase 클라이언트: `lib/supabase/client.ts` 생성(브라우저용)
   - 인증/세션 흐름: `contexts/AuthContext.tsx`에서 `createBrowserSupabase()` 사용해 상태 구독

 - 미완/보류:
   - Supabase 프로젝트 연결 및 마이그레이션 적용
   - 완전한 로그인/회원가입(이메일/비밀번호) 플로우의 E2E 검증
   - 포스트 생성/수정/삭제의 권한 검증은 Ch11(RLS)에서 완료

 ## 기술 결정 사항

 - 프레임워크: Next.js 16 (App Router, Server Components 우선)
 - 스타일: Tailwind CSS 4 + Tailwind Typography(`prose`)
 - UI primitives: shadcn/ui
 - 데이터베이스: PostgreSQL (Supabase 권장)
 - 인증: Supabase Auth (이메일/비밀번호) — `contexts/AuthContext.tsx`의 `AuthProvider`/`useAuth()` 사용

 ## 중요한 구현/구성 파일

 - `lib/supabase/client.ts` (브라우저용 Supabase 클라이언트 생성)
 - `lib/auth.ts` (Auth 래퍼 — signIn/signUp/signOut 헬퍼)
 - `contexts/AuthContext.tsx` (`AuthProvider` + `useAuth()`)
 - `db/schema.sql` (Ch8 기준 스키마) — posts 컬럼: `id`, `author_id`, `title`, `slug`, `summary`, `content`(JSONB), `status`, `published_at`, `cover_url`, `created_at`, `updated_at`, `tsv`

 ## 최근 발견된 문제 / 주의사항

 - Supabase 관련 환경변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) 미설정 시 서버/브라우저에서 에러 발생 가능. 로컬에서 개발할 때는 환경변수 또는 안전한 폴백을 설정하세요.
 - App Router 프로젝트에서는 `next/router` 또는 `pages/` 패턴 사용 금지 — Server/Client 컴포넌트 경계를 지켜 `use client` 남용을 피하세요.

 ## Ch10 준비(포스트 CRUD) — 체크리스트 및 기준

 - 패키지 버전 표기: 교재 기준 — Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2. 현재 설치 기준(실제 `package.json`): `@supabase/supabase-js` ^2.105.1, `@supabase/ssr` ^0.10.2, `next` 16.2.1. 문서/학습 시에는 항상 "교재 기준"과 "현재 설치 기준"을 병기하세요.
 - Supabase 클라이언트: `lib/supabase/client.ts` 사용 (브라우저), 서버 사이드가 필요하면 서버 전용 클라이언트 또는 Supabase 서버 SDK 사용.
 - 인증: `contexts/AuthContext.tsx`의 `AuthProvider`와 `useAuth()`를 앱 전역 인증 흐름으로 사용합니다.
 - posts 테이블 컬럼: Ch8 스키마를 그대로 사용하세요(위 `db/schema.sql` 참조).
 - 라우터: App Router만 사용하며 `next/router` 사용 금지.
 - 수정/삭제 UI는 Ch10에서 UX로 구현하되, 실제 권한/보안 검증은 Ch11 RLS에서 처리합니다.

 ## Ch10 시작 전 사람이 확인할 항목

 1. `NEXT_PUBLIC_SUPABASE_URL` 및 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 환경변수가 로컬/배포 환경에 설정되어 있는지 확인
 2. `lib/supabase/client.ts` 파일 존재 및 올바른 에러 처리가 구현되어 있는지 확인
 3. `contexts/AuthContext.tsx`의 `AuthProvider`/`useAuth()` 동작 확인(로그인/로그아웃 흐름)
 4. DB 마이그레이션(`db/schema.sql`)이 Supabase에 적용되어 있는지 확인(특히 `posts` 테이블 컬럼)
 5. `middleware.ts`가 보호 라우트(`/posts/new`)를 올바르게 리다이렉트하는지 확인
 6. `package.json`의 Supabase 관련 버전(교재 기준과의 차이)을 문서화하고 빌드/런타임 테스트를 준비

 _문서 마지막 업데이트: 2026-05-18_
- 빌드/런타임 문제가 버전 차이로 발생하면 `package.json` 기준으로 원인 조사
