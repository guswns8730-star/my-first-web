## 개인 블로그 개발 가이드 (Ch10 완료 기준)

### 1. 기술 스택 및 환경
- **Next.js 16.2.1** (App Router 전용, `next/router` 금지)
- **Supabase Auth & Database** (`@supabase/ssr` 0.5.2 기준 사용)
- **UI**: shadcn/ui + Tailwind CSS 4

### 2. 데이터 모델 규칙 (중요)
- `posts` 테이블 컬럼: `id`, `user_id`, `title`, `content`, `created_at`
- 컬럼명을 임의로 수정하거나 별칭을 사용하지 마세요.
- 모든 API 요청은 `lib/supabase/client.ts` 또는 `server.ts`의 클라이언트를 사용합니다.

### 3. 인증 및 권한 규칙
- 인증 상태 확인은 전역 `useAuth()` 훅을 사용합니다.
- **수정/삭제 버튼**: 작성자 본인(`user.id === post.user_id`)일 때만 노출하는 UX 로직을 준수하세요.
- **보안**: 클라이언트 측의 `if`문 분기는 보안이 아닙니다. 실제 물리적 보안은 Ch11 RLS 정책에서 완성됨을 인지하고 작업합니다.
- **민감 정보**: `service_role` 키는 서버 전용 환경 변수에 보관하며, 클라이언트 코드에 절대 노출하지 않습니다.

### 4. 코드 스타일
- 프리미엄 에스테틱: 가독성 높은 폰트 사이즈, 부드러운 애니메이션(`animate-in`), 카드 기반 레이아웃을 유지합니다.
- `prose prose-lg`를 사용하여 블로그 본문 가독성을 극대화합니다.

_마지막 업데이트: 2026-05-20_
