import { createClient as createBrowserSupabase } from './supabase/client'

/**
 * Supabase 인증 래퍼 유틸
 * - 에러는 숨기지 않고 호출자에게 반환합니다.
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createBrowserSupabase()
  const res = await supabase.auth.signInWithPassword({ email, password })
  return res
}

export async function signUpWithEmail(email: string, password: string, name?: string) {
  const supabase = createBrowserSupabase()
  const res = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: name ? { name } : undefined,
    },
  })
  return res
}

export async function signOut() {
  const supabase = createBrowserSupabase()
  const res = await supabase.auth.signOut()
  return res
}

export default {
  signInWithEmail,
  signUpWithEmail,
  signOut,
}
