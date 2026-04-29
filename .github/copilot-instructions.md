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

Last updated: 2026-04-29
