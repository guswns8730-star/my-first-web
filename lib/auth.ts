import { createClient } from "./supabase/client";

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return result;
}

export async function signUpWithEmail(email: string, password: string, name?: string) {
  const supabase = createClient();
  const result = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: name ? { name } : undefined,
    },
  });
  return result;
}

export async function signOut() {
  const supabase = createClient();
  const result = await supabase.auth.signOut();
  return result;
}
