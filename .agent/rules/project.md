# Project agent rules (Ch9-aware)

이 파일은 에이전트(Copilot, Explore, 기타 도구)가 이 레포에서 자동화 작업을 할 때 따라야 할 규칙을 정리합니다.

- App Router 기반(Next.js 16.2.1)으로 코드 작성 권장
- 인증: 이메일/비밀번호만 사용 (소셜 로그인 금지)
- Supabase SDK: @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 기준으로 프롬프트 작성
- Auth 호출: `signInWithPassword`, `signUp`, `signOut` 사용. 구버전 `auth.signIn()` 사용 금지
- 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 사용
- 보호 라우트 구현: `middleware.ts`로 비로그인 사용자를 `/login`으로 리다이렉트
- 보안: 서비스 키(service_role)는 절대 클라이언트에 노출 금지

참고: 실제 `package.json` 버전과 차이가 날 수 있습니다. 빌드 오류가 발생하면 `package.json`을 근거로 원인을 찾아야 합니다.
