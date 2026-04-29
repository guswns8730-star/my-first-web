import supabase from './supabase';

// 간단한 인증 헬퍼 (프론트엔드/클라이언트에서 사용)
export async function signInWithEmail(email: string, password: string) {
  try {
    return await supabase.auth.signInWithPassword({ email, password });
  } catch (e) {
    console.error('signInWithEmail error', e);
    throw e;
  }
}

export async function signOut() {
  try {
    return await supabase.auth.signOut();
  } catch (e) {
    console.error('signOut error', e);
    throw e;
  }
}

export async function getSession() {
  try {
    const res = await supabase.auth.getSession();
    // v2 client returns { data: { session } }
    // normalize: return session or null
    // @ts-ignore
    return res?.data?.session ?? null;
  } catch (e) {
    console.error('getSession error', e);
    return null;
  }
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  // v2: returns { data: { subscription } }
  // @ts-ignore
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return data?.subscription ?? data;
}
