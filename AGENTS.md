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

## Ch10 에이전트 추가 규칙 (포스트 CRUD 완료)

- **데이터 모델 규정**: `posts` 테이블의 컬럼명(`id`, `user_id`, `title`, `content`, `created_at`)을 절대 임의로 변경하지 않습니다.
- **Supabase 클라이언트**: `lib/supabase/client.ts` (브라우저), `lib/supabase/server.ts` (서버)를 구분하여 사용합니다.
- **보안 규정**: 화면 단의 수정/삭제 버튼 노출 분기는 UX일 뿐이며, 실제 보안은 Ch11에서 RLS 정책을 통해 완성해야 함을 명시합니다.
- **라우터**: `next/router` 사용 금지, `next/navigation` 사용.
- **패키지 버전**: 교재 기준(`next` 16.2.1, `@supabase/ssr` 0.5.2)과 현재 설치 버전을 모두 인지하고 작업합니다.

## Version Policy

- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 실제 package.json이 더 최신일 수 있다.
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.
