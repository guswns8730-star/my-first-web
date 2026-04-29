# ARCHITECTURE — my-first-web

## 개요
이 문서는 현재 레포의 페이지 맵, 권장 확장 페이지, 데이터 모델(관계형), 그리고 구현/디자인 관련 작업 지침을 정리합니다.

---

## 1) 현재 페이지 맵 (실제 코드 기반)
- `/` → `app/page.tsx` (홈 — 포스트 목록)
- `/posts` → `app/posts/page.tsx` (포스트 목록)
- `/posts/new` → `app/posts/new/page.tsx` (포스트 작성)
- `/posts/[id]` → `app/posts/[id]/page.tsx` (포스트 상세)
- `/mypage` → (마이페이지 — 구현 예정)
- `/login` → (로그인 — 구현 예정)
- `/signup` → (회원가입 — 구현 예정)

## 2) 보강된 페이지 맵 (권장 — App Router URL 구조)
아래는 현재 구현된 라우트와 권장 추가 라우트를 구분한 목록입니다.

### 구현된 라우트
- `/` (홈)
- `/posts` (포스트 목록)
- `/posts/new` (글쓰기)
- `/posts/[id]` (포스트 상세)

### 권장 추가 라우트
- `/posts/[id]/edit` (글 수정 — 인증/권한 필요)
- `/posts/tags/[tag]` (태그 필터)
- `/authors` (저자 목록)
- `/authors/[id]` (저자 프로필, 작성 글 목록)
- `/about` (사이트 정보)
- `/dashboard` (관리자 대시보드, 선택)

권장 라우트는 향후 기능(권한 관리, 필터링, 저자 페이지)을 고려한 확장안입니다.

## 3) 데이터 모델 제안 (관계형, 예: PostgreSQL)
아래는 최소 2개 테이블 이상과 1:N 관계를 만족하는 스키마입니다. 확장 가능하도록 설계했습니다.


### 권장 데이터 모델 (과제 명세 반영)
아래는 교수님 과제에 맞춘 최소 모델 `profiles`와 `posts`입니다. `profiles` 1 : `posts` N 관계를 만족합니다.

#### 테이블: `profiles`
- `id` UUID PRIMARY KEY -- (권장: auth.users 참조 가능)
- `username` TEXT NOT NULL
- `avatar_url` TEXT
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

#### 테이블: `posts`
- `id` UUID PRIMARY KEY
- `user_id` UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
- `title` TEXT NOT NULL
- `content` TEXT NOT NULL
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

위 모델은 간단명료하게 사용자 프로필과 포스트의 1:N 관계를 표현합니다. 필요 시 `status`, `tags`, `comments` 테이블을 확장해 추가 기능(임시저장/게시, 태깅, 댓글 등)을 넣을 수 있습니다.

### 테이블: `comments` (선택)
- `id` (UUID, PK)
- `post_id` (UUID, FK → posts.id)
- `author_name` (VARCHAR)
- `author_email` (VARCHAR, nullable)
- `content` (TEXT)
- `created_at` (TIMESTAMP)
- `approved` (BOOLEAN)

### 테이블: `tags` 및 `post_tags` (선택, 다대다)
- `tags`: `id`, `name`, `slug`
- `post_tags`: `post_id`, `tag_id` (composite PK)

### 인덱스 & 고려사항
- `posts.slug`에 unique 인덱스
- `posts.author_id` 인덱스 (조회 성능)
- `posts.published_at` 인덱스 (정렬/조회)
- `full-text` 검색을 위해 `content`에 GIN 인덱스(또는 external search)
- authentication/authorization: Supabase Auth 또는 다른 provider 권장

## 4) Copilot에게 요청할 프롬프트 예시 (데이터 모델)
- "Suggest a normalized PostgreSQL schema for a simple blog with users, posts, comments, and tags. Include SQL CREATE TABLE statements, constraints, and useful indexes. Support draft/publish states and slugs."

## 5) 와이어프레임 요청 프롬프트(예: Copilot Vision 또는 v0)
- 홈 화면, 포스트 목록, 포스트 상세, 글쓰기 화면의 간단한 와이어프레임을 요청할 때 사용할 예시:

"Create a low-fidelity wireframe for a blog: home (featured, recent), posts list (card grid with title/summary/tag), post detail (title, meta, content, comments), and an editor screen (title, tags, content editor). Provide layout suggestions for desktop (two-column) and mobile (single column)."

## 6) shadcn/ui 초기화 & 설치
- 권장 명령:

```bash
npm install @shadcn/ui
# 또는 프로젝트 지침에 따른 설치 스크립트
```
- `components/ui/`의 컴포넌트를 사용하고, 필요한 경우 커스텀 컴포넌트를 `components/`에 추가

## 7) CSS 변수: 프로젝트 색상 커스터마이즈 (예시)
- 파일: `app/globals.css` 또는 전역 CSS

```css
:root {
  --primary:  #0ea5a4; /* 예시 색상 — 프로젝트 토큰에 맞게 변경 */
  --background: #0f172a;
  --card: #111827;
}
```
- `shadcn/ui`의 토큰을 덮어써서 디자인 통일

## 8) 필요한 컴포넌트 목록 (우선순위)
- `PostList` (목록 렌더링, 페이징)
- `PostCard` (목록용 카드)
- `PostDetail` (상세 뷰 래퍼)
- `Editor` (글쓰기/수정 폼, 리치/마크다운 편집)
- `CommentList` / `CommentItem`
- `AuthorCard`
- `SearchBar` (이미 존재함)

## 9) 제출 파일 체크리스트
- ARCHITECTURE.md  (이 파일)
- .github/copilot-instructions.md (기존)
- context.md (프로젝트 문맥)
- todo.md (작업 목록)

---

_Last updated: 2026-04-29_
