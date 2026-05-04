"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewPostWireframe() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    // 와이어프레임: 실제 저장 로직은 별도 구현
    console.log({ title, content });
    alert("샘플: 게시글이 저장되었습니다 (와이어프레임)");
    router.push("/posts");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader className="p-6">
          <CardTitle className="text-2xl">새 게시글 작성</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-2">제목</label>
              <Input
                id="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-muted-foreground mb-2">본문</label>
              <textarea
                id="content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-lg border border-input px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-ring/50"
                placeholder="여기에 내용을 입력하세요"
              />
            </div>
          </CardContent>

          <CardFooter className="p-6 flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => router.back()}>취소</Button>
            <Button type="submit">저장</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
