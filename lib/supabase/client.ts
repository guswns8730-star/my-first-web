import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // @supabase/ssr의 createBrowserClient를 사용하여
  // 브라우저 환경 전용 클라이언트를 생성합니다.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
