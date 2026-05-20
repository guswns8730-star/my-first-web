"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function NewPostWireframe() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 본문을 모두 입력하세요.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      // 1. 프로필이 있는지 먼저 확인 (없으면 생성 시도)
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          username: user.user_metadata?.name || user.email?.split("@")[0] || "익명",
        });
      }

      // 2. 게시글 저장
      const { error } = await supabase.from("posts").insert({
        title,
        content,
        user_id: user.id,
      });

      if (error) throw error;

      alert("게시글이 성공적으로 저장되었습니다!");
      router.push("/posts");
      router.refresh();
    } catch (error: any) {
      console.error("저장 오류:", error);
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-bold">새 게시글 작성</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">당신의 생각을 공유해보세요.</p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CardContent className="p-6">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">제목</label>
              <Input
                id="title"
                placeholder="관심을 끌만한 제목을 적어주세요"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className="w-full text-lg py-6"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">본문</label>
              <textarea
                id="content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-input px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[300px] text-base"
                placeholder="내용을 자유롭게 작성하세요..."
              />
            </div>
          </CardContent>

          <CardFooter className="p-6 flex justify-end gap-3 bg-gray-50/50 border-t">
            <Button variant="outline" type="button" onClick={() => router.back()} disabled={loading}>
              취소
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              {loading ? "저장 중..." : "게시하기"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
