# ARCHITECTURE — my-first-web

## 개요
이 문서는 프로젝트의 아키텍처, 데이터 흐름, 그리고 보안 정책을 정의합니다.

## 1. 페이지 맵 (Route Map)
- `/` : 홈 (최신 포스트 요약)
- `/posts` : 전체 포스트 목록 **(공개)**
- `/posts/[id]` : 포스트 상세 보기 **(공개)**
- `/posts/new` : 새 포스트 작성 **(인증 필요)**
- `/posts/[id]/edit` : 포스트 수정 **(인증/작성자 권한 필요)**
- `/login` / `/signup` : 인증 페이지

## 2. 컴포넌트 구조
- **Page Components**: `app/` 내 서버 컴포넌트 중심 (데이터 페칭)
- **Shared Components**: UI 및 공통 UI 레이어 (`components/ui/*`, `components/*`)
- **CRUD Components**:
  - `PostList`: 목록 렌더링 및 클라이언트 측 검색/삭제 핸들링
  - `PostActions`: 상세 페이지 내 수정/삭제 버튼 그룹 (작성자 UX 분기)
  - `NewPostWireframe`: 게시글 작성 폼 및 저장 로직
  - `EditPostForm`: 게시글 수정 전용 폼 및 업데이트 로직

## 3. 데이터 모델 (PostgreSQL / Supabase)
- **profiles**: `id`(PK, auth.users 참조), `username`, `avatar_url`, `role`
- **posts**: `id`(PK), `user_id`(FK), `title`, `content`, `created_at`
  - *주의: 컬럼명을 임의로 변경하지 마세요.*

## 4. 데이터 흐름 (CRUD 패턴)
- **조회 (Read)**: 서버 컴포넌트에서 `lib/posts.ts`의 `getPosts()`, `getPostById()` 호출 (SSR)
- **생성 (Create)**: `/posts/new`에서 `user.id`를 포함하여 `supabase.from('posts').insert()`
- **수정 (Update)**: `/posts/[id]/edit`에서 `update().eq('id', postId)`
- **삭제 (Delete)**: `delete().eq('id', postId)`

## 5. 보안 정책 (Ch10 기준)
- **클라이언트**: `useAuth()` 기반으로 작성자(`user.id === post.user_id`)에게만 수정/삭제 버튼 노출 (UX 처리)
- **미들웨어**: `middleware.ts`에서 `/posts/new` 및 `/edit` 경로 접근 차단
- **서버 보안**: 실제 데이터 조작 권한 강제는 **Ch11 RLS(Row Level Security)**에서 처리 예정

_마지막 업데이트: 2026-05-20 (Chapter 10 완료)_
