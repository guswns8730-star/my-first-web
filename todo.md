# TODO — my-first-web

아래는 프로젝트 진행 상황을 관리하기 위한 우선순위 TODO 목록입니다.

## 완료된 항목
- [x] 홈 페이지 (/) — 포스트 목록
- [x] 헤더/푸터 레이아웃
- [x] 포스트 목록/상세 UI 및 데이터 연동 (/posts, /posts/[id])
- [x] 게시글 작성/수정/삭제 기능 (/posts/new, /posts/[id]/edit)
- [x] shadcn/ui 컴포넌트 구성 (components/ui/*)
- [x] contexts/AuthContext.tsx (AuthProvider/useAuth) 구현 완료
- [x] middleware.ts를 통한 보호 라우트(new, edit) 설정 완료
- [x] **Ch11 Row Level Security (RLS) 보안 강화 완료**
- [x] **Ch12 에러 처리 및 UX 완성 (error.tsx, loading.tsx, 폼 검증, 에러 유틸)**
- [x] **npm run build 및 보안 스캔 통과**

## 최근 변경사항
- 서버측 API 보강: `app/api/posts` 계열에서 클라이언트 `user_id`를 신뢰하지 않고, 서버 세션에서 `user.id`를 확보해 생성/수정/삭제 권한을 검증하도록 변경함 (branch: fix/server-auth-posts)

## 진행 중 및 예정 항목
- [ ] 이미지 업로드 및 Supabase Storage 연동
- [ ] 마이페이지 (/mypage) — 프로필 편집, 작성글 목록
- [ ] 검색 및 필터링 기능 고도화

## Version Policy
- 교재 기준: next 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 현재 설치 기준: next 16.2.1, @supabase/supabase-js 2.105.4, @supabase/ssr 0.10.3

_마지막 업데이트: 2026-06-01_
