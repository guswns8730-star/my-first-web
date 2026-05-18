"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { signInWithEmail, signUpWithEmail, signOut as authSignOut } from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithEmail: typeof signInWithEmail;
  signUpWithEmail: typeof signUpWithEmail;
  signOut: typeof authSignOut;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // 컴포넌트 마운트 상태 추적 (메모리 누수 방지)
    let mounted = true;

    const checkInitialSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted) {
        setUser(data?.user ?? null);
        setLoading(false);
      }
    };

    checkInitialSession();

    // 로그인/로그아웃 등 세션 상태 변화 감지 리스너
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    // cleanup: 컴포넌트 언마운트 시 구독 해제 필수
    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut: authSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 편의성을 위한 커스텀 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
