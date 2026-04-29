"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  
  // 제어 컴포넌트(Controlled Component) 패턴 요소
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // 유효성 검증을 위한 에러 상태
  const [titleError, setTitleError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 입력 유효성 검증 (빈 문자열 검사)
    setTitleError("");
    if (!title.trim()) {
      setTitleError("제목이 비어있습니다. 반드시 입력해주세요.");
      return;
    }

    // 서버 등 백엔드 로직 연동 대체
    alert(`"${title}" 게시글이 저장되었습니다!`);
    
    // 게시글 목록 페이지로 이동
    router.push("/posts");
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-4">새 게시글 작성</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              게시글 제목 <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim() !== "") setTitleError("");
              }}
              placeholder="제목을 입력하세요"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                titleError 
                ? "border-red-400 focus:ring-red-300 focus:border-red-500 bg-red-50" 
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white"
              }`}
            />
            {/* 유효성 검증 경고 출력 부분 */}
            {titleError && (
              <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">
                ⚠ {titleError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              본문 내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="여기에 생각이나 인사이트를 자유롭게 적어주세요"
              rows={12}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y bg-gray-50 hover:bg-white leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm hover:shadow-md active:scale-95 transform"
            >
              저장 및 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
