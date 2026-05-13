<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Ch9 에이전트 가이드 (Supabase Auth 작업용)

- 이 레포의 Ch9 작업을 자동화하거나 보조할 때 따를 규칙들:
	- App Router 기준(Next.js 16.2.1)으로 코드를 작성합니다.
	- 인증은 이메일/비밀번호만 사용합니다. 소셜 로그인은 추가하지 않습니다.
	- Supabase 호출은 `signInWithPassword`, `signUp`, `signOut` 패턴을 사용합니다. 구버전 `auth.signIn()` 호출은 금지합니다.
	- 환경변수 이름(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)을 그대로 사용합니다.
	- 보호 라우트는 `middleware.ts`로 구현합니다.

_참고_: 교육용 가이드라인이므로 실제 `package.json` 버전이 다를 수 있습니다. 버전 충돌이 의심되면 `package.json` 기준으로 수정 제안을 합니다.
