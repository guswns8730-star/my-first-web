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

### SQL 예시: `profiles` + `posts` (간단한 DDL)

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 데이터 모델 (간단 버전: `users` 및 `posts`)

교수님 노션에 명시된 기본 요구사항에 맞춰, `profiles` 대신 더 간단한 `users` 테이블과 `posts` 테이블 버전을 명시합니다. 이 모델은 Supabase의 `auth.users`를 사용하지 않는 간단한 경우 또는 교육용 예제로 적합합니다.

#### 테이블: `users`
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `email` VARCHAR(255) NOT NULL UNIQUE
- `name` VARCHAR(255)
- `avatar_url` TEXT
- `role` VARCHAR(50) NOT NULL DEFAULT 'user'
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

#### 테이블: `posts`
- `id` UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `title` VARCHAR(500) NOT NULL
- `content` TEXT NOT NULL
- `author_id` UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT now()

관계: `users` 1 : `posts` N (각 포스트는 하나의 작성자(user)를 가집니다). 필요 시 `slug`, `status`, `published_at`, `summary`, `tags` 등의 컬럼을 추가하여 확장하세요.

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

## 6.1) 컴포넌트 구조 (shadcn/ui 기준)

아래는 shadcn/ui에서 제공하는 기본 컴포넌트들을 프로젝트 구조에 어떻게 배치하고 사용할지에 대한 설계 지침입니다. 각 컴포넌트는 `components/ui/`의 shadcn 컴포넌트를 우선 사용하고, 프로젝트 특화 로직은 `components/` 폴더에 래핑하여 배치합니다.

- `Button` — 상호작용이 필요한 모든 액션(저장, 삭제, 편집, 목록 이동)에서 사용합니다.
  - 위치: `components/ui/button.tsx` (shadcn 원본), 래퍼는 `components/Button.tsx`
  - 스타일: 기본 `variant='default'`, 중요 액션은 `variant='destructive'` 또는 `className='px-4 py-2'`

- `Card` — 포스트 목록의 각 항목, 추천 포스트, 저자 요약 등에 사용합니다.
  - 위치: `components/ui/card.tsx`, 래퍼 `components/PostCard.tsx`
  - 내용: 제목, 요약, 메타(작성자, 날짜), 태그(선택)

- `Input` — 검색바, 폼 입력(제목, 요약) 등 단순 입력에 사용합니다.
  - 위치: `components/ui/input.tsx`, 래퍼 `components/Form/Input.tsx`
  - 모바일: `w-full`을 기본으로 하여 반응형 보장

- `Dialog` — 삭제 확인, 로그인/회원가입 모달, 포스트 미리보기 등 대화형 모달에 사용합니다.
  - 위치: `components/ui/dialog.tsx`, 래퍼 `components/Dialog/*`
  - 접근성: 포커스 트랩과 키보드 내비게이션 지원

- `Card` + `Button` 조합 예시
  - 포스트 목록: `PostList`가 `PostCard(Card)`들을 렌더링하고, 각 카드 하단에 `Button`(읽기, 편집)이 위치합니다.

컴포넌트 배치 규칙
- 가능한 경우 shadcn의 시맨틱 컴포넌트를 사용하고, 스타일/행동을 변경할 때만 래퍼를 추가합니다.
- `components/` 내 래퍼는 props 타입을 명확히 하고 간단한 유틸(UTC→로컬 날짜 포맷 등)을 포함합니다.
- 모든 상호작용 컴포넌트는 접근성(aria-*), 키보드 네비게이션, 그리고 모바일 뷰 테스트를 거칩니다.

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

## 10) shadcn/ui 컴포넌트 계층 (권장)

프로젝트에서 shadcn/ui를 기본 UI 레이어로 사용하고, 고유 로직은 `components/`에 래핑하여 유지합니다.

- `components/ui/*` — shadcn에서 생성된 원본 컴포넌트(버튼, 카드, 입력 등)
- `components/*` — 앱 전용 래퍼(예: `PostCard.tsx`, `Header.tsx`, `Editor.tsx`)로 shadcn 컴포넌트를 조합
- `app/*`의 페이지에서 `components/*`를 사용하여 비즈니스 로직과 UI를 분리

권장 계층 예시:

- `components/ui/button.tsx` (shadcn 원본)
- `components/Button.tsx` (프로젝트 전역 버튼 래퍼: variant 기본값 등)
- `components/PostCard.tsx` (Card + Meta + CTA 조합)
- `components/PostList.tsx` (PostCard 반복 렌더링, 페이징/필터링 담당)

이점: 디자인 토큰과 접근성 규칙을 중앙에서 관리하고, 페이지별 로직은 가볍게 유지할 수 있습니다.

## 11) 디자인 토큰 (권장: `app/globals.css`)

간단한 CSS 변수로 색상/레이디우스/쉐도우를 정의하여 shadcn과 Tailwind의 스타일을 일관되게 유지합니다.

예시 (추가/병합):

```css
:root {
  --primary: 220 70% 50%; /* H S L */
  --primary-foreground: 0 0% 100%;
  --background: 0 0% 98%;
  --card: 0 0% 100%;
  --radius-sm: 6px;
  --radius-md: 10px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
}
```

Tailwind 설정(선택): `tailwind.config.js`에서 `theme.extend`로 토큰을 매핑하거나, shadcn의 CSS 변수와 연동하세요.

## 12) DB 스키마 (명시된 요구: `users`, `posts`, FK 관계)

간단하고 교육용으로 적합한 SQL DDL 예시입니다. Supabase PostgreSQL에 바로 적용 가능합니다.

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft | published
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

설계 노트:
- 인증을 Supabase Auth로 위임하면 `users` 테이블 대신 Supabase의 `auth.users`를 참조하는 `profiles` 테이블을 사용하는 것이 권장됩니다.
- 비밀번호 해시를 직접 관리하려면 보안(암호화, 비밀번호 정책, 레이트 리미트)을 추가하세요. Supabase Auth 사용을 권장합니다.

## 13) 인증 (Supabase 이메일/비밀번호)

- 권장 흐름: Supabase Auth(Email/Password)를 사용하여 인증을 처리하고, 추가 프로필 정보는 `profiles` 또는 `users` 테이블에 저장합니다.
- 클라이언트: `@supabase/supabase-js`를 사용하여 로그인/로그아웃/세션 관리를 구현
- 서버(앱 라우터): 서버 컴포넌트에서 `cookies()` 또는 Supabase 서버 SDK(서비스 키는 서버 전용)로 인증 확인

핵심 구현 포인트:
- 회원가입: `supabase.auth.signUp({ email, password })` 후 추가 프로필을 `profiles`에 생성
- 로그인: `supabase.auth.signInWithPassword({ email, password })`
- 보호된 페이지: 서버에서 세션 확인, 클라이언트에서는 `useUser()` 같은 헬퍼로 상태 확인

### 인증 흐름 (Ch9)

- **시나리오**: `signup` → `login` → `posts` (글쓰기 접근은 로그인 필요)
- **헤더 상태 분기**:
  - 비로그인: `로그인`, `회원가입` 링크 표시
  - 로그인: `새 글 쓰기` 링크(`/posts/new`), `로그아웃` 버튼 표시
- **보호 라우트 목록**:
  - `/posts/new` (필수)
  - (선택) `/mypage` 및 하위 경로 — 프로젝트에서 구현 시 보호 대상에 포함

위 규칙은 Ch9의 목표(이메일/비밀번호 인증, 로그인 상태 전역 공유, 보호 라우트)를 명확히 하기 위한 것입니다.

### Ch9 구현 규칙 요약

- **교재 기준 버전**: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2
- **환경변수**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **클라이언트 인증 API**: `supabase.auth.signInWithPassword({ email, password })`, `supabase.auth.signUp({ email, password, options })`, `supabase.auth.signOut()` 사용
- **라우터 규칙**: App Router만 사용. `next/router` 및 pages router 사용 금지
- **보호 라우트 구현**: `middleware.ts`에서 비로그인 사용자를 `/login`으로 리다이렉트
- **보안**: service_role 및 서버 전용 키는 서버 전용으로 보관. 클라이언트에 노출 금지

위 규칙은 Ch9 학습 목표(이메일/비밀번호 인증, 로그인 상태 전역 공유, `/posts/new` 보호)를 단순하고 일관되게 구현하기 위한 것입니다.

## 14) 페이지별 주요 컴포넌트 및 데이터 흐름

아래는 각 라우트의 주요 컴포넌트와 서버/클라이언트 간 데이터 흐름 요약입니다.

- `/` — 홈 (포스트 목록)
  - 주요 컴포넌트: `Header`, `SearchBar`, `PostList`, `Footer`
  - 데이터 흐름: 서버(SSR)에서 최신 공개 포스트를 쿼리(예: Supabase `posts` where status='published') → `PostList`에 전달 → 클라이언트에서 페이징/필터/검색은 API 라우트 또는 클라이언트 검색 호출로 처리

- `/posts` — 포스트 목록
  - 주요 컴포넌트: `PostList`(내부적으로 `PostCard` 반복), `Pagination`, `TagFilter`
  - 데이터 흐름: 서버에서 초기 페이지 데이터 로드(SEO) → 클라이언트에서 필터/정렬 시 API 호출 또는 SWR/React Query로 동적 갱신

- `/posts/new` — 포스트 작성
  - 주요 컴포넌트: `Editor`(제목, content, 태그 입력), `Button`(저장/발행)
  - 데이터 흐름: 페이지는 보통 `use client`로 작성(편집기 상호작용 필요) → 저장 시 클라이언트가 API 엔드포인트에 POST → 서버는 인증(세션) 확인 후 DB에 insert

- `/posts/[id]` — 포스트 상세
  - 주요 컴포넌트: `PostDetail`(`article` + `prose`), `AuthorCard`, `Comments`
  - 데이터 흐름: 서버에서 포스트 로드(SEO 목적으로 SSR) → 렌더링 → 클라이언트는 댓글/상호작용(좋아요 등)을 비동기 API로 처리

공통 패턴:
- 가능하면 서버에서 초기 데이터를 가져와 SSR/SEO를 지원합니다.
- 클라이언트 상호작용(편집, 폼, 실시간 업데이트)은 `use client` 컴포넌트로 분리하고, API 라우트 또는 Supabase 클라이언트를 호출합니다.

---

_Last updated: 2026-04-30_
