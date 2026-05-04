## my-first-web — Copilot 작업 지침 초안

이 파일은 이 레포에서 Copilot(또는 유사한 AI 도구)이 코드 변경, 문서 작성, 컴포넌트 생성 등을 수행할 때 따를 규칙을 정리합니다. 목적은 일관성 유지, 안전한 변경, 그리고 학습 과제 요구사항(Next.js App Router, Tailwind, shadcn/ui, Supabase)을 충족하는 것입니다.

1) Next.js App Router 사용 규칙
- 라우트는 `app/` 디렉터리 기반으로 작성합니다. `pages/` 디렉터리는 사용하지 마세요.
- 가능한 경우 Server Component(기본)를 사용하세요. 브라우저 이벤트나 상태가 필요한 경우에만 `"use client"`를 추가합니다.
- 라우트에서 클라이언트 네비게이션이 필요하면 `next/navigation`의 `useRouter`, `redirect`, `cookies()` 등 적절한 API를 사용하세요.
- 데이터 페칭은 서버에서 수행하여 SSR/SEO를 우선합니다. 클라이언트 상호작용(편집기, 폼, 실시간)은 클라이언트 컴포넌트로 분리합니다.

2) TypeScript와 Tailwind CSS 사용 규칙
- 프로젝트는 TypeScript를 사용합니다. 새 파일/컴포넌트는 타입(Props, API 응답 타입 등)을 명시하세요.
- Tailwind 클래스를 사용하여 스타일을 작성하되, 반복되는 스타일은 컴포넌트 내부에서 변수나 유틸 함수로 추출하세요.
- 본문/문단 가독성은 `prose prose-lg prose-neutral`(Tailwind Typography)을 권장합니다.
- CSS 전역 변수(`app/globals.css`)에 디자인 토큰을 정의하고 Tailwind `theme.extend`와 연동하세요.

3) Design Tokens (권장값)
- `app/globals.css`에 아래 토큰을 정의하세요:

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

- 색상 토큰은 shadcn과 Tailwind에서 일관되게 사용되도록 매핑하세요.

4) Component Rules (shadcn/ui 사용 규칙)
- shadcn/ui에서 생성된 원본은 `components/ui/*`에 보관합니다. 이 파일들은 가능하면 수정하지 말고, 프로젝트 레벨의 래퍼를 `components/*`에 만드세요.
- 래퍼 예: `components/Button.tsx`는 기본 variant, 사이즈, 공통 props를 설정합니다. `components/PostCard.tsx`는 `components/ui/card`를 조합해 메타·CTA를 포함합니다.
- 접근성: 모든 인터랙티브 컴포넌트는 `aria-*` 속성, 키보드 내비게이션, 포커스 스타일을 갖추어야 합니다.
- 스타일은 CSS 변수(디자인 토큰)를 우선 사용하고, Tailwind는 보조적으로 사용하세요.

5) 파일/디렉터리 규칙
- 페이지: `app/<route>/page.tsx` (Server Component 권장)
- 클라이언트 컴포넌트: 파일 상단에 `"use client"` 명시
- 공통 컴포넌트: `components/` — 비즈니스 로직이 포함된 래퍼
- UI primitives: `components/ui/` — shadcn 원본

6) 데이터 및 API 규칙
- 서버에서 DB 쿼리는 서버 컴포넌트(또는 서버 전용 유틸)를 통해 수행하세요. 클라이언트는 인증된 API 또는 Supabase 클라이언트를 통해 쓰기 작업을 수행합니다.
- Type 안전성을 위해 API 응답 타입을 정의하고 사용하세요.

7) 인증(간단 가이드)
- Supabase Auth(Email/Password)를 권장합니다. 서비스 키는 절대 클라이언트에 노출하지 마세요.
- 서버에서 인증 검증이 필요하면 Supabase 서버 SDK나 `cookies()`를 사용해 세션을 확인하세요.

8) AI가 자주 틀릴 수 있는 주의사항
- App Router vs Pages Router: App Router 프로젝트에서 `next/router` 또는 `pages/` 패턴을 사용하지 마세요.
- `use client` 남용: 불필요한 `use client`는 퍼포먼스와 SEO에 악영향을 줍니다. 상호작용이 필요한 컴포넌트에만 사용하세요.
- 환경변수 노출: `NEXT_PUBLIC_` 접두사가 없는 비밀 키를 클라이언트에 노출하지 마세요.
- 데이터 패칭 위치: 서버에서 초기 데이터를 가져와 SEO를 지원해야 하는데, AI는 종종 모든 페칭을 클라이언트로 보내는 실수를 합니다.
- shadcn 수정: shadcn 원본을 직접 광범위하게 수정하지 마세요. 대신 래퍼로 변경을 적용하세요.
- 보안/인증: 패스워드 해시, 토큰 처리 관련 코드는 직접 구현하지 말고 Supabase Auth 같은 검증된 서비스를 사용하세요.

9) 커밋 메시지 및 PR 규칙 (간단)
- 작은 변경: `fix:`, `feat:`, `chore:` 접두사를 사용하세요.
- 문서: `docs:` 접두사 사용
- PR 설명에 변경 요약, 관련 파일, 로컬 테스트 방법 포함

이 초안은 프로젝트에 맞춰 조정할 수 있습니다. 원하시면 이 규칙을 바탕으로 `.github/CONTRIBUTING.md` 또는 PR 템플릿을 생성해드리겠습니다.
