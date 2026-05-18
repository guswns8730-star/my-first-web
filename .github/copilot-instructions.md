## 개인 블로그용 개발 가이드

간결하고 읽기 쉬운 개인 블로그를 빠르게 만들기 위한 요약입니다. 핵심은 가독성, 단순한 컴포지션, 그리고 모바일 대응입니다.

### Tech Stack (권장)
- Next.js (App Router)
- React
- Tailwind CSS 4
- shadcn/ui (components/ui/에 설치)

### 레이아웃 및 타이포그래피
- 메인 컨텐츠: `max-w-4xl mx-auto px-4 py-8` — 중앙 정렬된 가독성 좋은 폭
- 본문 텍스트: `prose prose-lg prose-neutral` (Tailwind Typography 플러그인 권장)
- 글 단락 간격: `space-y-6` 또는 `prose`의 기본 간격 사용

### 주요 컴포넌트 권장 사용
- `Header` (shadcn/ui `nav` + 간단한 로고) — 클래스: `bg-background border-b` 및 내부 `container` 스타일
- `Card` (shadcn/ui `Card`) — 클래스: `rounded-lg shadow-sm p-6 bg-card` (요약 글, 포스트 목록 아이템)
- `PostList` — 각 항목은 `Card` + `Link`로 감싸고 제목은 `text-xl font-semibold`, 설명은 `text-gray-600` 사용
- `Post` 본문: `article` 내부에 `prose prose-lg`를 적용하여 가독성 극대화
- `Button` (shadcn/ui `Button`) — 기본 액션: `variant='default'` 또는 `className='px-4 py-2'`
- `Input` (shadcn/ui `Input`) — 검색바나 폼에 사용, `w-full`로 모바일에서 너비 채움

### 반응형 규칙
- 모바일: 기본적으로 한 열, `md:grid md:grid-cols-2 md:gap-6`를 필요에 따라 사용
- 텍스트 크기: `text-base` → `md:text-lg`로 조절

### 디자인 토큰 (app/globals.css에 추가)
:root {
  --primary: 220 70% 50%;
  --primary-foreground: 0 0% 100%;
  --background: 0 0% 98%;
  --card: 0 0% 100%;
}

### 접근성/가독성 체크리스트
- 충분한 색 대비
- 폰트 사이즈와 줄간격(leading-relaxed)
- 링크/버튼에 포커스 스타일 유지

### 간단한 예시 구조
- `app/layout.tsx`: 전역 `Header`, `Footer` 배치, `main`에 `max-w-4xl mx-auto px-4` 적용
- `app/posts/page.tsx`: `PostList`를 `Card`로 출력
- `app/posts/[id]/page.tsx`: `article`에 `prose` 적용

### 초급자 팁
- Tailwind 클래스가 낯설면 먼저 `Card`, `Button`, `Input` 같은 shadcn/ui 컴포넌트를 사용하세요. shadcn 컴포넌트는 시맨틱한 기본 스타일을 제공합니다.
- 글 중심 블로그는 `prose` 클래스 하나로도 충분히 예쁘게 보입니다.

Last updated: 2026-05-18

## Ch9 Supabase Auth 추가 규칙 (교육용)

- **인증 범위**: 이메일/비밀번호 인증만 사용합니다. 소셜 로그인(구글/카카오/네이버 등)은 이 장에서 추가하지 않습니다.
- **라우터**: App Router만 사용하고 `next/router` 또는 pages router 패턴은 사용하지 않습니다.
- **Auth 호출**: Supabase Auth의 구버전 `auth.signIn(...)` 호출을 사용하지 말고, `signInWithPassword` 및 `signUp` 패턴을 사용합니다.
- **환경변수**: Ch8과 동일한 환경변수 이름을 사용합니다: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **서비스 키**: `service_role` 또는 서버 전용 키는 클라이언트 번들에 절대 넣지 않습니다.
- **보호 라우트**: 이 교재에서는 보호 라우트 구현을 위해 `middleware.ts`를 사용하도록 권장합니다.

_Note:_ 위 규칙들은 Ch7/Ch8 교재 기준(Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2)에 맞춘 교육용 가이드입니다. 실제 `package.json`의 버전이 다를 경우 빌드 오류 원인은 `package.json` 기준으로 확인하세요.

## Ch10 기준 (포스트 CRUD 준비)

- **패키지 버전 표기**: 교재 기준: Next.js 16.2.1, `@supabase/supabase-js` 2.47.12, `@supabase/ssr` 0.5.2. 현재 설치 기준은 `package.json`을 따릅니다 — 문서에는 항상 "교재 기준"과 "현재 설치 기준"을 함께 병기하세요.
- **Supabase 클라이언트**: 클라이언트 생성 헬퍼는 `lib/supabase/client.ts`를 사용합니다.
- **인증/컨텍스트**: 인증 상태는 `contexts/AuthContext.tsx`의 `AuthProvider`와 `useAuth()`를 사용하여 전역으로 관리합니다.
- **posts 스키마**: Ch8의 DB 스키마 컬럼명을 그대로 사용합니다: `id`, `author_id`, `title`, `slug`, `summary`, `content`(JSONB), `status`, `published_at`, `cover_url`, `created_at`, `updated_at`, `tsv`.
- **라우터 규칙**: App Router만 사용합니다. `next/router` 및 pages router 사용은 금지합니다.
- **수정/삭제 UX vs 보안**: 포스트 수정/삭제 UI는 Ch10에서 구현하되, 실제 권한 검증(보안)은 Ch11에서 RLS로 처리합니다. UI는 UX 관점에서만 구현하세요.

_마지막 업데이트: 2026-05-18_
