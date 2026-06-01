"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function PostActions({ postId, userId }: { postId: string; userId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isAuthor = user?.id === userId;

  async function handleDelete() {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
      router.push("/posts");
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthor) return null;

  return (
    <div className="flex items-center gap-3">
      <Link href={`/posts/${postId}/edit`} className="text-sm text-blue-600 hover:underline font-medium">
        수정
      </Link>
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
        삭제
      </Button>
    </div>
  );
}
