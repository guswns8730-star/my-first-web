"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PostActionsProps {
  postId: string;
  userId: string;
}

export default function PostActions({ postId, userId }: PostActionsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  // 본인의 글이 아니면 버튼을 보여주지 않음 (UX)
  if (!user || user.id !== userId) return null;

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      return;
    }

    setIsDeleting(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      alert("성공적으로 삭제되었습니다.");
      router.push("/posts");
      router.refresh();
    } catch (error: any) {
      alert(`삭제 도중 오류가 발생했습니다: ${error.message}`);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Link href={`/posts/${postId}/edit`}>
        <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 font-semibold px-6">
          수정
        </Button>
      </Link>
      <Button 
        variant="destructive" 
        onClick={handleDelete} 
        disabled={isDeleting}
        className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none font-semibold px-6"
      >
        {isDeleting ? "삭제 중..." : "삭제"}
      </Button>
    </div>
  );
}
