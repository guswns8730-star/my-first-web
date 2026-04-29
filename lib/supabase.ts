import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!url || !anonKey) {
  // 로컬 개발 시 환경변수가 없는 경우 경고를 남깁니다.
  // 프로덕션에서는 환경변수를 반드시 설정하세요.
  // (여기서는 런타임에서 undefined를 던지지 않도록 빈 문자열 기본값을 사용함)
  // eslint-disable-next-line no-console
  console.warn('Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다.');
}

export const supabase = createClient(url, anonKey);

export default supabase;
