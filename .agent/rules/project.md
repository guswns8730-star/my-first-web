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

## Version Policy

- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json이 더 최신일 수 있다.
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.

## Ch10 보충 규칙

- **패키지 버전**: 교재 기준(Ch7·Ch8)과 실제 `package.json` 버전을 함께 명시하세요.
- **Supabase 클라이언트**: 브라우저/클라이언트 쪽에서는 `lib/supabase/client.ts`를 사용하도록 권장합니다.
- **인증/컨텍스트**: 전역 인증은 `contexts/AuthContext.tsx`의 `AuthProvider`/`useAuth()`를 통해 접근하도록 요구합니다.
- **posts 스키마**: Ch8 기준(고정) — `id`, `user_id`, `title`, `content`, `created_at`. `profiles.id`는 `auth.users(id)`를 참조합니다. 컬럼명은 임의 변경하지 마세요.
- **UI vs 보안**: 수정/삭제 관련 UI는 Ch10에서 구현하지만 권한 검증(실제 보안)은 Ch11 RLS에서 처리됨을 명시하세요.
