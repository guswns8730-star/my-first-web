"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Post } from "@/lib/posts";

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // 간단한 권한 체크 (실제 보안은 RLS에서)
    if (user.id !== post.user_id) {
      alert("본인의 글만 수정할 수 있습니다.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 본문을 입력하세요.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", post.id);

      if (error) throw error;

      alert("수정되었습니다!");
      router.push(`/posts/${post.id}`);
      router.refresh();
    } catch (error: any) {
      alert(`오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b p-8">
          <CardTitle className="text-2xl font-black">글 수정하기</CardTitle>
        </CardHeader>

        <form onSubmit={handleUpdate}>
          <CardContent className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
              <Input
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="h-12 rounded-xl border-gray-200 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">본문</label>
              <textarea
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[400px]"
                disabled={loading}
              />
            </div>
          </CardContent>

          <CardFooter className="p-8 bg-gray-50 border-t flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => router.back()} disabled={loading}>
              취소
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-10 h-12 font-bold shadow-lg shadow-blue-200">
              {loading ? "저장 중..." : "수정 완료"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
