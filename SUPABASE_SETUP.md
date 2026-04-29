# Supabase 연동 준비 가이드

이 문서는 로컬 개발 및 배포환경에서 Supabase를 연동하기 위한 최소 설정을 안내합니다.

1. Supabase 프로젝트 생성
   - https://app.supabase.com 에서 새 프로젝트를 생성합니다.
   - 프로젝트 생성 후 `Project URL`과 `anon public` 키(서비스 설정 → API)를 확인합니다.

2. 환경변수 설정 (로컬 개발)
   - 프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 추가하세요.

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # 서버 전용 키 (절대 클라이언트에 노출 금지)
```

3. 데이터베이스 스키마 적용
   - 본 레포의 `db/schema.sql`을 사용해 Supabase SQL Editor에서 스키마를 실행하세요.

4. 파일/클라이언트
   - 프런트엔드 및 SSR에서 공통으로 사용할 수 있도록 `lib/supabase.ts`를 추가했습니다.
   - 클라이언트 코드에서는 `import { supabase } from '@/lib/supabase'`로 사용하세요.

5. 배포 시 주의
   - Vercel 등 배포 환경에는 위 환경변수를 프로젝트 환경설정에 추가하세요.
   - `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용 API에서만 사용하고 절대 클라이언트에 노출하지 마세요.

6. 인증(간단 가이드)
   - Email 기반 인증을 사용하려면 Supabase Auth 설정에서 이메일 템플릿을 확인하고 도메인 허용 목록을 설정하세요.

추가로 원하시면 `supabase` 초기화 예시(Next.js 서버용/클라이언트용)와 간단한 인증 훅을 생성해 드리겠습니다.

## 로컬 테스트 및 검증

다음은 로컬에서 Supabase 연동을 간단히 확인하는 방법입니다. 환경변수(`.env.local`)를 채운 뒤 진행하세요.

1) 의존성 설치 및 개발 서버 실행

```bash
npm install
npm run dev
```

2) 브라우저에서 수동 확인
- `http://localhost:3000/posts` 페이지를 열어 게시글 목록이 정상 표시되는지 확인하세요. (Supabase가 설정되어 있으면 DB에서 값이 로드됩니다.)
- `http://localhost:3000/posts/<id>`로 상세 페이지를 확인하세요.

3) 콘솔/로그 확인
- 페이지 서버 로그(터미널)에 Supabase 관련 에러가 없는지 확인하세요. `lib/postsSupabase.ts` 내부의 에러는 콘솔에 출력됩니다.

4) 간단한 HTTP 검증 (서버가 렌더한 HTML을 가져와서 상태 확인)

```bash
# 목록 페이지 HTML 확인
curl -i http://localhost:3000/posts | head -n 40

# 특정 포스트(예시 id)를 확인
curl -i http://localhost:3000/posts/1 | head -n 40
```

5) 문제 해결 팁
- 환경변수 값이 올바른지 확인하세요 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Supabase에서 `posts` 테이블과 권한(Row Level Security)이 설정되어 있는지 확인하세요. 개발 시에는 RLS를 끄고 테스트하세요.
- 콘솔에서 `supabase.from('posts').select('*')` 쿼리를 실행하여 권한/데이터를 직접 확인하세요.

