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

## 기술 결정 사항

- 프레임워크: Next.js 16 (App Router, Server Components 우선)
- 스타일: Tailwind CSS 4 + Tailwind Typography(`prose`) 권장
- UI primitives: shadcn/ui (원본은 `components/ui/`, 앱 래퍼는 `components/`에 배치)
- 데이터베이스: PostgreSQL (Supabase 권장)
- 인증: Supabase Auth (이메일/비밀번호) — 세션 관리는 Supabase SDK
- 상태관리: React Context (AuthProvider 패턴 권장)
- 이미지/파일: Supabase Storage 사용 예정

## 중요한 구현/구성 파일

- 데이터 페칭 헬퍼: `lib/posts.ts` (`getPosts`, `getPostById`)
- 초기 DB DDL 샘플: `db/schema.sql` (users/posts/tags 등 포함)
- shadcn 원본 컴포넌트: `components/ui/*`
- 앱 레이아웃: `app/layout.tsx`, 전역 스타일: `app/globals.css`
- 아키텍처 문서: `ARCHITECTURE.md`
- 개발 가이드: `copilot-instructions.md`

## 최근 발견된 문제 / 주의사항

- 개발 서버에서 Supabase 관련 코드가 import 될 때 환경변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) 미설정으로 오류가 발생할 수 있습니다. 현재는 Supabase 연동을 다음 단계로 미루고, 로컬 더미/외부 API(JSONPlaceholder) 폴백을 사용하여 개발 가능한 상태입니다.
- App Router 프로젝트에서는 `pages/` 패턴 또는 `next/router` 사용 금지 — Server/Client 컴포넌트 경계, `use client` 남용에 유의하세요.

## 다음 권장 단계

1. Ch8에서 Supabase 프로젝트 생성 및 환경변수 설정
2. 인증(이메일/비밀번호)과 `profiles` 또는 `users` 테이블 연동
3. 로그인/회원가입 및 마이페이지 구현
4. 에디터(글쓰기) 페이지에서 저장/발행 워크플로 구현

_문서 마지막 업데이트: 2026-04-30_
