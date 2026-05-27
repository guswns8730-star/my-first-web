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
  const [errors, setErrors] = useState<{ title?: string; content?: string; server?: string }>({});

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (!title.trim()) {
      newErrors.title = "제목을 입력해 주세요.";
    } else if (title.trim().length < 2) {
      newErrors.title = "제목은 최소 2자 이상이어야 합니다.";
    }

    if (!content.trim()) {
      newErrors.content = "내용을 입력해 주세요.";
    } else if (content.trim().length < 10) {
      newErrors.content = "내용은 최소 10자 이상 입력해 주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!user) {
      router.push("/login"); // 미들웨어가 처리하지만 추가 안전망
      return;
    }

    if (!validate()) return;

    setLoading(true);
    const supabase = createClient();

    try {
      // 1. 프로필 확인/생성
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
        title: title.trim(),
        content: content.trim(),
        user_id: user.id,
      });

      if (error) throw error;

      router.push("/posts");
      router.refresh();
    } catch (err: any) {
      console.error("저장 오류:", err);
      const { getErrorMessage } = await import("@/lib/error-message");
      setErrors({ server: getErrorMessage(err) });
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
            {errors.server && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {errors.server}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">제목</label>
              <Input
                id="title"
                placeholder="관심을 끌만한 제목을 적어주세요"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className={`w-full text-lg py-6 rounded-xl transition-all ${errors.title ? 'border-red-500 focus-visible:ring-red-500/20' : ''}`}
                disabled={loading}
              />
              {errors.title && <p className="mt-2 text-sm text-red-500 font-medium">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">본문</label>
              <textarea
                id="content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
                className={`w-full rounded-xl border px-4 py-3 resize-y focus:outline-none focus:ring-2 transition-all min-h-[300px] text-base ${errors.content ? 'border-red-500 focus:ring-red-500/20' : 'border-input focus:ring-blue-500/20 focus:border-blue-500'}`}
                placeholder="내용을 자유롭게 작성하세요..."
              />
              {errors.content && <p className="mt-2 text-sm text-red-500 font-medium">{errors.content}</p>}
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
