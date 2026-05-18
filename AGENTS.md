<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Ch9 에이전트 가이드 (Supabase Auth 작업용)

	- App Router 기준(Next.js 16.2.1)으로 코드를 작성합니다.
	- 인증은 이메일/비밀번호만 사용합니다. 소셜 로그인은 추가하지 않습니다.
	- Supabase 호출은 `signInWithPassword`, `signUp`, `signOut` 패턴을 사용합니다. 구버전 `auth.signIn()` 호출은 금지합니다.
	- 환경변수 이름(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)을 그대로 사용합니다.
	- 보호 라우트는 `middleware.ts`로 구현합니다.

_참고_: 교육용 가이드라인이므로 실제 `package.json` 버전이 다를 수 있습니다. 버전 충돌이 의심되면 `package.json` 기준으로 수정 제안을 합니다.
## Ch10 에이전트 추가 규칙 (포스트 CRUD 준비)

- **패키지 버전 표기**: 교재 기준과 현재 설치 기준(실제 `package.json`)을 모두 문서화하세요.
- **Supabase 클라이언트**: 코드에서 브라우저/클라이언트용 Supabase는 `lib/supabase/client.ts`를 사용하도록 권장합니다.
- **인증 상태**: `contexts/AuthContext.tsx`의 `AuthProvider`와 `useAuth()`를 통해 인증 상태를 참조하세요.
- **posts 스키마 준수**: Ch8 스키마 컬럼명을 그대로 사용합니다: `id`, `author_id`, `title`, `slug`, `summary`, `content`(JSONB), `status`, `published_at`, `cover_url`, `created_at`, `updated_at`, `tsv`.
- **라우터/보안 규칙**: App Router만 사용하고 `next/router`를 사용하지 마세요. 수정/삭제 관련 UI는 Ch10에서 UX로 구현하되 권한 검증은 Ch11에서 RLS로 적용될 예정임을 명확히 하세요.
