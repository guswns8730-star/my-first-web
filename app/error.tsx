"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 개발자용 로그는 콘솔에 남깁니다.
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">앗! 문제가 발생했습니다</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
        일시적인 오류가 발생했거나 요청하신 작업을 수행할 수 없습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="rounded-xl px-8 py-6 text-lg font-semibold bg-gray-900 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          다시 시도하기
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = "/"}
          className="rounded-xl px-8 py-6 text-lg font-semibold border-gray-200 hover:bg-gray-50"
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}
