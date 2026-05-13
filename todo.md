# TODO — my-first-web

# TODO — my-first-web

아래는 앞으로 진행할 주요 작업을 1/2/3 단계로 나눈 체크리스트입니다. 현재 완료된 항목은 체크되어 있으며, 맨 아래에 전체 진행률을 표시합니다.

## 완료된 주요 항목
- [x] 홈 페이지 (`/`) — 포스트 목록
- [x] 헤더/푸터 레이아웃
- [x] 포스트 목록 페이지 (`/posts`) 및 `getPosts` 구현
- [x] 포스트 상세 페이지 UI 및 `getPostById` 연결
- [x] shadcn/ui 초기화 및 핵심 primitives 추가 (`components/ui/*`)
- [x] `ARCHITECTURE.md`, `copilot-instructions.md` 문서 보강

---

## 1단계: Supabase 연결 및 인증 (우선)
- [ ] Supabase 프로젝트 생성 및 환경변수 설정 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] `lib/supabase.ts` 초기화 및 안전한 폴백 처리
- [ ] `profiles` 또는 `users` 테이블 스키마 확정 및 `db/schema.sql` 반영
- [ ] 이메일/비밀번호 기반 인증(가입/로그인) — Supabase Auth 연동

### Ch9 작업 (우선순위 업데이트)

- [ ] `lib/auth.ts` 구현: `signInWithEmail`, `signUpWithEmail`, `signOut`
- [ ] `contexts/AuthContext.tsx` (또는 `components/AuthProvider.tsx`) 생성 — `useAuth()` 훅 제공
- [ ] `app/login/page.tsx`, `app/signup/page.tsx` 구현 (간단한 입력/오류 처리/리다이렉트)
- [ ] `app/layout.tsx`에 `AuthProvider` 연결
- [ ] `/posts/new` 보호: `middleware.ts`로 비로그인 사용자 리다이렉트
- [ ] 문서 업데이트: `context.md`, `.github/copilot-instructions.md`, `ARCHITECTURE.md`에 Ch9 규칙 반영

## 2단계: 포스트 CRUD 및 미디어
- [ ] 포스트 작성 페이지 `/posts/new` (리치/마크다운 에디터 포함)
- [ ] 포스트 생성 API 구현 (POST 엔드포인트, 서버 인증 검증)
- [ ] 포스트 상세 읽기/수정/삭제 기능 (권한 검사 포함)
- [ ] 이미지 업로드 및 관리 (Supabase Storage 연동)

## 3단계: 계정·개인화·배포
- [ ] 마이페이지(`/mypage`) — 프로필 편집, 작성글 목록
- [ ] 로그인/회원가입 UX 개선(이메일 확인, 비밀번호 재설정 등)
- [ ] 권한/롤 관리 (author/admin)
- [ ] 댓글 기능 및 추가 메타(태그, 카테고리)
- [ ] 배포 설정 및 환경(예: Vercel) — 환경변수 적용 확인

---

전체 진행률 계산: 총 항목 15개 중 완료 6개 → 진행률: 40%

