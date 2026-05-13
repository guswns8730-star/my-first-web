"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  const handleSignOut = async () => {
    setBusy(true)
    try {
      const res = await signOut()
      if (!res?.error) {
        router.push("/")
      } else {
        // 간단한 오류 처리
        alert(res.error.message)
      }
    } catch (e: any) {
      alert(e?.message || "로그아웃 중 오류가 발생했습니다.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 shadow-md z-10 text-sm md:text-base">
      <div className="max-w-screen-md mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight hover:text-gray-300 transition-colors">
          내 블로그
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            홈
          </Link>
          <Link href="/posts" className="hover:text-gray-300 transition-colors">
            블로그
          </Link>

          {user ? (
            <>
              <Link href="/posts/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm shadow-sm">
                새 글 쓰기
              </Link>
              <button
                onClick={handleSignOut}
                disabled={loading || busy}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                {loading || busy ? "로그아웃..." : "로그아웃"}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 transition-colors">
                로그인
              </Link>
              <Link href="/signup" className="hover:text-gray-300 transition-colors">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
