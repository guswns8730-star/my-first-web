"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, onAuthStateChange, signOut } from '@/lib/auth';

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const session = await getSession();
      if (mounted) setUser(session?.user ?? null);
    })();

    const subscription = onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      if (subscription && typeof subscription.unsubscribe === 'function') subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signOut: async () => {
      await signOut();
      setUser(null);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
