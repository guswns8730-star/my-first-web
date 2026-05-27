"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !email || !password) {
      setErrorMsg("이름, 이메일, 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    const { error } = await signUpWithEmail(email, password, name);
    setLoading(false);

    if (error) {
      const { getErrorMessage } = await import("@/lib/error-message");
      setErrorMsg(getErrorMessage(error));
    } else {
      setSuccessMsg("가입 완료. 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        router.push("/login");
      }, 1500); 
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">회원가입</h1>
        
        <form onSubmit={handleSignup} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-200 text-center animate-pulse">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium border border-green-200 text-center">
              {successMsg}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              이름 (닉네임)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="최소 6자 이상의 비밀번호"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-lg text-white font-semibold transition-all ${
              loading 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow"
            }`}
          >
            {loading ? "가입 처리 중..." : "회원가입 하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
