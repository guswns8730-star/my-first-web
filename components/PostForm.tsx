"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  initial?: { title?: string; content?: string; id?: string };
  onSuccess?: (id?: string) => void;
};

export default function PostForm({ initial, onSuccess }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(initial?.id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!user) {
      router.push("/login");
      return;
    }

    // 클라이언트 유효성 검사
    if (title.trim().length < 3) {
      setError("제목은 최소 3자 이상이어야 합니다.");
      return;
    }

    if (content.trim().length < 10) {
      setError("내용은 최소 10자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const body: any = { title: title.trim(), content: content.trim(), user_id: user.id };

      const url = isEdit ? `/api/posts/${initial?.id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        // 서버 에러 메시지 맵핑
        const serverMsg = data?.error || data?.message || "서버 오류가 발생했습니다.";
        setError(serverMsg);
        setLoading(false);
        return;
      }

      const newId = data?.id || initial?.id;
      onSuccess?.(newId);
      router.push(newId ? `/posts/${newId}` : "/posts");
    } catch (err) {
      setError("요청 실패");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[200px] rounded-lg border border-input px-3 py-2 resize-vertical"
          placeholder="본문을 입력하세요"
        />
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (isEdit ? "저장 중..." : "작성 중...") : isEdit ? "수정 저장" : "글 작성"}
        </Button>
        <Button variant="outline" type="button" onClick={() => router.push("/posts")} disabled={loading}>
          취소
        </Button>
      </div>
    </form>
  );
}
