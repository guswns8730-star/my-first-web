"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 shadow-md z-10 text-sm md:text-base">
      <div className="max-w-screen-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl tracking-tight hover:text-gray-300 transition-colors">
            내 블로그
          </Link>
          <div className="hidden sm:flex items-center gap-4 font-medium">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              홈
            </Link>
            <Link href="/posts" className="hover:text-gray-300 transition-colors">
              블로그
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 font-medium">
          {loading ? (
            <span className="text-gray-400 text-sm animate-pulse">로딩 중...</span>
          ) : user ? (
            <>
              <Link
                href="/posts/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm shadow-sm"
              >
                새 글 쓰기
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-sm">
                로그인
              </Link>
              <Link
                href="/signup"
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
