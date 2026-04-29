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
