# Context — my-first-web 프로젝트 상태

## 현재 요약

- 프로젝트: 개인 블로그 템플릿 (Next.js App Router + Tailwind CSS + shadcn/ui + Supabase 연동)
- 진행 상황(요약): 홈, 헤더/푸터, 포스트 목록/상세 페이지 구현 완료. 게시글 작성/수정/삭제(CRUD) 기능이 Supabase와 완전히 연동되었습니다.

## 상세 상태

- 완료:
  - 홈 페이지 (`/`) — 포스트 목록
  - 헤더/푸터 레이아웃
  - 포스트 목록/상세 UI 및 데이터 연동 (`/posts`, `/posts/[id]`)
  - 게시글 작성/수정/삭제 기능 (`/posts/new`, `/posts/[id]/edit`)
  - shadcn/ui 컴포넌트 구성 (`components/ui/*`)
  - `contexts/AuthContext.tsx`(AuthProvider/`useAuth`) 구현 완료
  - `middleware.ts`를 통한 보호 라우트(`new`, `edit`) 설정 완료

- 진행/완료 직전:
  - Supabase 클라이언트: `lib/supabase/client.ts` (브라우저), `lib/supabase/server.ts` (서버) 사용

- 미완/보류:
  - 포스트 생성/수정/삭제의 **물리적 보안(RLS)**은 Ch11에서 완료 예정
  - 이미지 업로드 및 Storage 연동 (Ch10 이후 확장 가능)

## 기술 결정 사항

- 프레임워크: Next.js 16 (App Router)
- 스타일: Tailwind CSS 4 + Tailwind Typography
- UI primitives: shadcn/ui
- 데이터베이스: PostgreSQL (Supabase)
- 인증: Supabase Auth (이메일/비밀번호)

## 중요한 구현/구성 파일

- `lib/supabase/client.ts` & `server.ts`
- `lib/auth.ts` (인증 래퍼)
- `contexts/AuthContext.tsx` (`AuthProvider`)
- `components/EditPostForm.tsx` & `PostActions.tsx` (CRUD UI)

## 가이드 기준 및 보안 규정

- **Version Policy**: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준 유지
- **보안**: `auth.signIn()` 등 구버전 API 금지, `service_role` 키 노출 절대 금지
- **디자인**: 프리미엄 에스테틱 및 마이크로 애니메이션 지향

## Ch10 마무리 (게시글 CRUD) 요약
- **인증**: Supabase Auth 이메일/비밀번호 연동 완료
- **CRUD**: 목록(Select), 상세(Single Select), 작성(Insert), 수정(Update), 삭제(Delete) 구현 완료
- **보안 상태**: 클라이언트 UI 분기는 완료되었으나, 실제 보안은 Ch11 RLS에서 완성 예정

## Ch11 시작 전 확인 항목
1. `NEXT_PUBLIC_SUPABASE_URL` 및 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 환경변수 최종 확인
2. 상세 페이지(`/posts/[id]`)와 목록에서 작성자 UI 분기(`user.id === post.user_id`) 정상 동작 확인
3. 수정 페이지(`/posts/[id]/edit`)의 데이터 로딩 및 저장 성공 여부 확인
4. `middleware.ts`가 수정 경로(`/posts/*/edit`)도 정확히 리다이렉트하는지 확인
5. **다음 목표:** Supabase RLS 정책을 통해 DB 레벨의 작성자 권한 보안 강제

_문서 마지막 업데이트: 2026-05-20_
