# TODO — my-first-web

아래는 Ch8(연결), Ch9(인증), Ch10(포스트 CRUD)을 준비하기 위한 우선순위 TODO 목록입니다. 각 항목은 사람이 확인하고 진행할 수 있도록 구체적으로 작성했습니다.

## 완료된 항목
- [x] 홈 페이지 (`/`) — 포스트 목록
- [x] 헤더/푸터 레이아웃
- [x] 포스트 목록/상세 조회 및 Supabase 연동 (Read)
- [x] 포스트 작성 페이지 및 기능 연결 (Create)
- [x] 게시글 수정 및 삭제 UI/로직 구현 (Update, Delete)
- [x] `middleware.ts` 보호 라우트 확장 완료
- [x] `npm run build` 및 보안 스캔(Grep) 검증 통과 

## 1단계: Supabase 연결 및 인증 (Ch8 → Ch9)
- [ ] Supabase 프로젝트 생성 및 환경변수 설정 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] `lib/supabase/client.ts` 존재 및 동작 확인 (브라우저/클라이언트용 생성기)
- [ ] 서버/배포용 키는 클라이언트에 노출하지 않도록 설정
- [ ] `db/schema.sql`의 스키마가 Supabase에 적용되었는지 확인 (특히 `posts` 테이블 컬럼)
- [ ] `lib/auth.ts`에 `signInWithPassword`, `signUp`, `signOut` 래퍼 구현

### Ch9 핵심 작업

- [ ] 회원가입 페이지 구현 (`app/signup/page.tsx`) — `lib/auth.ts` 사용
- [ ] 로그인 페이지 구현 (`app/login/page.tsx`) — `lib/auth.ts` 사용
- [ ] 전역 인증 컨텍스트 완성: `contexts/AuthContext.tsx` (`AuthProvider` 및 `useAuth()` 검증)
- [ ] 헤더 로그인 상태 분기 구현 (`components/Header.tsx`에 `useAuth()` 연결)
- [ ] 보호 라우트 적용 확인: `middleware.ts`가 `/posts/new`(또는 보호할 라우트)을 리다이렉트하는지 확인

## 2단계: 보안 강화 (Ch11 RLS)
- [ ] Supabase Dashboard에서 `posts`, `profiles` 테이블 RLS Enable
- [ ] 본인의 글만 수정/삭제 가능하도록 Policy 작성
- [ ] 서비스 역할(`service_role`) 없이 익명/인증 사용자 권한 분리 테스트

## 3단계: 미디어 및 기능 확장
- [ ] 이미지 업로드 및 Supabase Storage 연동 (커버 이미지 등)
- [ ] 마이페이지(`/mypage`) — 프로필 편집, 작성글 목록

## Version Policy

- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json이 더 최신일 수 있다.
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.

## 3단계: 계정·개선·배포
- [ ] 마이페이지(`/mypage`) — 프로필 편집, 작성글 목록
- [ ] 인증 UX 개선(이메일 확인, 비밀번호 재설정 등)
- [ ] 권한/롤 관리 기초(프런트에서의 UX 분기)
- [ ] 댓글, 태그 등 확장 기능

## Ch10 시작 전 검증 항목 (사람 체크리스트)

1. `NEXT_PUBLIC_SUPABASE_URL`와 `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 로컬/배포 환경에 설정되어 있는가
2. `lib/supabase/client.ts`가 존재하며 예외 처리가 되는가
3. `contexts/AuthContext.tsx`의 `AuthProvider`/`useAuth()`가 로그인/로그아웃을 반영하는가
4. `db/schema.sql`이 Supabase에 적용되어 `posts` 테이블의 컬럼이 존재하는가
5. `middleware.ts`가 보호 라우트를 제대로 리다이렉트하는가
6. `package.json`의 Supabase 관련 버전이 교재 기준과 다르면 문서에 기록했는가

_작성 일자: 2026-05-18_

