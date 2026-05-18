@AGENTS.md

## Claude 사용 시 주의사항 (Ch9/Ch10)

- Claude에게 작업을 의뢰할 때도 위 `AGENTS.md` 규칙을 준수하세요.
- 인증 관련 코드 생성 시 이메일/비밀번호만 다루고, `service_role` 키 노출을 금지합니다.
- 포스트 CRUD 관련 요청에서는 `lib/supabase/client.ts`와 `contexts/AuthContext.tsx`(`AuthProvider`/`useAuth()`)를 사용하라는 규칙을 명시적으로 포함하세요. 또한 Ch8 스키마(특히 `posts` 컬럼명)를 준수하도록 지시하세요.

참조: [AGENTS.md](AGENTS.md)
