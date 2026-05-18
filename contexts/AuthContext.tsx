"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { createClient as createBrowserSupabase } from "../lib/supabase/client"
import { signInWithEmail, signUpWithEmail, signOut as authSignOut } from "../lib/auth"

type AuthContextType = {
  user: any | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<any>
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserSupabase()

    let mounted = true

    // 초기 사용자 확인
    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!mounted) return
        setUser(data?.user ?? null)
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setUser(null)
        setLoading(false)
      })

    // auth 상태 변화 구독
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
    })

    // cleanup
    return () => {
      mounted = false
      try {
        // `data.subscription` may be undefined in some environments
        // unsubscribe if available
        ;(data as any)?.subscription?.unsubscribe()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const value: AuthContextType = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut: authSignOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export default AuthContext
